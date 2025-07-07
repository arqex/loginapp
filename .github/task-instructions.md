# Use withErrors helper to handle errors in data loaders

When the web app uses loaders, like the todoListItemsLoader, it can encounter errors in the data loading process. The `withErrors` helper is designed to handle these errors gracefully. Right now it might be that specific loaders to handle the errors that are named like `todoListItemsLoaderWithErrors`.

Stop using those and delete them, in their place use the existing loaders without errors and wrap them with the `withErrors` helper. This will ensure that any errors encountered during data loading are handled properly, allowing the application to display appropriate error messages or fallback content.

