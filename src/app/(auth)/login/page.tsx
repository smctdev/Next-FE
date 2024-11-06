"use client";

import { ValidationErrors } from "@/app/types/validation";
import api from "@/app/utils/axiosCall";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ValidationErrors | any>("");
  const [flashError, setFlashError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        usernameOrEmail,
        password,
      });

      if (response.status === 200) {
      } else {
        setFlashError(response.data.message);
        setError("");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFlashError = () => {
    setFlashError("");
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
      <div className="p-10 max-w-1/2.5 bg-opacity-50 bg-black rounded-lg shadow-lg">
        {flashError && (
          <div
            className="flex items-center px-4 py-5 mb-4 text-red-700 bg-red-100 border border-red-400 rounded"
            role="alert"
            aria-live="assertive"
          >
            <i className="w-6 h-6 mr-4 far fa-triangle-exclamation mt-2 text-red-500"></i>
            <div>
              <strong className="font-bold">Error!</strong>
              <span className="block ml-2 sm:inline">{flashError}</span>
            </div>
            <button
              onClick={handleCloseFlashError}
              className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Close alert"
            >
              &times;
            </button>
          </div>
        )}

        <h3 className="text-3xl font-bold text-white mb-6">
          Login to Your Account
        </h3>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <div className="relative">
              <i className="far fa-user absolute left-3 top-4 text-gray-400"></i>
              <input
                type="text"
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                id="email"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username/email"
              />
            </div>
            {error.usernameOrEmail && (
              <small className="text-red-500">
                {error.usernameOrEmail.message}
              </small>
            )}
          </div>

          <div>
            <div className="relative">
              <i className="far fa-lock absolute left-3 top-4 text-gray-400"></i>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {error.password && (
                <small className="text-red-500">{error.password.message}</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {loading ? (
              <span>
                <i className="fas fa-spinner fa-pulse"></i> Logging In...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-white text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
