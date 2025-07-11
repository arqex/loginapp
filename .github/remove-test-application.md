# Install login app without the test application

In the backend, before running prisma migrations:
* Check the `schema.prisma` file and delete all the models and lines marked with a testapp comment
* Delete the migration number 2: test_app

In the backend src file:
* Delete the `endpoints/todo` folder
* Delete the code marked with comments in the `account.router.ts` file
* Delete all Todo methods from the `permissions.utils.ts` file

In the webapp, in the api-client package:
* Delete the lines marked with testapp comments in the `account.api.ts` file
* Delete the types marked with testapp comments in the `api.types.ts` file
* Delete the `todoList.api.ts` file

In the webapp, in the app package:
* Delete the `todo_screens`
* Remove the lines marked with testapp comments in the `routes.ts` file
* Delete the TodosHomeWidget component and the import from the `HomeScreen.tsx` file
* Remove all references to `Todo`s in the AccountHomeWidget.
* Remove the todo lists from the `SidebarNavigation.tsx` file along with the `isCreatingTodoList` state and the `_createTodoList` method