import { UIStore } from "@loginapp/ui-store";
export interface UiStoreData {
  authenticatedUserId: string | null;
  toast: any;
  isSidebarVisible: boolean;
}

export const emptyStore: UiStoreData = {
  authenticatedUserId: "",
  toast: undefined,
  isSidebarVisible: false,
};

export type AppStore = UIStore<UiStoreData>;

// A singleton that might be updated
// by different calls and render in the server
let uiStore: AppStore | undefined;

export function createUIStore(initialData?: Partial<UiStoreData>) {
  const data = {
    ...emptyStore,
    ...(initialData || {}),
  };
  return new UIStore<UiStoreData>(data);
}

export function setUIStore(nextStore: AppStore) {
  uiStore = nextStore;
}

export function getUIStore(): AppStore {
  if (!uiStore) throw new Error("UI store not initialized");
  return uiStore;
}
