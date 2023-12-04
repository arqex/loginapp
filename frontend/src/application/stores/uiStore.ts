import EventEmitter from "eventemitter3";

export interface UiStoreData {
  authenticatedUserId: string | null;
  toast: any;
}

export const emptyStore: UiStoreData = {
  authenticatedUserId: "",
  toast: undefined,
};

export class UIStore {
  #emitter = new EventEmitter();
  data = { ...emptyStore };
  emitTimeout: number | undefined;

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

// A singleton that might be updated
// by different calls and render in the server
let uiStore: UIStore | undefined;
export function createUIStore(initialData?: Partial<UiStoreData>) {
  const store = new UIStore();
  if (initialData) {
    store.data = {
      ...emptyStore,
      ...initialData,
    };
  }
  return store;
}

export function setUIStore(nextStore: UIStore) {
  uiStore = nextStore;
}

export function getUIStore(): UIStore {
  if (!uiStore) throw new Error("Api Cacher not initialized");
  return uiStore;
}
