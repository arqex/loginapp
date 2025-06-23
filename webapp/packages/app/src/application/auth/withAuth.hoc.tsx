import React, { forwardRef, type ComponentType } from "react";
import { restoreAuthContext } from "./auth.context";
import type { ApiUser } from "@loginapp/api-client";
import type { ApiOrg } from "../apiMethods/api.types";

export interface WithAutologinProps {
  contextUser?: ApiUser;
  contextOrg?: ApiOrg;
}

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

  const withAuth = forwardRef<any, withAuthProps>((props, ref) => {
    const context = restoreAuthContext();

    return <Component ref={ref} {...(props as Props)} authContext={context} />;
  });

  withAuth.displayName = `withAuth(${
    Component.displayName || Component.name || "component"
  })`;

  return withAuth;
}
