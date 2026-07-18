import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(
  request: LoginRequest
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append("username", request.email);
  formData.append("password", request.password);

  const response = await api.post<LoginResponse>(
    "/users/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

export interface UserProfile {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  role: string;
}

export async function getCurrentUser(): Promise<UserProfile> {
  const response = await api.get<UserProfile>("/users/me");
  return response.data;
}