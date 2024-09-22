import { useCallback } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../app/components/form/CheckBox";
import FormButton from "../../app/components/form/FormButton";
import { useDispatch } from "react-redux";
import { closeModal } from "../modal/modalSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from "../../app/components/form/FormTextArea";
import FormInput from "../../app/components/form/FormInput";
import FormSelect from "../../app/components/form/FormSelect";
import { useGetBooksQuery, usePostBookMutation } from "./booksApiSlice";
import usePostHook from "../../hooks/usePostHook";
import { useGetAuthorQuery } from "./author/authorApiSlice";
import { useGetBookCategoryQuery } from "./bookscategory/booksCategoryApiSlice";
import { languages } from "./Language";
import { BooksSchema } from "../../validation/booksSchema";

export const Create = ({ modalId }) => {
  const { data: bookData } = useGetBooksQuery();
  const schema = BooksSchema(bookData);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: authorData, isLoading: isAuthorLoading } = useGetAuthorQuery();
  const { data: booksCategoryData, isLoading: isBooksCategoryLoading } =
    useGetBookCategoryQuery();

  const postQuery = usePostBookMutation;
  const { onSubmit, isLoading } = usePostHook(postQuery);

  const handleFormSubmit = useCallback(
    (data) => {
      data.popularity = Number(data.popularity);

      onSubmit(data).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, modalId, dispatch]
  );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto p-2 mt-5 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="Image URL"
          name="image_url"
          type="url"
          placeholder="Image URL"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength="100"
        />
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength="100"
        />
        <FormSelect
          label="Author"
          name="author"
          control={control}
          required={true}
          isMulti={true}
          className="col-span-2"
          options={
            !isAuthorLoading && authorData?.items
              ? authorData.items
                  .filter((item) => item.status === true)
                  .map((item) => ({
                    value: item._uuid,
                    label: `${item.firstName} ${item.lastName}`,
                  }))
              : []
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <FormSelect
          label="Category"
          name="category"
          control={control}
          required={true}
          className="col-span-3"
          isMulti={true}
          options={
            !isBooksCategoryLoading && booksCategoryData?.items
              ? booksCategoryData.items
                  .filter((item) => item.status === true)
                  .map((item) => ({
                    value: item._uuid,
                    label: item.categoryName,
                  }))
              : []
          }
        />
        <FormSelect
          label="Language"
          name="language"
          control={control}
          required={true}
          className="col-span-2"
          options={languages}
        />
        <FormInput
          label="Price"
          type="number"
          name="price"
          placeholder="10 digit number only"
          required={true}
          min={0}
          register={register}
          errors={errors}
          className="col-span-2"
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 10); // 10 digits only
          }}
        />
        <FormInput
          label="ISBN"
          type="number"
          name="isbn"
          placeholder="13 digit number only"
          required={true}
          min={0}
          register={register}
          errors={errors}
          className="col-span-2"
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 13); // 13 digits only
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <FormInput
          label="Publication"
          name="publication"
          placeholder="Publication"
          required={true}
          className="col-span-3"
          register={register}
          errors={errors}
          maxLength="100"
        />
        <FormInput
          label="Edition"
          name="edition"
          placeholder="Edition"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength="20"
        />
        <FormTextArea
          label="Description"
          name="description"
          className="col-span-3"
          placeholder="Description"
          register={register}
          errors={errors}
          maxLength="300"
        />
      </div>
      <CheckBox
        label="Status"
        name="status"
        className="mt-4"
        register={register}
      />
      <FormButton
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
