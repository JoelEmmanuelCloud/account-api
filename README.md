# Account API

This project is a CRUD application for managing user accounts. The application utilizes a MongoDB database to store user account data. It has been developed as part of the [Compass.uol](https://compass.uol/en/home/) Node.js trial scholarship program's second challenge.

![Compass.uol Logo](https://www.datanami.com/wp-content/uploads/2023/06/compass-uol.png)

## Features

The application allows users to:

-   Create a new account.
-   Login and logout.
-   Read, update, and delete their accounts.
-   View and update their own user information.

The application is secured using token-based authentication, providing robust security.

## Installation Guide

To get the development environment up and running, follow these steps:

1. Clone the repository from GitHub Repo:

    ```bash
    git clone https://github.com/JoelEmmanuelCloud/account-api
    ```

2. Set up the environment variables:

    Create a `.env` file in the root directory of the project.
    Define the following environment variables in the `.env` file:

    ```bash
    JWT_SECRET=jwtSecret
    JWT_LIFETIME=1d
    MONGO_URL = MongoDB connection string
    ```

    `JWT_SECRET` is the Secret key for JWT token generation.

    If you don't already have a MongoDB account, you must create one to obtain your `MongoDB connection string` and establish a connection. Visit the [MongoDB](https://account.mongodb.com) website to create your account and replace the `MongoDB connection string` with your actual connection string.

3. All dependencies have been pre-installed in the package.json file.

-   Install the required dependencies using npm:

    ```bash
    npm i or npm install
    ```

-   Start the application with:

    ```bash
    npm start
    ```

    The application will now be running on <http://localhost:3000>.

## Usage

Once the application is running, users can interact with it through API endpoints using tools like Postman.

## API Endpoints

### Account Routes

#### POST /api/v1/account/createAccount

-   Description: Creates a new user account.
-   Request Body:
    account/createAccount

  ```json
        {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@provider.com",
        "password": "password",
        "passwordConfirm": "password",
        "carType": "SEDAN",
        "zipCode": "93950-000",
        "city": "Anywhere City",
        "country": "Brazil"
        }
  ```

#### Expected Response

-   Status Code: 201 Created
-   Response Body:

    ```json
    {
        "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@provider.com",
        "carType": "SEDAN",
        "zipCode": "93950-000",
        "city": "Anywhere City",
        "country": "Brazil"
    }
    ```

#### GET /api/v1/account/getCurrentAccount

-   Description: Retrieves the current user account.

#### Expected Response

-   Status Code: 200 OK
-   Response Body:

    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@provider.com",
        "password": "password",
        "passwordConfirm": "password",
        "carType": "SEDAN",
        "zipCode": "93950-000",
        "city": "Anywhere City",
        "country": "Brazil"
    }
    ```

#### PATCH /api/v1/updatesCurrentAccount

-   Description: Updates the current user account.
-   Request Body:

    ```json
    {
        "carType": "SEDAN",
        "zipCode": "93950-000",
        "city": "Anywhere City"
    }
    ```

#### Expected Response

-   Status Code: 200 OK
-   Response Body:

```json
{
    "carType": "SEDAN",
    "zipCode": "93950-000",
    "city": "Anywhere City"
}
```

#### GET /api/v1/deleteCurrentAccount

-   Description: Retrieves the current user account.

#### Expected Response

-   Status Code: 200 OK
-   Response Body:

    ```json
    {
        "message": "Success! Account Deleted."
    }
    ```

### Authentication Routes

#### POST /api/v1/auth/login

-   Description: Authenticate user credentials for login.
-   Request Body:

    ```json
    {
        "email": "john.doe@provider.com",
        "password": "password"
    }
    ```

#### Expected Response

-   Status Code: 200 OK
-   Response Body:

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "user": {
            "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "firstName": "John",
            "lastName": "Doe"
        }
    }
    ```

### DELETE /api/v1/auth/logout

-   Description: Logout the authenticated user.

#### Expected Response:

-   Status Code: 200 OK
-   Response Body:

    ```json
    {
        "message": "account logged out!"
    }
    ```

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB
-   JSON Web Tokens (JWT)
-   Joi (Input validation)
-   Prettier/ESLint (Code formatting and linting)

## Author

Joel Emmanuel-(Compass.uol Node.js trail student)

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).

## Acknowledgements

Special thanks to the [Compass.uol](https://compass.uol/en/home/) scholarship program for providing this challenging opportunity to learn from experienced instructors and showcase our skills.
