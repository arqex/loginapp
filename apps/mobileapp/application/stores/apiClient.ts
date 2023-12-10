import { Platform } from "react-native";
import { ApiClient } from "@loginapp/api-client";

const apiUrl = Platform.select({
  ios: "http://127.0.0.1:3000",
  android: "http://10.0.2.2:3000",
}) as string;
export const api = new ApiClient(apiUrl);
