import { userHttp } from "../api/http";

export async function registerUser(payload) {
  const res = await userHttp.post("api/auth/register", payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await userHttp.post("api/auth/login", payload);
  return res.data;
}

export async function getMyProfile() {
  const res = await userHttp.get("api/users/profile");
  return res.data;
}

export async function updateMyProfile(payload) {
  const res = await userHttp.put("api/users/profile", payload);
  return res.data;
}

export async function uploadProfileImage(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await userHttp.put("api/users/profile/image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function changePassword(payload) {
  const res = await userHttp.put("api/users/change-password", payload);
  return res.data;
}
