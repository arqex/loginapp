declare var global: any;

import { ApiClient } from "./ApiClient";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    headers: [],
  })
);

describe("ApiClient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an instance", () => {
    const apiClient = new ApiClient({});
    expect(apiClient).toBeInstanceOf(ApiClient);
  });

  it("options should be passed to the requester", async () => {
    const apiClient = new ApiClient({
      headers: {},
      authToken: "testToken",
      authType: "bearer",
      apiURL: "https://api.example.com",
    });

    await apiClient.requester.get("/dummy_path");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/dummy_path",
      {
        credentials: "include",
        headers: {
          Authorization: "Bearer testToken",
          "content-type": "application/json",
        },
        method: "GET",
      }
    );
  });

  describe("authenticate", () => {
    it("should add the auth headers", async () => {
      const apiClient = new ApiClient({});
      apiClient.authenticate("dummy_token", "basic");
      await apiClient.requester.get("/dummy_path");
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.youcanbook.me/dummy_path",
        {
          credentials: "include",
          headers: {
            Authorization: "Basic dummy_token",
            "content-type": "application/json",
          },
          method: "GET",
        }
      );
    });
  });

  describe("unauthenticate", () => {
    it("should not send auth headers after unauthenticate", async () => {
      const apiClient = new ApiClient({
        headers: {},
        authToken: "testToken",
        authType: "bearer",
        apiURL: "https://api.example.com",
      });

      apiClient.unauthenticate();

      await apiClient.requester.get("/dummy_path");
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.example.com/dummy_path",
        {
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          method: "GET",
        }
      );
    });
  });

  describe("withHeaders", () => {
    it("should return a new instance", () => {
      const apiClient = new ApiClient({
        headers: { foo: "bar" },
      });

      const withHeaderClient = apiClient.withHeaders({ bar: "baz" });

      expect(withHeaderClient).not.toBe(apiClient);
    });

    it("should add the headers to the new instance", async () => {
      const apiClient = new ApiClient({
        headers: { foo: "bar" },
      });

      const withHeaderClient = apiClient.withHeaders({ bar: "baz" });

      await apiClient.requester.get("/dummy_path");
      await withHeaderClient.requester.get("/dummy_path");

      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        "https://api.youcanbook.me/dummy_path",
        {
          credentials: "include",
          headers: {
            foo: "bar",
            "content-type": "application/json",
          },
          method: "GET",
        }
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        "https://api.youcanbook.me/dummy_path",
        {
          credentials: "include",
          headers: {
            foo: "bar",
            bar: "baz",
            "content-type": "application/json",
          },
          method: "GET",
        }
      );
    });
  });
});
