import { useForm } from "react-hook-form";
import { FormInput } from "../../app/components/form/FormInput";
import { PasswordInput } from "../../app/components/form/PasswordInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // is submitting is only works when  you add the promise in the onSubmit function
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.username === "raju" && data.password === "raju") {
      localStorage.setItem("loginTime", new Date().getTime());
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white bg-opacity-50 backdrop-blur-4xl p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <FormInput
            label="Username"
            name="username"
            placeholder="Username"
            required={true}
            className="w-full p-2 rounded focus:outline-none focus:border-blue-500"
            register={register}
            errors={errors}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Password"
            required={true}
            className="w-full p-2 rounded focus:outline-none focus:border-blue-500"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-full bg-[#021526] text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
