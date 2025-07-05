# Create user setup screen

When the user first logs in, they will have a `needSetup: true` flag in their clientData. That flag will be evaluated in the `withAuth` HOC and if it's true, the user will be redirected to the `/initial_setup` route.

In this task we need to create the route and complete the `InitialSetupScreen` component.

That screen will contain a series of steps to let the user complete their information. And they will be displayed depending on the missing data.

# The steps are:
1. **Name**: The user will be prompted to enter their name if it's not set.
2. **Account name**: The user will be prompted to enter their account name if it's not set. The account name will have a default value based on the user's name.