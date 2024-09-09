import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { FormInput } from "../../app/components/form/FormInput";
import { PasswordInput } from "../../app/components/form/PasswordInput";
import CheckBox from "../../app/components/form/CheckBox";
import FormButton from "../../app/components/form/FormButton";
import { useDispatch } from "react-redux";
import { useUpdateUserMutation } from "./usersApiSlice";
import useUpdateHook from "../../hooks/useUpdateHook";
import { closeModal } from "../modal/modalSlice";

export const EditForm = ({ user, isLoading, modalId }) => {
  const dispatch = useDispatch();


  const MemoizedFormInput = memo(FormInput);
  const MemoizedPasswordInput = memo(PasswordInput);
  const MemoizedCheckBox = memo(CheckBox);

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      age: user?.age || "",
      company: user?.company || "",
      password: user?.password || "",
      confirmPassword: user?.password || "",
      status: user?.status,
    }
  });

  useMemo(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
      setValue("age", user.age || "");
      setValue("company", user.company || "");
      setValue("password", user.password || "");
      setValue("confirmPassword", user.password || "");
      setValue("status", user.status);
    }
  }, [user, setValue]);

  const updateQuery = useUpdateUserMutation;
  const { onSubmit} = useUpdateHook(updateQuery);

  const handleFormSubmit = useCallback(
    (data) => {
      data.age = Number(data.age);
      data.status = data.status ? 1 : 0;
  
      onSubmit({ id: user._uuid, ...data })
        .then(() => {
          reset();
          dispatch(closeModal(modalId));
        })
        .catch((error) => {
          console.error("Failed to submit form", error);
        });
    },
    [onSubmit, reset, user, modalId, dispatch]
  );
  

  if (isLoading) {
    return (
      <div className="mx-auto p-2 mt-5 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Skeleton height={40} className="col-span-2" />
          <Skeleton height={40} className="col-span-2" />
          <Skeleton height={40} className="col-span-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
          <Skeleton height={40} className="col-span-2" />
          <Skeleton height={40} className="col-span-1" />
          <Skeleton height={40} className="col-span-1" />
          <Skeleton height={40} className="col-span-2" />
        </div>
        <div className="mt-4">
          <Skeleton height={40} />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto p-2 mt-5 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MemoizedFormInput
          label="First Name"
          name="firstName"
          className="col-span-2"
          register={register}
          validationRules={{
            required: "First name is required",
            maxLength: {
              value: 20,
              message: "First name cannot exceed 20 characters",
            },
          }}
          errors={errors}
        />

        <MemoizedFormInput
          label="Last Name"
          name="lastName"
          className="col-span-2"
          register={register}
          validationRules={{
            required: "Last name is required",
            maxLength: {
              value: 20,
              message: "Last name cannot exceed 20 characters",
            },
          }}
          errors={errors}
        />

        <MemoizedFormInput
          label="Age"
          name="age"
          type="number"
          register={register}
          validationRules={{
            min: { value: 18, message: "Age must be at least 18" },
            max: { value: 100, message: "Age cannot exceed 100" },
          }}
          errors={errors}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <MemoizedFormInput
          label="Email"
          name="email"
          type="email"
          className="col-span-2"
          register={register}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          errors={errors}
        />

        <MemoizedPasswordInput
          label="Password"
          name="password"
          type="password"
          className="col-span-1"
          register={register}
          validationRules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          errors={errors}
        />

        <MemoizedPasswordInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          className="col-span-1"
          register={register}
          validationRules={{
            validate: (value) => value === watch("password") || "Passwords do not match",
          }}
          errors={errors}
        />

        <MemoizedFormInput
          label="Company"
          name="company"
          type="text"
          className="col-span-2"
          register={register}
          validationRules={{
            required: "Company is required",
          }}
          errors={errors}
        />
      </div>

      <MemoizedCheckBox
        label="Status"
        name="status"
        className="mt-4"
        register={register}
      />

      <FormButton isLoading={isLoading} text="Save" />
    </form>
  );
};