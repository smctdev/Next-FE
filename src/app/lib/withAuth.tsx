import LoadingLoaders from "../components/loaders/LoadingLoaders";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import UnauthorizedPage from "../utils/UnauthorizedPage";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { isAuthenticated, loading, isLogout }: any = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) return <LoadingLoaders />;

    if (!isAuthenticated && !isLogout) {
      return <UnauthorizedPage />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
