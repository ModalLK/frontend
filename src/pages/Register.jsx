import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useFormErrors } from "../hooks/useFormErrors";
import FieldError from "../components/FieldError";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const nav = useNavigate();
  const { register } = useAuth();
  const { fieldErrors, applyErrors, setError, clearError, resetErrors } = useFormErrors();

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function getInlineError(name, value) {
    if (name === "firstName") {
      if (!value) return "First name is required";
      if (value.length < 2) return "First name must be at least 2 characters";
    }
    if (name === "lastName") {
      if (!value) return "Last name is required";
      if (value.length < 2) return "Last name must be at least 2 characters";
    }
    if (name === "email") {
      if (!value) return "Email is required";
      if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address";
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
    }
    return null;
  }

  function isFormValid() {
    return (
      !getInlineError("firstName", form.firstName) &&
      !getInlineError("lastName", form.lastName) &&
      !getInlineError("email", form.email) &&
      !getInlineError("password", form.password)
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    const err = getInlineError(name, value);
    if (err) {
      setError(name, err);
    } else {
      clearError(name);
    }
  }

  function handleDisabledClick() {
    const allFields = ["firstName", "lastName", "email", "password"];
    const allTouched = {};
    allFields.forEach((field) => {
      allTouched[field] = true;
      const err = getInlineError(field, form[field]);
      if (err) setError(field, err);
    });
    setTouched(allTouched);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!isFormValid()) return;
    resetErrors();
    try {
      setLoading(true);
      await register(form);
      toast.success("Account created successfully. Please login.");
      nav("/login", { replace: true });
    } catch (error) {
      applyErrors(error);
      const msg = error?.response?.data?.message;
      toast.error(msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-black outline-none transition ${
      fieldErrors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-black text-center">Create Your Account</h1>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">

          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={inputClass("firstName")}
              placeholder="Enter your first name"
            />
            <FieldError message={fieldErrors.firstName} />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={inputClass("lastName")}
              placeholder="Enter your last name"
            />
            <FieldError message={fieldErrors.lastName} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Email</label>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              className={inputClass("email")}
              placeholder="Enter your email"
            />
            <FieldError message={fieldErrors.email} />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className={`${inputClass("password")} pr-12`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.168-3.34M6.343 6.343A9.956 9.956 0 0112 5c5 0 9 4 9 7a9.77 9.77 0 01-2.168 3.34M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <FieldError message={fieldErrors.password} />
            <p className="text-xs text-gray-400">Min. 6 characters</p>
          </div>

          {/* Submit — wrapped in div to catch clicks when disabled */}
          <div onClick={!isFormValid() && !loading ? handleDisabledClick : undefined}>
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition
                bg-[#902bf5] hover:bg-[#7a1fe0]
                disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>

        </form>

        <p className="mt-4 text-sm text-black text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#902bf5] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
