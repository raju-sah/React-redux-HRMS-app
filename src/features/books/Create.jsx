import { useCallback } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../app/components/form/CheckBox";
import FormButton from "../../app/components/form/FormButton";
import { useDispatch } from "react-redux";
import { closeModal } from "../modal/modalSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from "../../app/components/form/FormTextArea";
import FormInput from "../../app/components/form/FormInput";
import FormSelect from "../../app/components/form/FormSelect";
import { usePostBookMutation } from "./booksApiSlice";
import usePostHook from "../../hooks/usePostHook";
import { useGetAuthorQuery } from "./author/authorApiSlice";
import { useGetBookCategoryQuery } from "./bookscategory/booksCategoryApiSlice";
import { languages } from "./Language";

const CreateSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(100),
  author: z.array(z.string()).min(1, "Author is required"),
  category: z.array(z.string()).min(1, "Category is required"),
  publication: z.string().trim().min(1, "Publication is required").max(100),
  isbn: z.coerce
    .number()
    .int("ISBN must be an number")
    .refine((val) => val.toString().length === 13, {
      message: "ISBN must be exactly 13 digits long.",
    }),
  edition: z.string().trim().min(1, "Edition is required").max(20),
  language: z.coerce.number().min(1, "Language is required"),
  description: z.string().trim().max(300),
  status: z.boolean().default(false),
});

export const Create = ({ modalId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(CreateSchema),
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
          label="Title"
          name="title"
          placeholder="Title"
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
                  .filter((item) => item.status === 1)
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
                  .filter((item) => item.status === 1)
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
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
