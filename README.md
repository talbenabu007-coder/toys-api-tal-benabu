# API Documentation

## Toys API

### GET /toys

Returns a list of toys from the database.

Query Parameters:

- skip (optional): Page number. Each page contains up to 10 toys.

Example:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys?skip=0


### GET /toys/search

Search for toys by name or info.

Query Parameters:

- s: The text to search for.
- skip (optional): Page number. Each page contains up to 10 toys.

Example:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys/search?s=lego&skip=0


### GET /toys/category/:category

Returns toys from a specific category.

Parameters:

- category: The category name.
- skip (optional): Page number. Each page contains up to 10 toys.

Example:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys/category/Lego?skip=0


### POST /toys

Adds a new toy.

Token is required.

URL:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys

Header:

x-api-key: TOKEN

Request Body:

{
    "name": "Lego Car",
    "info": "Lego racing car",
    "category": "Lego",
    "img_url": "",
    "price": 100
}

img_url is optional.

The user_id is added automatically from the token.


### PUT /toys/:id

Updates a toy by its ID.

Token is required.

URL:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys/TOY_ID

Header:

x-api-key: TOKEN

Parameters:

- id: The ID of the toy to update.

Request Body:

{
    "name": "Lego Car",
    "info": "Updated Lego racing car",
    "category": "Lego",
    "img_url": "",
    "price": 120
}

img_url is optional.

A user can only update a toy that belongs to them.


### DELETE /toys/:id

Deletes a toy by its ID.

Token is required.

URL:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys/TOY_ID

Header:

x-api-key: TOKEN

Parameters:

- id: The ID of the toy to delete.

A user can only delete a toy that belongs to them.


### GET /toys/single/:id

Returns a single toy by its ID.

Parameters:

- id: The ID of the toy.

Example:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys/single/6aad42ffcb5d8867ef25f01


### GET /toys/count

Returns the number of toys in the database.

Example:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/toys/count


## Users API

### POST /users

Creates a new user.

URL:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/users

Request Body:

{
    "name": "Moshe",
    "email": "Moshe@test.com",
    "password": "123"
}

The password is encrypted before it is saved.

The email must be unique.

A new user gets the role "user" by default.


### POST /users/login

Login with an existing user and get a token.

URL:

https://toys-api-tal-benabu-dnsiuxgn0-ariel-2e29.vercel.app/users/login

Request Body:

{
    "email": "Moshe@test.com",
    "password": "123"
}

If the email and password are correct, a token is returned.