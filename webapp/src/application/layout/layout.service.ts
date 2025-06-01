import { getUIStore } from "../stores/uiStore";

export function setSidebarVisibility(isVisible: boolean) {
  getUIStore().data.isSidebarVisible = isVisible;
  getUIStore().emitChange();
}

export function isSidebarVisible() {
  return getUIStore().data.isSidebarVisible;
}
