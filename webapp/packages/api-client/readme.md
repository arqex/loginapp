# API client

This library provides a generic, extensible client for connecting to REST APIs, with built-in support for authentication, request caching, and middleware.

## How to develop with the library

The recommended way to develop with this library is to prepare your API client for a specific backend by defining dedicated methods in the methods folder. These methods encapsulate the API endpoints your app needs, providing a clear and type-safe interface for the rest of your application.

Why use this convention?

* Separation of concerns: Keeps low-level request logic separate from business logic.
* Type safety: Each method can define precise input and output types.
* Maintainability: Centralizes all API endpoint logic in one place, making it easier to update or refactor.

Example: Suppose you want to load a user and update a user. You would add these methods in user.api.ts

```ts
// Load a user by ID
export async function loadUser(apiClient: ApiClient, id: string) {
  return (await apiClient.requester.get(
    `/users/${id}`
  )) as ResponseWithData<ApiUser>;
}
```

These methods are exported by the `index.ts` file in the library, so they are easily imported in the app.

## Caching requests

The library provides a method to cache GET requests. When you use the `getCached` method, the client checks if a cached response exists for the requested endpoint. If so, it returns the cached data; otherwise, it performs the network request and stores the result in the cache. You can invalidate the cache for specific endpoints or clear the entire cache.

Here's an example of a method created to cache the request:

```ts
export function loadUserWithCache(apiClient: ApiClient, id: string) {
  return apiClient.requester.getCached(
    `/users/${id}`
  ) as CachedResponse<ApiUser>;
}
```

It's always possible to invalidate and clear the cache. The cache mechanism accept the wildcard '*' to match multiple routes with one command:

```ts
// Invalidate marks the result as stale, so it will still be able, but will be reloaded when the cached load is requested
apiClient.invalidateCacheResponse("/users/123");
// Clearing the result will remove it completely from the cache, so it won't be available directly
apiClient.clearCachedResult("/users/123");
// Can use wildcards to invalidate or clear many requests at once
apiClient.invalidateCacheResponse("/users/*");
// Clearing all the cache
apiClient.clearCachedResult("*");
```

Since the loading methods are defined outside of the application, the application won't know what routes need to be invalidated, so it's recommended to create invalidators along with the cached methods to be used by the app.

```ts
export function invalidateUser(apiClient: ApiClient, id: string ) {
  return apiClient.invalidateCacheResponse(`/users/${id}`);
}
```

## How to use it

Usually, an instance of your ApiClient is created in your application, configuring it with the desired options (such as base URL, headers, authentication, and middleware). You should then pass this configured client instance to the API methods you have defined and exported from the methods folder.

This approach ensures:

* Consistent configuration: All API calls share the same settings (base URL, authentication, headers, etc.).
* Centralized management: You can easily update authentication tokens, headers, or middleware in one place.
* Testability: You can mock or swap the client instance for testing purposes.

An example of this pattern would be:

```ts
import { ApiClient, loadUser, updateUser } from "api-client";

// Create and configure the ApiClient instance once
const apiClient = new ApiClient({
  apiURL: "https://api.example.com",
  headers: { "x-app-id": "my-app" },
  // Optionally add middleware or authentication here
});

// Pass the configured client to your API methods
const responseWithData = await loadUser(apiClient, "user-id-123");
await updateUser(apiClient, "user-id-123", { name: "New Name" });
```

## Returned data

The methods that make the requests should return a `Promise<ResponseData<T>>`. That object wraps the HTTP response and provides both the data and metadata about the response. It tries to parse the JSON of the body if possible.

The structure of `ResponseWithData`:

```ts
export interface ResponseWithData<T> {
  data: T;                        // The actual data returned by the API
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: Headers;               // HTTP headers
  ok: boolean;                    // true if status is in the range 200-299
  redirected: boolean;
  status: number;                 // HTTP status code
  statusText: string;
  type: "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
  url: string;                    // The final URL of the response
}
```

The methods that are using the caching mechanism are expected to return a `CachedResponse<T>`. This object provides, but also information about the loading state and the underlying promise, besides the response data when it has already been loaded.

The `CachedResponse` structure:

```ts
// See: [apiClient.types.ts](apiClient.types.ts)
export interface CachedResponse<T> {
  promise: Promise<ResponseWithData<T>>; // Promise resolving to the response
  isLoading: boolean;                    // true if the request is in progress
  response?: ResponseWithData<T>;        // The cached response, if available
  requestOptions?: RequestInit;          // The options used for the request
}
```

