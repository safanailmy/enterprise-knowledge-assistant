import api from "../api";

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(
  data: LoginRequest
) {
  const response = await api.post(
    "/users/login",
    data
  );

  return response.data;
}