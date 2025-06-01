import HomeScreen from "../../screens/home/HomeScreen";
import VerifyEmailScreen from "../../auth_app/screens/verify_email/VerifyEmailScreen";
import NotFoundScreen from "../../screens/notFound/NotFoundScreen";
import Sample1Screen from "../../screens/routeSamples/Sample1Screen";
import Sample2Screen from "../../screens/routeSamples/Sample2Screen";
import { ReactRoute } from "./router";

export const routes: ReactRoute[] = [
  { path: "/home", cb: HomeScreen },
  { path: "/verify_email", cb: VerifyEmailScreen }, // This screen might be visited with the user authenticated
  { path: "/sample1", cb: Sample1Screen },
  { path: "/sample2", cb: Sample2Screen },
  { path: "/", cb: HomeScreen },
  { path: "/*", cb: NotFoundScreen }, // Page not found?
];
