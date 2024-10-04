import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { BookCategorySchema } from "../../../validation/bookCategorySchema";

export const Edit = ({ data, isLoading, modalId }) => {
  const dispatch = useDispatch();
  const { data: categoryData } = useGetBookCategoryQuery();

  const schema = BookCategorySchema(categoryData, data?.categoryName);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useMemo(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value ?? (Array.isArray(value) ? [] : ""));
      });
    }
  }, [data, setValue]);

  const updateQuery = useUpdateBookCategoryMutation;
  const { onSubmit, isLoading: isUpdating } = useUpdateHook(updateQuery);

  const handleFormSubmit = useCallback(
    (sendDatas) => {
      sendDatas.popularity = Number(sendDatas.popularity);

      onSubmit({ id: data._uuid, ...sendDatas }).then(() => {
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
          options={ageGroupOptions}
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
          className="col-span-2"
          maxDigit={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
