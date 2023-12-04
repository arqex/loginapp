import { ReactRoute, UrlhubRoute } from "urlhub";
import HomeScreen from "../../screens/home/HomeScreen";
import VerifyEmailScreen from "../../auth_app/screens/verify_email/VerifyEmailScreen";
import NotFoundScreen from "../../screens/notFound/NotFoundScreen";

export const routes: UrlhubRoute<ReactRoute>[] = [
  { path: "/home", cb: HomeScreen },
  { path: "/verify_email", cb: VerifyEmailScreen }, // This screen might be visited with the user authenticated
  { path: "/", cb: HomeScreen },
  { path: "*", cb: NotFoundScreen }, // Page not found?
];
