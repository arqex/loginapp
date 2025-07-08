# Install login app without the test application

In the backend, before running prisma migrations:
* Check the `schema.prisma` file and delete all the models and lines marked with a testapp comment
* Delete the migration number 2: test_app

In the backend src file:
* Delete the `endpoints/todo` folder
* Delete the code marked with comments in the `account.router.ts` file

