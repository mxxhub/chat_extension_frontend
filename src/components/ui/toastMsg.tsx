import { toast } from "react-hot-toast";

type ActionType = "success" | "error" | "warning" | "info";

export const showToast = (actionType: ActionType, message: string) => {
  switch (actionType) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "warning":
      return toast(message, {
        icon: "⚠️",
        style: {
          background: "#fef3c7",
          color: "#92400e",
        },
      });
    case "info":
      return toast(message, {
        icon: "ℹ️",
        style: {
          background: "#e0f2fe",
          color: "#0369a1",
        },
      });
    default:
      return toast(message);
  }
};
