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

export type ApiAccountRole = "ADMIN" | "EDITOR" | "COLLABORATOR";

export interface AccountUser {
  id: string;
  name: string;
  role: ApiAccountRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserAccount extends ApiAccount {
  account: ApiAccount;
  accountId: string;
  createdAt: string;
  role: ApiAccountRole;
  updatedAt: string;
  userId: string;
}

export interface LoginResponse {
  authenticatedId: string;
}

export interface LoginResponseWithToken {
  authenticatedId: string;
  token: string;
}

export type EmptyObject = Record<string, never>;

export interface ApiTodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  todoListId: string;
}

export interface ApiTodoList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
}

export interface ListCreationPayload {
  name: string;
  accountId: string;
}

export interface PaginationResponseData<T> {
  items: T[];
  pageSize: number;
  cursor: string | null;
  nextCursor: string | null;
}

export type ApiInvitationStatus =
  | "PENDING"
  | "DECLINED"
  | "ACCEPTED"
  | "CANCELLED";

export interface ApiInvitation {
  id: string;
  email: string;
  status: ApiInvitationStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  isExpired?: boolean;
  isValid?: boolean;
  account: {
    id: string;
    name: string;
  };
  meta: {
    role: ApiAccountRole;
    invitedBy?: string;
  };
}

export interface CreateInvitationPayload {
  email: string;
  role?: ApiAccountRole;
  expirationDays?: number;
}

export interface UpdateInvitationPayload {
  role?: ApiAccountRole;
  expirationDays?: number;
}
