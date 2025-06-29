# Create a User and an Account

In the login app the User is the object that authenticates into the system, and the Account is the object which contains all the business entities that make real specific apps.

E.g. in the example app, the account contains TodoLists, that the Users can see and manage if they have enough permissions in the Account.

So when customers sign up, they are just creating the User, but they can't work on the applications because they don't have an account yet.

A User without an Account is a valid state in our system and it might happen in 2 situations:

* Right after sign up, the User object has been created but the account hasn't yet.
* When an User has been invited to an Account, there isn't an Account creation. After signing up the User receives a role in that Account that invited them. But at some point an Admin of that Account can remove their role, so that User will become orphan of an Account.

In this task we need to handle both situations:
* Create the Account object as part of the signing up process. The frontend needs to create an Account making a POST request to the API once the user has logged in for the first time after the signup process (when they haven't been invited by other account), so the User has an enviroment to work straight away.
* For orphan Users, we need to display a message in the webapp saying that they don't have an Account yet and they need to create it, asking them for a name for it.




