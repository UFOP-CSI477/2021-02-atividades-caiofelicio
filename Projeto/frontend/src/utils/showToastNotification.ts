import toast from "react-hot-toast";


export const successToast = (message: string) => toast.success(message, {
  duration: 2000,
  position: "top-center",
  style: {
    height: "auto",
  }
});

export const errorToast = (message: string) => toast.error(message, {
  duration: 2000,
  position: "top-center"
});