"use client";

import LoadingLoaders from "@/app/components/loaders/LoadingLoaders";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/app/lib/axiosCall";
import { ValidationErrors } from "@/app/types/ValidationType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [flashError, setFlashError] = useState("");
  const [error, setError] = useState<ValidationErrors | any>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, loading: loadingAuth }: any = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      return router.push("/dashboard");
    }
  }, [isAuthenticated, loadingAuth, router]);

  if (loadingAuth || isAuthenticated) return <LoadingLoaders />;

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/register", {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
        address: address,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        name: name,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#1E90FF",
          html: "You have successfully registered. You will be redirected to the login page. <br> Thank you!",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
        setError("");
      } else {
        setFlashError(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data);
      if (error.message === "Network Error") {
        setFlashError(`${error.message} or server error.`);
      }
      if (error.response.status === 429) {
        setFlashError(`${error.response.statusText}. Please try again later.`);
      }
      if (error.response.status === 400) {
        setFlashError("");
      }
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
          'url("https://t4.ftcdn.net/jpg/08/94/02/21/360_F_894022146_cOoOtPF24XRZixcpnlojDhjZftU3p8dH.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-10 max-w-[26rem] bg-opacity-50 bg-black rounded-lg shadow-lg">
        {flashError && (
          <div
            className="flex items-center px-4 py-5 mb-4 text-red-700 bg-red-100 border border-red-400 rounded"
            role="alert"
            aria-live="assertive"
          >
            <i className="w-6 h-6 mr-4 far fa-triangle-exclamation mt-2 text-red-500"></i>
            <span className="block ml-2 sm:inline">{flashError}</span>
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
          Register to Your Account
        </h3>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <div className="relative">
              <i className="far fa-envelope absolute left-3 top-4 text-gray-400"></i>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            {error.email && (
              <small className="text-red-500">{error.email.message}</small>
            )}
          </div>

          <div>
            <div className="relative">
              <i className="far fa-user absolute left-3 top-4 text-gray-400"></i>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            {error.name && (
              <small className="text-red-500">{error.name.message}</small>
            )}
          </div>

          <div>
            <div className="relative">
              <i className="far fa-user absolute left-3 top-4 text-gray-400"></i>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            {error.username && (
              <small className="text-red-500">{error.username.message}</small>
            )}
          </div>

          <div>
            <div className="relative">
              <i className="far fa-location-dot absolute left-3 top-4 text-gray-400"></i>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
              />
            </div>
            {error.address && (
              <small className="text-red-500">{error.address.message}</small>
            )}
          </div>

          <div>
            <div className="relative">
              <i className="far fa-phone absolute left-3 top-4 text-gray-400"></i>
              <input
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="phone number"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            {error.phoneNumber && (
              <small className="text-red-500">
                {error.phoneNumber.message}
              </small>
            )}
          </div>

          <div>
            <div className="relative">
              <i className="far fa-calendar absolute left-3 top-4 text-gray-400"></i>
              <input
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
                id="date of birth"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your date of birth"
              />
            </div>
            {error.dateOfBirth && (
              <small className="text-red-500">
                {error.dateOfBirth.message}
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

          <div>
            <div className="relative">
              <i className="far fa-lock absolute left-3 top-4 text-gray-400"></i>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                className="w-full pl-10 p-3 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password confirmation"
              />
              {error.confirmPassword && (
                <small className="text-red-500">
                  {error.confirmPassword.message}
                </small>
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
                <i className="fas fa-spinner fa-pulse"></i> Registering...
              </span>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        <p className="mt-4 text-white text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
