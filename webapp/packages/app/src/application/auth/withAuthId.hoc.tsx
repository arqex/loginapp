import { forwardRef, type ComponentType } from "react";

/**
 * If you are creating an authenticated screen wrapped by withAuthentication
 * autologin is already performed, no need to use this HOC.
 * You might want to use this HOC for some unauthenticated screens where you want check
 * if the user is already logged in to redirect them.
 * E.g the login screen is the user is already authenticated, we redirect them to the home
 */
export default function withAuthId<Return, Props>(
  Component: ComponentType<Props>
) {
  type withAuthIdProps = Omit<Props, keyof Return>;

  const withAuthId = forwardRef<any, withAuthIdProps>((props, ref) => {
    const context = restoreAuthContext();
    return <Component ref={ref} {...(props as Props)} authContext={context} />;
  });

  withAuthId.displayName = `withAuthId(${
    Component.displayName || Component.name || "component"
  })`;

  return withAuthId;
}
