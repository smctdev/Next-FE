import LoadingLoaders from "../components/loaders/LoadingLoaders";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import UnauthorizedPage from "../utils/UnauthorizedPage";
import { useEffect } from "react";

const withOutAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { isAuthenticated, loading, userRoles }: any = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        if (userRoles?.includes("superadmin")) {
          router.push("/superadmin/dashboard");
        } else if (userRoles?.includes("admin")) {
          router.push("/admin/dashboard");
        } else if (userRoles?.includes("moderator")) {
          router.push("/moderator/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    }, [isAuthenticated, loading, router]);

    if (loading || isAuthenticated) return <LoadingLoaders />;

    return <WrappedComponent {...props} />;
  };
};

export default withOutAuth;
