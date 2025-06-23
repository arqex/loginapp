# Data model for the login app

The login app provides a data model with 2 main entities for boostraping any modern SaaS application:

* User: Represent the person that gets authenticated in the system.
* Account: Represent the entity that owns the resources of the application.

## User-account relationship

Users are given permissions to handle the resources on an account through roles. This way it's possible to build flexible systems where multiple users can collaborate in the same account.

Roles are enforced at the API level, ensuring that users can only perform actions permitted by their assigned role within each account.

When users get registered by themselves, an account is also created for them. They are given the role of administrator automatically. That way they can use the application.

When users get registered by an invitation, they are granted a role in the account that invited them, so there is no need to create a new account.

## Plans

Each account is associated with a plan, which determines what features and limits are available. Plans typically control:

- Which features the account can use (e.g., integrations, analytics, premium support).
- Resource limits (e.g., number of users, storage, API calls).
- Access to advanced or premium functionality.

When an account's plan changes (upgrade or downgrade), the available features and limits are updated accordingly.