import { Toaster } from "react-hot-toast";

export default function ToastHost() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: { borderRadius: 14 },
      }}
    />
  );
}