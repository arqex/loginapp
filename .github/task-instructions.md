# Catch permission errors in the frontend

The UI displays all the buttons for all users no matter what roles they have. But some users can't perform all operations, so when the webapp make the request to the API, it might fail returning an error 403.

That will throw an error from the api-client that the webapp need to catch in a global way, no matter where it happens, and open a modal that says that the user doesn't have permissions to perform the action.