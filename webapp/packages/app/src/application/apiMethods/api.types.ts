export interface ApiOrg {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  picURL: string;
}

export type UserRole = "ADMIN" | "EDITOR" | "COLLABORATOR" | "GUEST" | "NONE";

export interface UserAccount extends ApiOrg {
  role: UserRole;
}

export interface LoginResponse {
  authenticatedId: string;
}

export interface LoginResponseWithToken {
  authenticatedId: string;
  token: string;
}

export type EmptyObject = Record<string, never>;
