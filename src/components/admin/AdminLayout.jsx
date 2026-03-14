import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
