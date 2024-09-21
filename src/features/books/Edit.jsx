import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../app/components/form/CheckBox";
import FormButton from "../../app/components/form/FormButton";
import { useDispatch } from "react-redux";
import { closeModal } from "../modal/modalSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from "../../app/components/form/FormTextArea";
import FormInput from "../../app/components/form/FormInput";
import FormSelect from "../../app/components/form/FormSelect";
import { useGetAuthorQuery } from "./author/authorApiSlice";
import { useGetBookCategoryQuery } from "./bookscategory/booksCategoryApiSlice";
import { languages } from "./Language";
import useUpdateHook from "../../hooks/useUpdateHook";
import EditSkeleton from "../../app/components/skeletons/EditSkeleton";
import { useGetBooksQuery, useUpdateBookMutation } from "./booksApiSlice";
import { BooksSchema } from "../../validation/booksSchema";

export const Edit = ({ data, isLoading, modalId }) => {
  const { data: bookData } = useGetBooksQuery();
  const schema = BooksSchema(bookData, data?.name);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name || "",
      author: data?.author || [],
      category: data?.category || [],
      publication: data?.publication || "",
      isbn: data?.isbn || "",
      edition: data?.edition || "",
      language: data?.language || "",
      description: data?.description || "",
      status: data?.status,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("author", data.author || []);
      setValue("category", data.category || []);
      setValue("publication", data.publication || "");
      setValue("isbn", data.isbn || "");
      setValue("edition", data.edition || "");
      setValue("language", data.language || "");
      setValue("description", data.description || "");
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const { data: authorData, isLoading: isAuthorLoading } = useGetAuthorQuery();
  const { data: booksCategoryData, isLoading: isBooksCategoryLoading } =
    useGetBookCategoryQuery();
  const updateQuery = useUpdateBookMutation;
  const { onSubmit, isLoading: isUpdating } = useUpdateHook(updateQuery);

  const handleFormSubmit = useCallback(
    (datas) => {
      datas.language = Number(datas.language);

      onSubmit({ id: data._uuid, ...datas }).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, modalId, dispatch]
  );

  return isLoading ? (
    <EditSkeleton />
  ) : (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto p-2 mt-5 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
          className="col-span-2"
          isMulti={true}
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
        <FormSelect
          label="Category"
          name="category"
          control={control}
          required={true}
          className="col-span-2"
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
        <FormInput
          label="Publication"
          name="publication"
          placeholder="Publication"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength="100"
        />
        <FormInput
          label="ISBN"
          type="number"
          name="isbn"
          placeholder="0"
          required={true}
          min={0}
          register={register}
          errors={errors}
          className="col-span-2"
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 13); // 13 digits only
          }}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormSelect
          label="Language"
          name="language"
          control={control}
          required={true}
          className="col-span-2"
          options={languages}
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
        disabled={isUpdating || isSubmitting}
        isLoading={isUpdating || isSubmitting}
        text="Save"
      />
    </form>
  );
};
