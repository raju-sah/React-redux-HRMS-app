import { useForm } from "react-hook-form";
import { FormInput } from "../../app/components/form/FormInput";
import { PasswordInput } from "../../app/components/form/PasswordInput";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.username === 'raju' && data.password === 'raju') {
        toast.success("Login successful!");
        navigate('/users-list');
    } else {
        toast.error("Invalid username or password");
    } 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <div className="mb-4">
          <FormInput
            label="Username"
            name="username"
            className="col-span-2"
            register={register}
            validationRules={{
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            label="Password"
            name="password"
            className="col-span-1"
            register={register}
            validationRules={{
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            }}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;