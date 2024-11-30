import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function UnauthorizedPage() {
  const { isAuthenticated }: any = useAuth();
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="text-center p-8 dark:bg-gray-900 rounded-lg shadow-xl">
        <h1 className="text-6xl font-extrabold mb-4">403</h1>
        <p className="text-2xl font-semibold mb-6">
          You do not have permission to access this page.
        </p>
        <div className="mb-8">
          <img
            src="https://cdn-icons-png.freepik.com/512/4413/4413923.png"
            alt="Forbidden"
            className="w-48 mx-auto mb-4"
          />
        </div>
        {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Go back to Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Go back to login
          </Link>
        )}
      </div>
    </div>
  );
}
