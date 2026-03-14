// src/components/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import ToastHost from "./ToastHost";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ToastHost />
      <Outlet />
    </div>
  );
}
