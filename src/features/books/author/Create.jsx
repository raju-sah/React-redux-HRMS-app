import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostAuthorMutation } from "./authorApiSlice";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import usePostHook from "../../../hooks/usePostHook";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import FormMultiSelect from "../../../app/components/form/FormSelect";
import FormTextArea from "../../../app/components/form/FormTextArea";
import { countries } from "../../../enums/Country";
import { authorSchema } from "../../../validation/authorSchema";

export const Create = ({ modalId }) => {
  const schema = authorSchema();

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

  const postQuery = usePostAuthorMutation;
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

        <FormMultiSelect
          label="Nationality"
          name="nationality"
          control={control}
          required={true}
          className="col-span-2"
          options={countries.map((country) => ({
            value: country.code,
            label: country.name,
          }))}
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
          min={0}
          max={100}
          required={true}
          register={register}
          errors={errors}
          className="col-span-2"
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 3);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormTextArea
          label="Description"
          name="description"
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
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
