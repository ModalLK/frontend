import { Toaster } from "react-hot-toast";

export default function ToastHost() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: "16px",
          padding: "12px 14px",
          fontWeight: 600,
        },
      }}
    />
  );
}
