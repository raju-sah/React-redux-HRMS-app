import { useCallback, useMemo } from "react";
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
import { useGetAuthorQuery } from "./author/authorApiSlice";
import { useGetBookCategoryQuery } from "./bookscategory/booksCategoryApiSlice";
import { languages } from "./Language";
import useUpdateHook from "../../hooks/useUpdateHook";
import EditSkeleton from "../../app/components/skeletons/EditSkeleton";
import { useUpdateBookMutation } from "./booksApiSlice";

const EditSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  author: z.string().trim().min(1, "Author is required"),
  category: z.string().trim().min(1, "Category is required"),
  publication: z.string().trim().min(1, "Publication is required"),
  isbn: z.coerce.number()
  .int("ISBN must be an integer")
  .refine(val => val.toString().length === 13, {
    message: "ISBN must be exactly 13 digits long.",
  }),  language: z.coerce.number().min(1, "Language is required"),
  description: z.string().trim(),
  status: z.boolean().default(false),
});

export const Edit = ({ data, isLoading, modalId }) => {
  console.log(data);  
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      title: data?.title || "",
      author: data?.author || "",
      category: data?.category || "",
      publication: data?.publication || "",
      isbn: data?.isbn || "",
      edition: data?.edition || "",
      language: data?.language || "",
      description: data?.description || "",
      status: data?.status,
    },
  });

  useMemo(() => {
    if (data) {
      setValue("title", data.title || "");
      setValue("author", data.author || "");
      setValue("category", data.category || "");
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
      datas.status = datas.status ? 1 : 0;

      onSubmit( {id: data._uuid, ...datas }).then(() => {
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
          label="Title"
          name="title"
          placeholder="Title"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
        />
        <FormSelect
          label="Author"
          name="author"
          control={control}
          required={true}
          className="col-span-2"
          options={
            !isAuthorLoading && authorData?.items
              ? authorData.items.map((item) => ({
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
          isMulti={false}
          options={
            !isBooksCategoryLoading && booksCategoryData?.items
              ? booksCategoryData.items.map((item) => ({
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
        />
        <FormInput
          label="ISBN"
          type="number"
          name="isbn"
          placeholder="0"
          required={true}
          min={0}
          max={100}
          register={register}
          errors={errors}
          className="col-span-2"
        />
        <FormInput
          label="Edition"
          name="edition"
          placeholder="Edition"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
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
