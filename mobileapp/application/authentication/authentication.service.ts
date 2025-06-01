import {
  ResponseMiddleware,
  clearCache,
  verifyEmail as apiVerifyEmail,
  loginByProvider as apiLoginByProvider,
  signupByProvider as apiSignupByProvider,
} from '@loginapp/api-client';
import { getUIStore } from '../stores/uiStore';
import { getAuthenticatedId } from './authentication.accessors';
import { apiClient } from '../stores/apiClient';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

export function onAuthenticate(userId: string, token: string) {
  const store = getUIStore();
  store.data.authenticatedUserId = userId;
  store.data.authenticationToken = token;
  store.data.isAuthenticated = true;
  apiClient.authenticate(token);
  store.emitChange();
}

export function onLogout() {
  const store = getUIStore();
  store.data.isAuthenticated = false;
  apiClient.unauthenticate();
  setTimeout(() => {
    store.data.authenticatedUserId = null;
    store.data.authenticationToken = null;
    clearCache();
    store.emitChange();
  }, 1000);
  store.emitChange();
}

export function handleExpiredSessions() {
  const currentMiddleware = apiClient.requester.responseMiddleware;
  if (!currentMiddleware.includes(expiredSessionMiddleware)) {
    currentMiddleware.push(expiredSessionMiddleware);
  }
}

const expiredSessionMiddleware: ResponseMiddleware = (res) => {
  if (res.status === 401 && getAuthenticatedId()) {
    console.log('Expired session detected, logging out');
    onLogout();
  }
  return res;
};

export async function verifyEmail(vc: string, email: string) {
  const { authenticatedId, token } = (
    await apiVerifyEmail(apiClient, vc, email, false)
  ).data;
  onAuthenticate(authenticatedId, token);
}

export async function loginByProvider(
  provider: 'apple' | 'google',
  idToken: string,
) {
  const { authenticatedId, token } = (
    await apiLoginByProvider(apiClient, provider, idToken)
  ).data;
  onAuthenticate(authenticatedId, token);
}

export async function signupByProvider(
  provider: 'apple' | 'google',
  idToken: string,
) {
  const { authenticatedId, token } = (
    await apiSignupByProvider(apiClient, provider, idToken)
  ).data;
  onAuthenticate(authenticatedId, token);
}

export async function checkGooglePlayServices() {
  if (Platform.OS === 'android') {
    const hasPlayServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: false,
    });
    if (hasPlayServices) {
      getUIStore().data.hasGooglePlayServices = true;
      getUIStore().emitChange();
    }
  }

  console.log(
    'Checking play services',
    getUIStore().data.hasGooglePlayServices,
  );
}
