import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMyProfile, loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await getMyProfile();
      setUser(profile);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshProfile();
  }, []);

  async function login(form) {
    const data = await loginUser(form);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRole", data.role);
    await refreshProfile();
    return data;
  }

  async function register(form) {
    return registerUser(form);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "ROLE_ADMIN",
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
