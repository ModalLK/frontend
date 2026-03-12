import { userHttp } from "../api/http";

export async function registerUser(payload) {
  const res = await userHttp.post("/auth/register", payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await userHttp.post("/auth/login", payload);
  return res.data;
}

export async function getMyProfile() {
  const res = await userHttp.get("/users/profile");
  return res.data;
}

export async function updateMyProfile(payload) {
  const res = await userHttp.put("/users/profile", payload);
  return res.data;
}

export async function changePassword(payload) {
  const res = await userHttp.put("/users/change-password", payload);
  return res.data;
}
