import api from "./axios";

import {
  CreateUserRequest,
  UserResponse,
  MyProfileResponse,
} from "../types/user";

/**
 * Create User
 */
export async function createUser(
  data: CreateUserRequest
): Promise<UserResponse> {
  const response = await api.post<UserResponse>(
    "/users",
    data
  );

  return response.data;
}

/**
 * Get My Profile
 */
export async function getMyProfile(): Promise<MyProfileResponse> {
  const response = await api.get<MyProfileResponse>(
    "/users/me"
  );

  return response.data;
}

