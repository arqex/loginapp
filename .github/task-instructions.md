# The task to be implemented

As an example of the login app we want to build a collaborative todo-list app, to do so we need to create prisma models to allow users to manage todo lists within an account. The basic models will be:

* TodoItem: Things the user want to track if are done
* TodoList: Collection of TodoItems

We need endpoints for creation, update and deletion of TodoLists and TodoItems.

There are 3 roles for users in an account:
* CONTRIBUTORS: Can read TodoLists and TodoItems in the account. Besides reading capabilities, they can only mark TodoItems as Done or Undone, all other actions are restricted.
* EDITORS: Can do what contributors do and they can create and edit TodoItems in existing TodoLists.
* ADMIN: Can create, delete and edit TodoLists and TodoItems.

