# Login app backend
This is the backend for the login app. It is a simple REST API that allows users to register, login and then authenticate other API endpoints.

## Setup

### 1. Install dependencies
To install all dependencias
```bash
npm install
```
### 3. Create the database
To run it locally you need to have a mysql database running. If you have docker installed you can run the following command to install a mysql database:
```bash
npm run mysql:install
```

Create a database in the mysql to store your data call it e.g. `my_app_db`.

Before running the API you need to create an .env file. You can copy the .env.example file in this repo and change the values as needed.

In the .env file you need to update the `DB_URL` with the database name you've just created (e.g. `my_app_db`).

Create the tables needed for the authentication to work by running:

```bash
npx prisma migrate dev
```

The DB needs to be running to make the API work, so don't forget to start it locally when developing.

### 4. Create session secret
This API authentication is sessionless, that means that the server doesn't save any session data. Instead it uses a session secret to sign the JWT token. This secret is stored in the .env file and it is used to sign the JWT token. You can generate a random secret by visiting https://www.lddgo.net/en/encrypt/rsakey.

Use the settings:
* Algorithm: `RSA`
* Key size: `2048`
* Format: `PEM`

Copy the generated key and secret and paste them in the .env file in the `JWT_KEY` and `JWT_SECRET` variables. Include the starting and end lines with the `-----BEGIN...` and `-----END...` ones.

### 5. Email sending configuration
This API sends emails to users to confirm their email address and to reset their password. To do that it uses the [SENDGRID](https://sendgrid.com/) service. You need to create an account there and then create an API key. Copy the API key and paste it in the .env file in the `SENDGRID_KEY` variable.

You will also need to verify the sender for the emails. Copy the email address you want to use to send the emails and paste it in the .env file in the `SENDGRID_VERIFIED_SENDER_EMAIL` variable.

### Enjoy
With those steps you will be able to run the API locally. Just run `npm run start` in this folder or `npm run backend:serve` from the root of the repo.

Check the `src/auth/auth.router.ts` to know more about the API authentication endpoints available.

## Authentication methods