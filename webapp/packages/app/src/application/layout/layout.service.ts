import { getUIStore } from "../stores/uiStore";

export function setSidebarVisibility(isVisible: boolean) {
  getUIStore().data.isSidebarVisible = isVisible;
  getUIStore().emitChange();
}

export function isSidebarVisible() {
  return getUIStore().data.isSidebarVisible;
}

export function getStickyStyles(
  stickyPosition: "top" | "bottom" = "top",
  stickyRef?: HTMLElement
) {
  const styles: any = {
    position: "sticky",
    zIndex: 10,
  };
  if (stickyPosition === "top") {
    styles.top = stickyRef?.getBoundingClientRect().height || 0;
  } else {
    styles.bottom = stickyRef?.getBoundingClientRect().height || 0;
  }
  return styles;
}

export function isMobileLayout() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1200;
}
