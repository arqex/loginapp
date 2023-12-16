import EventEmitter from "eventemitter3";

export interface AuthUiStore {
  authenticatedUserId: string | null;
}

export class UIStore<T extends AuthUiStore> {
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
