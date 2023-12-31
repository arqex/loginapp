import * as SecureStore from 'expo-secure-store';
import {
  AppStore,
  createUIStore,
  getUIStore,
  setUIStore,
} from '../stores/uiStore';
import { apiClient } from '../stores/apiClient';
import { getAuthToken } from '../authentication/authentication.accessors';
import * as SplashScreen from 'expo-splash-screen';
import { handleExpiredSessions } from '../authentication/authentication.service';

export async function initStores() {
  // Inititalize UIStore
  const uiStore = createUIStore();
  setUIStore(uiStore);
  uiStore.addChangeListener(async () => {
    cacheUIStore(uiStore.data);
  });

  handleExpiredSessions();
}

export async function initApp() {
  const store = getUIStore();
  await restoreCachedData(store);
  const authToken = getAuthToken();
  if (authToken) {
    apiClient.authenticate(authToken);
  }
  store.data.isAppInitialized = true;
  store.emitChange();
  await SplashScreen.hideAsync();
}

const UISTORE_KEY = 'UIStore';
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
}

export function initGlobalErrorHandler() {
  ErrorUtils.setGlobalHandler((error) => {
    console.log('Error finally catched here', error);
    throw error;
  });
}
