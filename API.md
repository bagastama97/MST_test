# API Documentation

## Introduction

This API documentation provides details about the endpoints and usage of the API for your application.

## Authentication

To access protected routes, you need to include an access token in the request header.

### Authorization

Include the `Authorization` header with the `Bearer` token.

## Endpoints

### Login

Authenticate a user and receive an access token.

#### Request

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "Password": "password"
  }
  ```

#### Response

- **Status:** `200 OK`
- **Response Body:** `POST`

  ```json
  {
    "token": "your_access_token"
  }
  ```

### Register

Register a new user.

#### Request

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "newuser",
    "email": "newuser@example.com",
    "Password": "newpassword",
    "fullName": "New User"
  }
  ```

### Home

Get user information for the authenticated user.

#### Request

- **Endpoint:** `/home`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your_access_token`

#### Response

- **Status:** 200 OK
- **Response Body:**
  ```json
  {
    "username": "newuser",
    "email": "newuser@example.com",
    "fullName": "New User",
    "photo": "user_photo.jpg"
  }
  ```

### Send Email Token

Send a reset token to the provided email address for password reset.

#### Request

- **Endpoint:** `/send-email-token`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

### Reset Password

Reset the user's password using the provided reset token.

#### Request

- **Endpoint:** `/reset-password`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "resetToken": "your_reset_token",
    "newPassword": "new_password"
  }
  ```
