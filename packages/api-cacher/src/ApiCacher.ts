import EventEmitter from "eventemitter3";

import { ApiClient, ApiUser } from "@loginapp/api-client";

interface IndexOf<T> {
  [key: string]: T;
}

export interface ApiCache {
  users: IndexOf<ApiUser>;
}

const blankCache: ApiCache = {
  users: {},
};

interface ApiCacherConfig {
  apiClient: ApiClient;
  initialCache?: Partial<ApiCache>;
}

export class ApiCacher {
  #emitter = new EventEmitter();
  emitTimeout: NodeJS.Timeout | number | undefined;
  data: ApiCache;
  apiClient: ApiClient;

  constructor({ apiClient, initialCache = {} }: ApiCacherConfig) {
    this.data = {
      ...blankCache,
      ...initialCache,
    };
    this.apiClient = apiClient;
  }

  authenticate(authToken: string) {
    this.apiClient.authenticate(authToken);
  }

  unauthenticate() {
    this.apiClient.unauthenticate();
  }

  /** Adds headers only for the following request */
  withHeaders(headers: { [headerName: string]: string }) {
    return new ApiCacher({
      apiClient: this.apiClient.withHeaders(headers),
      initialCache: this.data,
    });
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

export function createApiCacher(config: ApiCacherConfig) {
  return new ApiCacher(config);
}
