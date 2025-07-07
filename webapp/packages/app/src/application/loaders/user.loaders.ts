import {
  loadUserWithCache,
  loadUserAccountsWithCache,
} from "@loginapp/api-client";
import { createLoader } from "@loginapp/api-client/loaders";

/**
 * Loader to get user data by ID
 */
export const userLoader = createLoader(loadUserWithCache);

/**
 * Loader to get user accounts by user ID
 */
export const userAccountsLoader = createLoader(loadUserAccountsWithCache);
