# Create the first authenticated screen in the webapp

After login, we get the id of the authenticated user, at that point we should start loading the data for the authenticated app. That data is:
* The user information
* The accounts where the user belong
* The account for the context

To load that information we need to wrap the screen in an HOC that displays a SpinnerScreen when it's loading and pass it as props to the screen when they are available.
