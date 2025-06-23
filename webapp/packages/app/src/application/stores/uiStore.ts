import EventEmitter from "eventemitter3";
import type { ApiOrg, ApiUser } from "../apiMethods/api.types";

export const emptyStore: UiStoreData = {
  authenticatedUserId: "",
  contextUser: undefined,
  contextOrg: undefined,
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

export interface UiStoreData {
  authenticatedUserId: string | null;
  contextUser?: ApiUser; // Set right after authentication
  contextOrg?: ApiOrg; // Set right after authentication
}

export class UIStore<T extends UiStoreData> {
  #emitter = new EventEmitter();
  data: T;
  emitTimeout: NodeJS.Timeout | number | undefined;

  constructor(initialData?: T) {
    this.data = initialData
      ? { ...initialData }
      : ({ authenticatedUserId: null } as T);
  }

  addChangeListener(clbk: () => void) {
    this.#emitter.on("change", clbk);
  }
  removeChangeListener(clbk: () => void) {
    this.#emitter.removeListener("change", clbk);
  }
  emitChange() {
    // wait one cycle to batch multiple changes in one re-render
    if (!this.emitTimeout) {
      this.emitTimeout = setTimeout(() => {
        delete this.emitTimeout;
        this.#emitter.emit("change");
      });
    }
  }
}
