import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import FormMultiSelect from "../../../app/components/form/FormSelect";
import { ageGroupOptions } from "./AgeGroup";
import {
  useGetBookCategoryQuery,
  useUpdateBookCategoryMutation,
} from "./booksCategoryApiSlice";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import useUpdateHook from "../../../hooks/useUpdateHook";
import EditSkeleton from "../../../app/components/skeletons/EditSkeleton";

const EditSchema = z.object({
  categoryName: z.string().trim().min(1, "Category name is required").max(40),
  ageGroup: z.array(z.number()).min(1, "Age group is required"),
  relatedGenres: z.array(z.number()).min(1, "Related genres is required"),
  description: z.string().trim().max(300),
  popularity: z.coerce
    .number()
    .min(1, "Popularity is required")
    .max(100, "Popularity must be 100 or less"),
  status: z.boolean().default(false),
});
export const Edit = ({ data, isLoading, modalId }) => {
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
      categoryName: data?.categoryName || "",
      ageGroup: data?.ageGroup || [],
      relatedGenres: data?.relatedGenres || [],
      description: data?.description || "",
      popularity: data?.popularity || "",
      status: data?.status,
    },
  });

  useMemo(() => {
    if (data) {
      setValue("categoryName", data.categoryName || "");
      setValue("ageGroup", data.ageGroup || []);
      setValue("relatedGenres", data.relatedGenres || []);
      setValue("description", data.description || "");
      setValue("popularity", data.popularity || "");
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const updateQuery = useUpdateBookCategoryMutation;
  const { onSubmit, isLoading: isUpdating } = useUpdateHook(updateQuery);

  const { data: booksCategoryData } = useGetBookCategoryQuery();

  const booksCategory = booksCategoryData?.items || [];
  const formattedBooksCategory = booksCategory.map(
    ({ _uuid, categoryName }) => ({
      _uuid,
      categoryName,
    })
  );

  const handleFormSubmit = useCallback(
    (datas) => {
      datas.popularity = Number(datas.popularity);
      datas.status = datas.status ? 1 : 0;

      onSubmit({ id: data._uuid, ...datas }).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, data, modalId, dispatch]
  );

  return isLoading ? (
    <EditSkeleton />
  ) : (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="Category Name"
          name="categoryName"
          placeholder="Category Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength={40}
        />

        <FormMultiSelect
          label="Age Group"
          name="ageGroup"
          isMulti={true}
          control={control}
          required={true}
          className="col-span-2"
          options={ageGroupOptions.map((group, index) => ({
            value: index,
            label: group,
          }))}
        />
        <FormInput
          label="Popularity"
          type="number"
          name="popularity"
          placeholder="0"
          min="0"
          max="100"
          required={true}
          register={register}
          errors={errors}
          className="col-span-1"
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 3); // maxlength of 3
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormMultiSelect
          label="Related Genres"
          name="relatedGenres"
          isMulti={true}
          control={control}
          required={true}
          className="col-span-2"
          options={formattedBooksCategory.map((genre) => ({
            value: genre._uuid,
            label: genre.categoryName,
          }))}
        />
        <FormTextArea
          label="Description"
          name="description"
          required={true}
          className="col-span-3"
          placeholder="Description"
          register={register}
          errors={errors}
          maxLength={300}
        />
      </div>

      <Checkbox
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