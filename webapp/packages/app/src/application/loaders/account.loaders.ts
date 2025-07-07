import {
  loadAccountWithCache,
  loadAccountUsersWithCache,
} from "@loginapp/api-client";
import { createLoader } from "@loginapp/api-client/loaders";

/**
 * Loader to get account data by ID
 */
export const accountLoader = createLoader(loadAccountWithCache);

/**
 * Loader to get users in an account by account ID
 */
export const accountUsersLoader = createLoader(loadAccountUsersWithCache);
