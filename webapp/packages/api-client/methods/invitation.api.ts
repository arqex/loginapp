import type {
  ApiInvitation,
  CreateInvitationPayload,
  UpdateInvitationPayload,
  EmptyObject,
} from "./api.types";
import type { ResponseWithData, CachedResponse } from "../apiClient.types";
import { ApiClient } from "../ApiClient";

// Load invitations for an account
export async function loadAccountInvitations(
  apiClient: ApiClient,
  accountId: string
): Promise<ResponseWithData<ApiInvitation[]>> {
  return await apiClient.requester.get(`/invitations/account/${accountId}`);
}

// Load invitations for an account with caching
export function loadAccountInvitationsWithCache(
  apiClient: ApiClient,
  accountId: string
): CachedResponse<ApiInvitation[]> {
  return apiClient.requester.getCached(`/invitations/account/${accountId}`);
}

// Create a new invitation
export async function createInvitation(
  apiClient: ApiClient,
  accountId: string,
  data: CreateInvitationPayload
): Promise<ResponseWithData<ApiInvitation>> {
  return await apiClient.requester.post(
    `/invitations/account/${accountId}`,
    data
  );
}

// Update an invitation
export async function updateInvitation(
  apiClient: ApiClient,
  invitationId: string,
  data: UpdateInvitationPayload
): Promise<ResponseWithData<ApiInvitation>> {
  return await apiClient.requester.patch(`/invitations/${invitationId}`, data);
}

// Delete an invitation
export async function deleteInvitation(
  apiClient: ApiClient,
  invitationId: string
): Promise<ResponseWithData<EmptyObject>> {
  return await apiClient.requester.delete(`/invitations/${invitationId}`);
}

// Resend an invitation
export async function resendInvitation(
  apiClient: ApiClient,
  invitationId: string,
  expirationDays?: number
): Promise<ResponseWithData<ApiInvitation>> {
  return await apiClient.requester.post(`/invitations/${invitationId}/resend`, {
    expirationDays: expirationDays || 7,
  });
}

// Load a single invitation (public endpoint)
export async function loadInvitation(
  apiClient: ApiClient,
  invitationId: string
): Promise<ResponseWithData<ApiInvitation>> {
  return await apiClient.requester.get(`/invitations/${invitationId}`);
}

// Accept an invitation
export async function acceptInvitation(
  apiClient: ApiClient,
  invitationId: string
): Promise<
  ResponseWithData<{ accountId: string; role: string; message: string }>
> {
  return await apiClient.requester.post(`/invitations/${invitationId}/accept`);
}

// Decline an invitation
export async function declineInvitation(
  apiClient: ApiClient,
  invitationId: string
): Promise<ResponseWithData<{ message: string }>> {
  return await apiClient.requester.post(`/invitations/${invitationId}/decline`);
}

// Cache invalidation functions
export function clearAccountInvitationsCache(
  apiClient: ApiClient,
  accountId: string
) {
  apiClient.clearCachedResult(`/invitations/account/${accountId}`);
}

export function invalidateAccountInvitations(
  apiClient: ApiClient,
  accountId: string
) {
  apiClient.invalidateCacheResponse(`/invitations/account/${accountId}`);
}
