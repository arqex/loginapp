import EventEmitter from "eventemitter3";

type LSKey = "AUTH_USER" | "COLOR_SCHEME";

const PREFIX = "ycbm_";
export class LS {
  #emitter = new EventEmitter();

  /** Get an object from the browser's local storage by a key */
  get(key: LSKey) {
    try {
      const strVal = localStorage.getItem(PREFIX + key);
      if (strVal) return JSON.parse(strVal);
    } catch (e) {
      return undefined;
    }
  }
  /** Save an object into local storage indexed by key */
  set(key: LSKey, value: any) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      this.#emitter.emit("change");
      return true;
    } catch (e) {
      return false;
    }
  }
  /** Delete an object from local storage by key, if it exists */
  del(key: LSKey) {
    try {
      localStorage.removeItem(PREFIX + key);
      this.#emitter.emit("change");
    } catch (e) {
      // Do nothing
    }
  }
  /** Get an object from the browser's local storage by a key and delete it */
  pop(key: LSKey) {
    const value = this.get(key);
    if (value !== undefined) {
      this.del(key);
      this.#emitter.emit("change");
    }
    return value;
  }
  /** Delete all objects from local storage */
  clear() {
    localStorage.clear();
    this.#emitter.emit("change");
  }

  /** Listen to changes in the LS */
  addChangeListener(clbk: () => void) {
    this.#emitter.on("change", clbk);
  }

  /** Stop listening to changes in the LS */
  removeChangeListener(clbk: () => void) {
    this.#emitter.removeListener("change", clbk);
  }
}

let singleton: LS;
export function getLS(): LS {
  if (!singleton) throw new Error("LS not initialized");
  return singleton;
}

export function setLS(ls: LS) {
  singleton = ls;
}
