import { forwardRef, type ComponentType } from "react";
import {
  getAuthContext,
  getAuthenticatedId,
  setAuthContext,
} from "./auth.context";
import { getRouter } from "../routing/router";
import { getApiClient } from "../stores/apiClient";
import SpinnerScreen from "../../components/SpinnerScreen/SpinnerScreen";
import type { AuthContext } from "../stores/uiStore";
import { userLoader, userAccountsLoader } from "../loaders/user.loaders";

export type WithAuthProps<T> = T & {
  authContext: AuthContext;
};

export type withAuthOptions = {
  skipIntercept?: boolean; // If true, skips the interception of screens
};

/**
 * If you are creating an authenticated screen wrapped by withAuth
 * autologin is already performed, no need to use this HOC.
 * You might want to use this HOC for some unauthenticated screens where you want check
 * if the user is already logged in to redirect them.
 * E.g the login screen is the user is already authenticated, we redirect them to the home
 */
export default function withAuth<Return, Props>(
  Component: ComponentType<Props>,
  { skipIntercept }: withAuthOptions = {}
) {
  type withAuthProps = Omit<Props, keyof Return>;

  const withAuth = forwardRef<ComponentType, withAuthProps>((props, ref) => {
    const authenticatedId = getAuthenticatedId();
    if (!authenticatedId) {
      getRouter().push("/login");
      return <SpinnerScreen />;
    }

    const { data: user } = userLoader(getApiClient(), authenticatedId);
    const { data: userAccounts } = userAccountsLoader(
      getApiClient(),
      authenticatedId
    );

    if (user && user?.signals.missingAuth && !skipIntercept) {
      // If the user has missing auth signals, redirect to setup
      getRouter().replace("/set_password");
      return <SpinnerScreen />;
    }

    if (user && user?.clientData.needSetup && !skipIntercept) {
      // If the user has client data that needs setup, redirect to setup
      getRouter().replace("/initial_setup");
      return <SpinnerScreen />;
    }

    if (!user || !userAccounts) {
      return <SpinnerScreen />;
    }

    // If user has no accounts, redirect to create account screen
    if (userAccounts.length === 0 && !skipIntercept) {
      getRouter().replace("/create_account");
      return <SpinnerScreen />;
    }

    // Setting the context only make changes when user, account or role changes
    setAuthContext(user, userAccounts[0]?.account, userAccounts[0]?.role);
    // Getting the context make sure that the object is the same
    const context = getAuthContext();

    return <Component ref={ref} {...(props as Props)} authContext={context} />;
  });

  withAuth.displayName = `withAuth(${
    Component.displayName || Component.name || "component"
  })`;

  return withAuth;
}
