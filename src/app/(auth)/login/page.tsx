"use client";

import { useAuth } from "@/app/context/AuthContext";
import api from "@/app/lib/axiosCall";
import withOutAuth from "@/app/lib/withOutAuth";
import { ValidationErrors } from "@/app/types/ValidationType";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";

const Login = () => {
  const [formInput, setFormInput] = useState<any>({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState<ValidationErrors | any>("");
  const [flashError, setFlashError] = useState<any>("");
  const [flashSuccess, setFlashSuccess] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const { login }: any = useAuth();
  const [isShowPassword, setIsShowPassword] = useState<any>(false);

  useEffect(() => {
    const verifications = new URLSearchParams(window.location.search);

    const error = verifications.has("errorVerification");
    const success = verifications.has("successVerification");

    if (success) {
      setFlashSuccess(verifications.get("successVerification"));
    } else if (error) {
      setFlashError(verifications.get("errorVerification"));
    }

    window.history.replaceState(null, "", "login");
  }, []);

  const handleInputChange = (title: any) => (e: any) => {
    const value = e.target.value;

    setFormInput((formInput: any) => ({
      ...formInput,
      [title]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        ...formInput,
      });

      if (response.data.statusCode === 200) {
        setError("");

        const token = response.data.accessToken;
        const rememberToken = response.data.rememberToken;

        login(token, rememberToken);
        setFormInput({
          usernameOrEmail: "",
          password: "",
        });
      } else {
        setFlashError(response.data.message);
        setError("");
      }
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data || `${error.message} or server error.`);
      if (error.message === "Network Error") {
        setFlashError(`${error.message} or server error.`);
      }
      if (error.response.status === 429) {
        setFlashError(`${error.response.statusText}. Please try again later.`);
      }
      if (error.response.status === 400) {
        setFlashError("");
        setFlashSuccess("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFlashError = () => {
    setFlashError("");
  };
  const handleCloseFlashSuccess = () => {
    setFlashSuccess("");
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = process.env.NEXT_PUBLIC_API_GOOGLE_AUTH_URL;

    window.open(googleAuthUrl, "_self");
  };

  const handleGithubLogin = () => {
    const githubAuthUrl = process.env.NEXT_PUBLIC_API_GITHUB_AUTH_URL;

    window.open(githubAuthUrl, "_self");
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          'url("https://app.hub-analytics.com/assets/images/login-cover.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-10 bg-opacity-50 bg-black rounded-lg shadow-md max-w-[26rem]">
        {flashError ? (
          <div
            className="flex items-center space-x-2 px-3 py-5 mb-4 text-red-700 bg-red-100 border border-red-400 rounded relative"
            role="alert"
            aria-live="assertive"
          >
            <i className="w-6 h-6 far fa-triangle-exclamation mt-2 text-red-500 text-2xl"></i>
            <span className="block ml-3 pr-2 sm:inline">{flashError}</span>
            <button
              onClick={handleCloseFlashError}
              className="ml-auto absolute right-3 text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Close alert"
            >
              <i className="far fa-xmark"></i>
            </button>
          </div>
        ) : (
          flashSuccess && (
            <div
              className="flex items-center space-x-2 px-3 py-5 mb-4 text-green-700 bg-green-100 border border-green-400 rounded relative"
              role="alert"
              aria-live="assertive"
            >
              <i className="w-6 h-6 far fa-triangle-exclamation mt-2 text-green-500 text-2xl"></i>
              <span className="block ml-3 pr-2 sm:inline">{flashSuccess}</span>
              <button
                onClick={handleCloseFlashSuccess}
                className="ml-auto absolute right-3 text-green-500 hover:text-green-700 focus:outline-none"
                aria-label="Close alert"
              >
                <i className="far fa-xmark"></i>
              </button>
            </div>
          )
        )}

        <h3 className="text-3xl font-bold text-white mb-6">
          Login to Your Account
        </h3>

        <div className="space-y-6">
          <form className="space-y-2" onSubmit={handleLogin}>
            <div className="space-y-6">
              <Input
                error={error?.usernameOrEmail?.message}
                icon="user"
                type="text"
                onChange={handleInputChange("usernameOrEmail")}
                id="email"
                placeholder="Enter your username/email"
                value={formInput.usernameOrEmail}
              />
              <Input
                error={error?.password?.message}
                icon="lock"
                type={isShowPassword ? "text" : "password"}
                onChange={handleInputChange("password")}
                id="password"
                placeholder="Enter your password"
                value={formInput.password}
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 hover:underline"
              onClick={handleShowPassword}
            >
              <input
                type="checkbox"
                checked={isShowPassword}
                onChange={handleShowPassword}
              />{" "}
              Show password
            </button>

            <Button
              type="submit"
              bgColor="blue-600"
              hoverBgColor="blue-700"
              loadingText="Logging in..."
              label="Login"
              isLoading={loading}
            />
          </form>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="absolute inset-x-0 inline-block px-2 mx-auto text-sm bg-gray-900 text-white w-fit -top-2 rounded">
              Or continue with
            </p>
          </div>
          <div className="space-y-2 text-sm font-medium">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-black hover:bg-opacity-20 transition duration-300 text-white active:scale-105 active:bg-black active:bg-opacity-20"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg bg-black bg-opacity-75 hover:bg-black hover:bg-opacity-100 transition duration-300 text-white active:scale-105 active:bg-black active:bg-opacity-20"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 -3.5 256 256"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet"
                fill="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g fill="#ffffff">
                    {" "}
                    <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"></path>{" "}
                    <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              Continue with Github
            </button>
          </div>
        </div>

        <p className="mt-4 text-white text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default withOutAuth(Login);
