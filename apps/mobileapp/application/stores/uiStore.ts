import SecureStore from "expo-secure-store";
import { UIStore } from "@loginapp/api-cacher";

interface AppStoreData {
  isAppInitialized: boolean;
  authenticatedUserId: string | null;
  authenticationToken: string | null;
}

export type AppStore = UIStore<AppStoreData>;

// A singleton that might be updated
// by different calls and render in the server
let uiStore: AppStore | undefined;

export function createUIStore(initialData?: Partial<AppStoreData>) {
  const data = {
    isAppInitialized: false,
    authenticatedUserId: null,
    authenticationToken: null,
    ...(initialData || {}),
  };
  return new UIStore<AppStoreData>(data);
}

export function setUIStore(nextStore: AppStore) {
  uiStore = nextStore;
}

export function getUIStore(): AppStore {
  if (!uiStore) throw new Error("Api Cacher not initialized");
  return uiStore;
}