## Listening to new data load

You can listen to load events from the API client to refresh your app whenever new data is available. This is useful for triggering UI updates, notifications, or other actions after any API request completes.

To do this, use the addLoadListener method to register a callback that will be called every time a request finishes. For example:

```ts
import { ApiClient } from "api-client";

const apiClient = new ApiClient({ apiURL: "https://api.example.com" });

function onApiDataLoaded() {
  // Refresh your app or update the UI here
  console.log("API data loaded, refreshing app...");
}

// Register the listener
apiClient.addLoadListener(onApiDataLoaded);

// Later, you can remove the listener if needed
// apiClient.removeLoadListener(onApiDataLoaded);
```

## Middlewares

You can register middleware functions to intercept and modify requests before they are sent, or responses before they are returned. This is useful for tasks like logging, error transformation, or injecting custom headers.

```ts
const apiClient = new ApiClient({
  apiURL: "https://api.example.com",
  requestMiddleware: [
    (config) => {
      // Add a custom header before sending the request
      config.options.headers["x-custom"] = "value";
      return config;
    },
  ],
  responseMiddleware: [
    (response) => {
      // Transform the response if needed
      return response;
    },
  ],
});
```

## Authentication

The client allows you to authenticate using a token (Bearer or Basic). When authenticated, the token is automatically included in the Authorization header for all requests. You can also unauthenticate to remove credentials

```ts
const apiClient = new ApiClient({
  apiURL: "https://api.example.com"
});

// Authenticate with a Bearer token
apiClient.authenticate("my_access_token", "bearer");

// Now the requests are authenticated
await updateUser(apiClient, "user-id-123", { name: "New Name" });
```

## Headers management

Headers can be added in 3 ways:

* With the initial configuration, those headers will be added to all the requests made with the new created instance.
* Using middlewares we can update the headers of all requests, but it's more flexible than when setting them with the initial configuration, as we can add logic for when the headers are added.
* For single requests the `apiClient.withHeaders` method can be used.

The `withHeaders` method allows you to create a new API client instance with additional or overridden headers. This is useful when you want to temporarily add headers (e.g., for a specific request or context) without affecting the original client instance.

```ts
const apiClient = new ApiClient({
  headers: { foo: "bar" },
});

// Create a new client with an extra header
const clientWithExtraHeader = apiClient.withHeaders({ bar: "baz" });

// This request uses only the original headers
await loadUser( apiClient, 'userid-123' );

// This request uses both the original and new headers
await loadUser( clientWithExtraHeader, 'userid-123' );
```

## Error handling

When a request fails (for example, if the server returns a status code of 300 or higher), the library throws an `ApiError` exception. This exception contains detailed information about the failed response and the request that caused it.

Wrap your API calls in a try/catch block to catch and handle errors:

```ts
import { apiClient } from 'apiClientInstance';
import { ApiError, loadUser } from 'api-client';

try {
  const user = await loadUser(apiClient, "user-id-123");
  // Use the user data
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API-specific errors
    console.error("API Error:", error.response.status, error.response.data);
    // You can access error.response and error.request for more details
  } else {
    // Handle other errors (e.g., network issues)
    console.error("Unexpected error:", error);
  }
}
```

The ApiError object provides:

* error.response: The full API response, including status, data, and headers.
* error.request: The request options used for the failed call.

This allows you to display user-friendly error messages, log issues, or trigger specific error-handling logic in your app.

## Data loaders

This library provides support for **data loaders**, which make it easy to declaratively fetch and cache data in your React components or other parts of your application.

A loader is a function that wraps your API methods and manages the loading state, cached responses, and (optionally) error handling. Loaders are especially useful for integrating with React, as they help you keep your UI in sync with the data-fetching lifecycle.

Using the `loadUserWithCache` from other examples above, we can create a loader very easily:

```ts
import { createLoader, loadUserWithCache } from "api";
export const userLoader = createLoader(loadUserWithCache);
```

Then it can used inside of react components to manage the data loading with ease:

```tsx
export function UserProfile({ userId }: { userId: string }) {
  const apiClient = useApiClient();
  const result = userLoader(apiClient, userId);

  if (result.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{result.data.name}</h2>
      <p>Email: {result.data.email}</p>
    </div>
  );
}
```

If we want to handle errors inside of the component there is a `withErrors` that help us with it:

```tsx
const result = withErrors(userLoader)(apiClient, userId);
if (result.error) return <div>Error: {result.error.message}</div>;
```
