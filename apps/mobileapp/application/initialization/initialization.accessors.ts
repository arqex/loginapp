import { getUIStore } from '../stores/uiStore';

export function isAppInitialized() {
  return getUIStore().data.isAppInitialized;
}

export function hasGooglePlayServices() {
  return getUIStore().data.hasGooglePlayServices;
}
