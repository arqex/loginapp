# Creating new screens in the webapp

- We call screens to the components that manage a route in our application
- Screens are stored in the `src/screens` route of the packages
- Their filenames should end with `Screen.tsx`. E.g: The filename for a team screen would be `TeamScreen.tsx`.
- A screen always need a route. Routes in the applications are defined at the `src/application/routing/routes.ts`.
- Route segments follow camel case
- Follow how other routes are defined in the file to add a new route
- Creating a new screen require create a route for it. A good route for a team screen would be `/team`.
- Screens that need the user to be authenticated need their main component to be wrapped in the `withAuth` HOC, that will provide the current authenticated user and account.
- Screens that need authentication need to use the `<ScreenWithAuth>` as their root component to apply the authenticated layout.
- Screens that doesn't need an authenticated user, need to be wrapped by the `<LoginScreenLayout>` component.
- Follow our [React programming guidelines](./react_development.md).