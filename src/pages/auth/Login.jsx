import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useState } from "react";
// import { useLoginWithFacebook } from "../../social auth/FaceBookAuthComponent";
// import { useLoginWithGitHub } from "../../social auth/GithubAuthComponent";
// import {useLoginWithGoogle } from "../../social auth/GoogleAuthComponenet";
import FacebookLogo from "../../assets/social media/facebook.webp";
import GithubLogo from "../../assets/social media/github.png";
import GoogleLogo from "../../assets/social media/google.jpg";
import { useLoginWithFacebook } from "../../components/social auth/FaceBookAuthComponent";
import { useLoginWithGoogle } from "../../components/social auth/GoogleAuthComponenet";
import { useLoginWithGitHub } from "../../components/social auth/GithubAuthComponent";

export default function App() {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  //calling those 3 social login into logincomponent

  const { loginWithGoogle, googleLogout } = useLoginWithGoogle();
  const { facebookLogin, facebookLogout } = useLoginWithFacebook();
  const { loginWithGithub,  gitHubLogout } = useLoginWithGitHub();

  console.log(isLoading);

  const shcema = z.object({
    email: z.string().nonempty("email is required").email(),
    password: z.string().nonempty("password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(shcema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success("Login successfully!");
      let result = await login(data).unwrap();
      if (result != undefined) {
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (errors) {
      toast.error(errors?.data?.message);
      console.log("ERROR: ", errors?.data?.message);
    } finally {
      reset();
    }
  };

  return (
    <section className="w-full h-screen bg-teal-600">
      <div className="h-screen flex justify-center items-center mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-sm md:min-w-xl bg-gray-50 p-5 rounded-2xl "
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl text-center py-2 font-bold text-teal-600">
              Login
            </h1>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700 text-start"
              >
                Email
              </label>
              <input
                {...register("email")}
                className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
                placeholder="email"
                type="text"
              />
              {errors.email && (
                <span className="text-red-600 mt-2">
                  {errors.email.message}
                </span>
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
                  className="w-full px-2.5 py-2.5 pr-10 border border-slate-400 rounded-xl"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="password"
                />

                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  aria-label={
                    isShowPassword ? "Hide password" : "Show password"
                  }
                >
                  {isShowPassword ? <PiEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {errors.password && (
                <spaoginWithGooglen className="text-red-600 mt-2">
                  {errors.password.message}
                </spaoginWithGooglen>
              )}
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-xl text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="flex justify-center items-center flex-col">
            <p className="text-center">Or login with</p>
            <div className="flex justify-center gap-2">
              <button onClick={loginWithGoogle}>
                <img
                  src={GoogleLogo}
                  alt="Google provder"
                  width={30}
                  height={30}
                />
              </button>
              <button onClick={facebookLogin}>
                <img
                  src={FacebookLogo}
                  alt="Facebook provder"
                  width={30}
                  height={30}
                />
              </button>
              <button onClick={loginWithGithub}>
                <img
                  src={GithubLogo}
                  alt="github provder"
                  width={30}
                  height={30}
                />
              </button>
            </div>

            <div>
              <button onClick={googleLogout} className="border rounded-xl p-2">
                <p>Logout With Google</p>
              </button>
              {/* for facebook  */}
              <button
                onClick={facebookLogout}
                className="border rounded-xl p-2"
              >
                <p>Logout with Facebook</p>
              </button>
              {/* for github  */}
              <button onClick={ gitHubLogout} className="border rounded-xl p-2">
                <p>Logout with Github</p>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
