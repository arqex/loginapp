import { forwardRef, type ComponentType } from "react";
import { getAuthenticatedId } from "./auth.context";
import { getRouter } from "../routing/router";
import SpinnerScreen from "../../components/SpinnerScreen/SpinnerScreen";

/**
 * Higher-order component for screens that should only be accessible when the user is NOT authenticated.
 * If the user is authenticated, it redirects them to the home screen.
 * This is useful for login, signup, and other authentication-related screens.
 */
export default function withUnauth<Return, Props>(
  Component: ComponentType<Props>
) {
  type WithUnauthProps = Omit<Props, keyof Return>;

  const withUnauth = forwardRef<ComponentType, WithUnauthProps>(
    (props, ref) => {
      const authenticatedId = getAuthenticatedId();

      if (authenticatedId) {
        // User is authenticated, redirect to home
        getRouter().replace("/home");
        return <SpinnerScreen />;
      }

      // User is not authenticated, render the component
      return <Component ref={ref} {...(props as Props)} />;
    }
  );

  withUnauth.displayName = `withUnauth(${
    Component.displayName || Component.name || "component"
  })`;

  return withUnauth;
}
