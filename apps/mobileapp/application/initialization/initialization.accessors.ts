import { getUIStore } from "../stores/uiStore";

export function isAppInitialized() {
  return getUIStore().data.isAppInitialized;
}
