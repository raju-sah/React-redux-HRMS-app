import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import { useUpdateAuthorMutation } from "./authorApiSlice";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import useUpdateHook from "../../../hooks/useUpdateHook";
import { countries } from "../../../enums/Country";
import FormSelect from "../../../app/components/form/FormSelect";
import EditSkeleton from "../../../app/components/skeletons/EditSkeleton";
import { authorSchema } from "../../../validation/authorSchema";

export const Edit = ({ data, isLoading, modalId }) => {
  const schema = authorSchema();

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
    defaultValues: {},
  });

  useMemo(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value ?? (Array.isArray(value) ? [] : ""));
      });
    }
  }, [data, setValue]);

  const updateQuery = useUpdateAuthorMutation;
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
          label="First Name"
          name="firstName"
          placeholder="First Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength={50}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength={50}
        />
        <FormSelect
          label="Nationality"
          name="nationality"
          control={control}
          required={true}
          className="col-span-2"
          options={countries}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="Date of Birth"
          type="date"
          name="dob"
          required={true}
          register={register}
          errors={errors}
          className="col-span-2"
        />
        <FormInput
          label="Address"
          type="text"
          name="address"
          placeholder="Address"
          required={true}
          register={register}
          errors={errors}
          className="col-span-2"
          maxLength={100}
        />
        <FormInput
          label="Popularity"
          type="number"
          name="popularity"
          placeholder="0"
          required={true}
          min={0}
          max={100}
          register={register}
          errors={errors}
          className="col-span-2"
          maxDigit={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormTextArea
          label="Description"
          name="description"
          required={true}
          className="col-span-2"
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
