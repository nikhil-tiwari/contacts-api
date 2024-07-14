# Contacts API

## Overview

This Contacts API is a RESTful service built with Node.js and Express. It allows users to perform CRUD operations (Create, Read, Update, Delete) on a contacts list stored in a JSON file. Each contact contains the following fields: `firstName`, `lastName`, `number`, and `type`.

## Features

- **Add a Contact**: Create a new contact with required fields.
- **Get All Contacts**: Retrieve all contacts.
- **Search Contacts by Name**: Search contacts by first or last name.
- **Search Contacts by Type**: Search contacts by type.
- **Search Contacts by Number**: Search contacts by phone number.
- **Update a Contact**: Update an existing contact.
- **Delete a Contact**: Delete a contact by phone number.

## Prerequisites

- Node.js installed on your system
- npm (Node Package Manager) installed

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `contacts.json` file in the root directory with initial contact data (if any), for example:
    ```json
    [
      {
        "firstName": "Nikhil",
        "lastName": "Tiwari",
        "number": "9760770281",
        "type": "myself"
      }
    ]
    ```

4. Start the server:
    ```bash
    node index.js
    ```

## API Endpoints

### Add a Contact

- **URL**: `/contacts/add`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "number": "1234567890",
      "type": "friend"
    }
    ```
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "message": "Contact added successfully" }`
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Field is missing" }`
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Number must be exactly 10 digits" }`

### Get All Contacts

- **URL**: `/contacts`
- **Method**: `GET`
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "allContacts": [...] }`
- **Error Response**:
    - **Code**: `500 Internal Server Error`
    - **Content**: `{ "message": "Error getting contacts" }`

### Search Contacts by Name

- **URL**: `/contacts/search/name/:query`
- **Method**: `GET`
- **URL Params**: `:query` (name to search)
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "filteredarray": [...] }`
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Contact does not exist" }`

### Search Contacts by Type

- **URL**: `/contacts/search/type/:query`
- **Method**: `GET`
- **URL Params**: `:query` (type to search)
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "filteredarray": [...] }`
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Contact does not exist" }`

### Search Contacts by Number

- **URL**: `/contacts/search/number/:query`
- **Method**: `GET`
- **URL Params**: `:query` (number to search)
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "filteredarray": [...] }`
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Contact does not exist" }`

### Update a Contact

- **URL**: `/contacts/update/:number`
- **Method**: `PUT`
- **URL Params**: `:number` (number of the contact to update)
- **Body**:
    ```json
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "number": "1234567890",
      "type": "colleague"
    }
    ```
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "message": "Contact updated successfully" }`
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Contact does not exist" }`

### Delete a Contact

- **URL**: `/contacts/delete/:number`
- **Method**: `DELETE`
- **URL Params**: `:number` (number of the contact to delete)
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "message": "Contact deleted successfully" }`
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Contact does not exist" }`

## Notes

- Ensure that all fields (`firstName`, `lastName`, `number`, `type`) are provided when adding or updating a contact.
- The `number` field must be exactly 10 digits.
- For searching by name or type, the search is case-insensitive.
