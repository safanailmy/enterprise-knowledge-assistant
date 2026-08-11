export type UserRole = "admin" | "employee";

export interface CreateUserRequest {
  full_name: string;
  email: string;
  password: string;
  department: string;
  role: UserRole;
}

export interface UserResponse {
  message: string;
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  role: string;
}

export interface MyProfileResponse {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  role: string;
}