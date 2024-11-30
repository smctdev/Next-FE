"use client";

import { useEffect, useState } from "react";
import useFetch from "../hooks/fetchData";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import LoadingLoaders from "@/app/components/loaders/LoadingLoaders";
import UnauthorizedPage from "@/app/utils/UnauthorizedPage";
import UserItemList from "../components/UserItemList";
import UserItemListLoader from "../components/loaders/UserItemListLoader";
import api from "@/app/lib/axiosCall";
import useToastr from "../hooks/Toastr";

export default function Page() {
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    isAuthenticated,
    loading: authLoading,
    isLogout,
    hasHigherRole,
  }: any = useAuth();
  const { data, loading, error }: any = useFetch("/users", isRefresh);
  const { showSuccess, showError }: any = useToastr();
  const router: any = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      return router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <LoadingLoaders />;
  }

  if ((!isAuthenticated && !isLogout) || !hasHigherRole) {
    return <UnauthorizedPage />;
  }

  const handleVerifyUser = async (id: string) => {
    setIsRefresh(true);
    try {
      const response = await api.post(`/users/verify-user/${id}`, {
        id,
      });

      if (response.data.statusCode === 200) {
        showSuccess(response.data.message, "Verified");
      }
      if (response.data.statusCode === 400) {
        showError(response.data.message, "Error");
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsRefresh(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">All Users</h1>
        <button className="bg-blue-500 hover:bg-blue-600 hover:scale-110 text-white transition-all duration-300 ease-in-out text-md px-2 py-1 rounded">
          <i className="far fa-user-plus"></i> Add User
        </button>
      </div>
      <hr />
      <div className="overflow-x-auto rounded-lg border shadow-lg border-gray-200 mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-500 dark:bg-gray-900 text-white">
              <th className="px-4 py-2 text-left w-11">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Roles</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <UserItemListLoader />
            ) : data?.users?.length > 0 ? (
              data.users.map((user: any, index: number) => (
                <UserItemList
                  item={user}
                  key={index}
                  index={index}
                  handleVerifyUser={handleVerifyUser}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center">No users found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
