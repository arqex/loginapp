export interface ApiAccount {
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

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  COLLABORATOR = "COLLABORATOR",
  GUEST = "GUEST",
  NONE = "NONE",
}

export interface UserAccount extends ApiAccount {
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
