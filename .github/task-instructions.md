# Make the home screen more useful

Right now the home screen only have information about the user account.

We want to make it modular display widgets about different information.

Create a folder widgets in the home screen folder where the widgets will be stored.

One widget should contain the account information:
* Title: Current Account
* Then a box like the current one with the account details.
* Under the box, the user permissions on the account, like the current one.

A second widget should contain the lists of todolists:
* Title: Todo Lists
* Then a list of the todo lists, with the name and a link to the todo list

The widgets should be displayed in a grid layout, with two columns.

Every widget need to be self-contained, so they should load their own data.