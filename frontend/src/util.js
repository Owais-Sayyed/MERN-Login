import { toast } from "react-toastify";

export const handleError = (message) => {
  toast.error(message,{
    position: "top-center",
  });
};

export const handleSuccess = (message) => {
  toast.success(message,{
    position: "top-center",
  });
};

