# Manage an account

We want to create a screen in the webapp to manage the account. In that screen there should be possible to edit the account name and see all the members of that account.

In the list there should be possible to edit the role of every memeber and there should be an input to invite new members to the account.

The invitations are a new entity in our database. They will contain:

* The email of the invited user
* Created at
* Updated at
* The expiration date of the invitiation
* A status 'PENDING' 'DECLINED' 'ACCEPTED' 'CANCELLED'
* Meta data, a JSON that contains extra info about the invitation, like the role that should be set into the user if they accept the invite.

In the API the invitations endpoints are only available for users with ADMIN role.

The invitations will be also accessed through the account screen, but they will have their own route `/account/invite`.

The invitation list will be loaded by a loader, but we need to catch the errors there, so if the current user has no permissions to see the invitations, they will see a message with the permission error instead.

In that invite screen, the user can cancel and delete the invitations, resend them if they are expired and edit them to change the role the user will get when accepting the invite.

When creating an invitation, an email will be sent to the invited email. If the user clicks on the email, they will be taken to the webapp to accept or decline the invitation.

At that point the invited user might be:
* A new user that need to sign up in the application
* An existing user

The landing page should prompt the user to sign in if they are already users, or to sign up if they aren't. New users that creates an account through an invitation doesn't get an account created.

After login in, they will see a prompt to accept the invite:
* If they accept they are added to the account that invited them and the webapp set that account as the default one that gets open when the user logs in.
* If they don't accept and they are new users, a new account is created for them.
* If they don't accept and they were users before, they just go to their home page.

When accepting an invitation, that invitation changes its status to 'ACCEPTED'.
When declingin an invitation, that invitation changes its status to 'DECLINED'.