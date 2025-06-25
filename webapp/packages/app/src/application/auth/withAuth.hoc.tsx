import React, { forwardRef, type ComponentType } from "react";
import {
  getAuthContext,
  getAuthenticatedId,
  setAuthContext,
} from "./auth.context";
import type { ApiAccount } from "@loginapp/api-client";
import { getRouter } from "../routing/router";
import { getApiClient } from "../stores/apiClient";
import SpinnerScreen from "../../components/SpinnerScreen/SpinnerScreen";
import type { AuthContext } from "../stores/uiStore";

export type WithAuthProps<T> = T & {
  authContext: AuthContext;
};

/**
 * If you are creating an authenticated screen wrapped by withAuth
 * autologin is already performed, no need to use this HOC.
 * You might want to use this HOC for some unauthenticated screens where you want check
 * if the user is already logged in to redirect them.
 * E.g the login screen is the user is already authenticated, we redirect them to the home
 */
export default function withAuth<Return, Props>(
  Component: ComponentType<Props>
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
    let contextAccount: ApiAccount | undefined;
    if (userAccounts?.length) {
      const { data: account } = accountLoader(
        getApiClient(),
        userAccounts[0].id
      );
      contextAccount = account;
    }

    if (!user || !contextAccount) {
      return <SpinnerScreen />;
    }

    // Setting the context only make changes when user, account or role changes
    setAuthContext(user, contextAccount, userAccounts[0]?.role);
    // Getting the context make sure that the object is the same
    const context = getAuthContext();

    return <Component ref={ref} {...(props as Props)} authContext={context} />;
  });

  withAuth.displayName = `withAuth(${
    Component.displayName || Component.name || "component"
  })`;

  return withAuth;
}
