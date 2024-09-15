import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import { useUpdateAuthorMutation } from "./authorApiSlice";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import useUpdateHook from "../../../hooks/useUpdateHook";
import { countries } from "../../../enums/Country";
import FormSelect from "../../../app/components/form/FormSelect";

const EditSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  nationality: z.string().trim().min(1, "Nationality is required"),
  dob: z.string().date().trim().min(1, "Date of birth is required"),
  address: z.string().trim().min(1, "Address is required"),
  description: z.string().trim(),
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
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      address: data?.address || "",
      nationality: data?.nationality || [],
      dob: data?.dob || [],
      description: data?.description || "",
      popularity: data?.popularity || "",
      status: data?.status,
    },
  });

  useMemo(() => {
    if (data) {
      setValue("firstName", data.firstName || "");
      setValue("lastName", data.lastName || "");
      setValue("address", data.address || "");
      setValue("nationality", data.nationality || []);
      setValue("dob", data.dob || []);
      setValue("description", data.description || "");
      setValue("popularity", data.popularity || "");
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const updateQuery = useUpdateAuthorMutation;
  const { onSubmit, isLoading: isUpdating } = useUpdateHook(updateQuery); // track mutation loading

  const handleFormSubmit = useCallback(
    (datas) => {
      datas.popularity = Number(datas.popularity);
      datas.status = datas.status ? 1 : 0;

      onSubmit({ id: data._uuid, ...datas }).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, data._uuid, modalId, dispatch]
  );

  return isLoading ? (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <Skeleton height={30} className="col-span-2" />
        <Skeleton height={30} className="col-span-2" />
        <Skeleton height={30} className="col-span-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        <Skeleton height={30} className="col-span-2" />
        <Skeleton height={30} className="col-span-1" />
        <Skeleton height={30} className="col-span-1" />
      </div>
      <Skeleton height={20} width={70} className="mb-4" />
      <Skeleton height={30} width={70} />
    </div>
  ) : (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="First Name"
          name="firstName"
          placeholder="First Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
        />
        <FormSelect
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
        />
      </div>

      <Checkbox
        label="Status"
        name="status"
        className="mt-4"
        register={register}
      />

<FormButton
        disabled={isUpdating || isSubmitting} // disable button when form is submitting or mutation is loading
        isLoading={isUpdating || isSubmitting} // show "Saving..." state
        text="Save"
      />
    </form>
  );
};
