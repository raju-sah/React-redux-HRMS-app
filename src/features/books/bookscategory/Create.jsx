import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ageGroupOptions } from "./AgeGroup";
import {
  useGetBookCategoryQuery,
  usePostBookCategoryMutation,
} from "./booksCategoryApiSlice";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import usePostHook from "../../../hooks/usePostHook";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import FormMultiSelect from "../../../app/components/form/FormSelect";
import FormTextArea from "../../../app/components/form/FormTextArea";

const CreateSchema = z.object({
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

  const { data: categoryData } = useGetBookCategoryQuery();
  const postQuery = usePostBookCategoryMutation;
  const { onSubmit, isLoading, isSuccess, isError, error } =
    usePostHook(postQuery);

  const handleFormSubmit = useCallback(
    (data) => {
      data.popularity = Number(data.popularity);
      data.status = data.status ? 1 : 0;

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
            e.target.value = e.target.value.slice(0, 3);
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
          options={ageGroupOptions.map((genre, index) => ({
            value: index,
            label: genre,
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
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
