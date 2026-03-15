import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Camera, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  updateMyProfile,
  uploadProfileImage,
  changePassword,
} from "../services/authService";

export default function ProfilePage() {
 
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      await uploadProfileImage(file);
      await refreshProfile();
      toast.success("Profile image updated!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    try {
      setSaving(true);
      await updateMyProfile(form);
      await refreshProfile();
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match");
    }
    try {
      setSaving(true);
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password changed!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Failed to change password");
    } finally {
      setSaving(false);
    }
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal information
          </p>
        </div>

        {/* Avatar Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="relative">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover "
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-[#902bf5] flex items-center justify-center text-white text-2xl font-black">
                {initials}
              </div>
            )}
            <button
              onClick={() => fileRef.current.click()}
              className="absolute -bottom-1 -right-1 bg-white border border-slate-200 rounded-full p-1.5 shadow hover:bg-slate-50 transition"
            >
              {uploading ? (
                <Loader2 size={14} className="animate-spin text-[#902bf5]" />
              ) : (
                <Camera size={14} className="text-[#902bf5]" />
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-lg">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="mt-1 inline-block rounded-full bg-[#902bf5]/10 px-3 py-0.5 text-xs font-bold text-[#902bf5]">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-4"
        >
          <h2 className="text-lg font-black text-slate-900">
            Personal Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none "
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none "
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none "
              placeholder="+94 77 000 0000"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Address
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none "
              placeholder="No. 123, Main Street, Colombo 03"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#902bf5] py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save Changes
          </button>
        </form>

        {/* Change Password */}
        <form
          onSubmit={handleChangePassword}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>

          {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {field === "currentPassword"
                  ? "Current Password"
                  : field === "newPassword"
                  ? "New Password"
                  : "Confirm New Password"}
              </label>
              <input
                type="password"
                value={passwords[field]}
                onChange={(e) =>
                  setPasswords({ ...passwords, [field]: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none "
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Update Password
          </button>
        </form>

      </div>
    </div>
  );
}
