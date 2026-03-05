import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastHost from "./ToastHost";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ToastHost />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}