import * as SecureStore from "expo-secure-store";
import {
  AppStore,
  createUIStore,
  getUIStore,
  setUIStore,
} from "../stores/uiStore";
import { setApiCacher, createApiCacher } from "../stores/apiCacher";
import { apiClient } from "../stores/apiClient";

export async function initStores() {
  // Inititalize UIStore
  const uiStore = createUIStore();
  setUIStore(uiStore);
  uiStore.addChangeListener(async () => {
    cacheUIStore(uiStore.data);
  });

  restoreCachedData(uiStore);

  // Initialize data store
  const apiCacher = createApiCacher({ apiClient });
  setApiCacher(apiCacher);
}

export async function initApp() {
  const store = getUIStore();
  await restoreCachedData(store);
  store.data.isAppInitialized = true;
  store.emitChange();
}

const UISTORE_KEY = "UIStore";
async function getCachedUIStore() {
  const cached = await SecureStore.getItemAsync(UISTORE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }
  return {};
}

async function cacheUIStore(uiStore: any) {
  await SecureStore.setItemAsync(UISTORE_KEY, JSON.stringify(uiStore));
}

async function restoreCachedData(uiStore: AppStore) {
  const cachedData = await getCachedUIStore();
  uiStore.data = {
    ...uiStore.data,
    ...cachedData,
  };
  uiStore.emitChange();
}
