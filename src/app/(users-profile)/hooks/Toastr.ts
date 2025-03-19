import { useEffect } from "react";
import toastr from "toastr";

const useToastr = () => {
  useEffect(() => {
    toastr.options = {
      positionClass: "toast-top-right",
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
    };
  }, []);

  const showSuccess = (message: any, title: any) =>
    toastr.success(message, title);
  const showError = (message: any, title: any) => toastr.error(message, title);
  const showInfo = (message: any, title: any) => toastr.info(message, title);
  const showWarning = (message: any, title: any) =>
    toastr.warning(message, title);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};

export default useToastr;
