import { useForm } from "react-hook-form";
import { FormInput } from "../../app/components/form/FormInput";
import { PasswordInput } from "../../app/components/form/PasswordInput";
import { toast } from "react-toastify";
import { usePostUserMutation } from "./usersApiSlice";
import CheckBox from "../../app/components/form/CheckBox";
import FormButton from "../../app/components/form/FormButton";

export const CreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const [postUser, { isLoading, isSuccess, isError, error }] =
    usePostUserMutation();

  const onSubmit = async (data) => {
    data.age = Number(data.age);
    data.status = data.status == true ? 1 : 0;
    try {
      await postUser(data).unwrap();
      toast.success("User created successfully!");
    } catch (err) {
      toast.error(
        "Failed to create user: " + err.data?.message || "Unknown error"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-2 mt-5 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <FormInput
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

        <FormInput
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

        <FormInput
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
        <FormInput
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

        <PasswordInput
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

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          className="col-span-1"
          register={register}
          validationRules={{
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          errors={errors}
        />
        <FormInput
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

      <CheckBox
        label="Status"
        name="status"
        className="mt-4"
        register={register}
      />

      <FormButton isLoading={isLoading} text="Create" />

      {/* {isSuccess && <p className="text-green-500 mt-2">User created successfully!</p>}
      {isError && <p className="text-red-500 mt-2">Error: {error?.data?.message || "Failed to create user"}</p>} */}
    </form>
  );
};
