import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import FormMultiSelect from "../../../app/components/form/FormSelect";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import useUpdateHook from "../../../hooks/useUpdateHook";
import EditSkeleton from "../../../app/components/skeletons/EditSkeleton";
import { ageGroupOptions } from "../../books/bookscategory/AgeGroup";
import { GenreSchema } from "../../../validation/genreSchema";
import { useGetGenresQuery, useUpdateGenreMutation } from "./GenreApiSlice";

export const Edit = ({ data, isLoading, modalId }) => {
  const dispatch = useDispatch();
  const { data: genreData } = useGetGenresQuery();

  const schema = GenreSchema(genreData, data?.name);

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

  const updateQuery = useUpdateGenreMutation;
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
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
