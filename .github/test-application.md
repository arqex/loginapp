# The test application

As an example, this repo contains a collaborative todo-list app for demo purposes.

* TodoItem: Things the user want to track if are done
* TodoList: Collection of TodoItems
* Accounts have TodoList

There are 3 roles for users in an account:

* CONTRIBUTORS: Can read TodoLists and TodoItems in the account. Besides reading capabilities, they can only mark TodoItems as Done or Undone, all other actions are restricted.
* EDITORS: Can do what contributors do and they can create and edit TodoItems in existing TodoLists.
* ADMIN: Can create, delete and edit TodoLists and TodoItems.

The app also comes with some data created to let developers test how it works.

* 2 accounts: simple and collaboration accounts
* simple account has one ADMIN user simple@example.com
* collaboration account has one ADMIN (admin@example.com), one EDITOR (editor@example.com) and one CONTRIBUTOR (contributor@example.com)
* The password for all users is `Testapp0`
