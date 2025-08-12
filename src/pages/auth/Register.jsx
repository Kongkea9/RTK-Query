import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFileMutation } from "../../features/file/fileSlice";
import { useRegisterMutation } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiEye } from "react-icons/pi";
import { FaRegEyeSlash } from "react-icons/fa";


const registerSchema = z.object({
  username: z
    .string()
    .nonempty("username is required")
    .lowercase("username must be lowercase"),
  email: z.string().nonempty("email is required").email("invalid email"),
  password: z
    .string()
    .nonempty("password is required")
    .min(4, "password must be equal or greater than 4 letters"),
});

export default function Register() {
  const [uploadFile] = useUploadFileMutation();
  const [registerUser] = useRegisterMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      avatar: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      if (!image) {
        toast.error("Please upload an image before submitting.");
        return;
      }
      const formdata = new FormData();
      formdata.append("file", image);

      const fileResponse = await uploadFile(formdata).unwrap();

      const submitData = {
        name: data.username,
        email: data.email,
        password: data.password,
        avatar: fileResponse.location,
      };

      toast.success("Register successfully!");
      await registerUser(submitData).unwrap();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (e) {
      console.error("Register error:", e);
      toast.error(e?.data?.message);
    }
  };

  return (
    <section className=" justify-centeritems-center bg-teal-600 w-[100%] flex-col h-screen flex justify-center items-center mx-auto">
      <ToastContainer />
      <div className="w-full max-w-md mx-auto p-6 sm:p-8  bg-white border border-gray-200 rounded-2xl shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <h5 className="text-xl font-medium text-teal-600 text-center">
            Register
          </h5>

          {!(preview == null) && (
            <div className="flex items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="relative z-10 flex flex-col items-center justify-center w-[200px] h-[200px] border-2 border-gray-300 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-200 dark:hover:border-gray-200"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop
                  </p>
                  <p className="text-xs text-teal-600 ">or upload a file</p>
                </div>
                <input
                  {...register("avatar")}
                  onChange={(e) => handleImagePreview(e)}
                  id="dropzone-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                />
                <img
                  src={preview}
                  alt="preview img"
                  className="absolute w-[200px] h-[200px] border-2 border-gray-300 rounded-full"
                />
              </label>
            </div>
          )}

          {preview == null && (
            <div className="flex items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-[200px] h-[200px] border-2 border-gray-300 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-200 dark:hover:border-gray-200"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop
                  </p>
                  <p className="text-xs text-teal-600 ">or upload a file</p>
                </div>
                <input
                  {...register("avatar")}
                  onChange={(e) => handleImagePreview(e)}
                  id="dropzone-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                />
              </label>
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700 text-start"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-200 focus:border-blue-300 block w-full p-2.5 text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 text-start">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 text-start"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="email@example.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-200 focus:border-blue-300 block w-full p-2.5 text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 text-start">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 text-start"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                {...register("password")}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-200 focus:border-blue-300 block w-full p-2.5 text-sm"
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
                aria-label={isShowPassword ? "Hide password" : "Show password"}
              >
                {isShowPassword ? <PiEye /> : <FaRegEyeSlash />}
              </button>
            </div>

            {errors.password && (
              <span className="text-red-600 mt-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm transition"
          >
            Register
          </button>

        
        </form>
      </div>
    </section>
  );
}
