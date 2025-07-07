import { loadAccountInvitationsWithCache } from "@loginapp/api-client";
import { createLoader } from "@loginapp/api-client/loaders";

/**
 * Loader to get invitations for an account by account ID
 */
export const accountInvitationsLoader = createLoader(
  loadAccountInvitationsWithCache
);
