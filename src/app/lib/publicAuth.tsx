import LoadingLoaders from "../components/loaders/LoadingLoaders";
import { useAuth } from "../context/AuthContext";

const publicAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { loading }: any = useAuth();

    if (loading) return <LoadingLoaders />;

    return <WrappedComponent {...props} />;
  };
};

export default publicAuth;
