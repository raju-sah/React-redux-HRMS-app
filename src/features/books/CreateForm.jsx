import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../app/components/form/FormInput";
import { PasswordInput } from "../../app/components/form/PasswordInput";
import { usePostUserMutation } from "./booksApiSlice";
import CheckBox from "../../app/components/form/CheckBox";
import FormButton from "../../app/components/form/FormButton";
import usePostHook from "../../hooks/usePostHook";
import { useDispatch } from "react-redux";
import { closeModal } from "../modal/modalSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserCreateSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().email(),
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim(),
    company: z.string().trim(),
    age: z.coerce
      .number()
      .min(18, "Age must be at least 18 years old")
      .max(120, "Age must be 120 or less"),
    status: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const CreateForm = ({ modalId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(UserCreateSchema),
  });

  const postQuery = usePostUserMutation;
  const { onSubmit, isLoading, isSuccess, isError, error } =
    usePostHook(postQuery);

  const handleFormSubmit = useCallback(
    (data) => {
      data.age = Number(data.age);
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

        <FormInput
          label="Age"
          type="number"
          name="age"
          placeholder="Age"
          required={true}
          register={register}
          errors={errors}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
        />

        <PasswordInput
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          className="col-span-1"
          register={register}
          errors={errors}
        />

        <PasswordInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="col-span-1"
          register={register}
          errors={errors}
        />

        <FormInput
          label="Company"
          type="text"
          name="company"
          placeholder="Company"
          className="col-span-2"
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
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
