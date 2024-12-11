import LoadingLoaders from "../components/loaders/LoadingLoaders";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import UnauthorizedPage from "../utils/UnauthorizedPage";
import { useEffect } from "react";
import Cookies from "js-cookie";

const sessionAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const { loading, isAuthenticated, isLogout }: any = useAuth();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const rememberToken = urlParams.get("rememberToken");
      if (token && rememberToken) {
        Cookies.set("APP-TOKEN", token);
        Cookies.set("APP-REMEMBER-TOKEN", rememberToken);
      }
    }, [router]);

    if (loading) return <LoadingLoaders />;

    if (!isAuthenticated && !isLogout) return <UnauthorizedPage />;

    return <WrappedComponent {...props} />;
  };
};

export default sessionAuth;
