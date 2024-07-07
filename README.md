
* * * * *

CarMania
========

Carmania is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application for buying and selling cars. It includes features such as user authentication (jwt authentication), car listings, a shopping cart, and payment integration using Stripe and image storage using Cloudinary.

Table of Contents
-----------------

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
-   [API Endpoints](#api-endpoints)
-   [Usage](#usage)
-   [Contributing](#contributing)


Features
--------

-   User authentication (register, login, logout)
-   JWT authentication
-   Car listings with details
-   Add to cart functionality
-   Save car listings
-   Payment integration with StripeAPI
-   Responsive design
-   User profile management
-   Image storage using Cloudinary

Tech Stack
----------

-   **Frontend:**
    -   React
    -   SCSS
-   **Backend:**
    -   Node.js
    -   Express.js
-   **Database:**
    -   MongoDB
-   **Payment Integration:**
    -   Stripe
- **Image Storage:**
  - Cloudinary

Getting Started
---------------

### Prerequisites

-   Node.js
-   npm or yarn
-   MongoDB
-   Cloudinary account
-   Stripe account

### Installation

1.  Clone the repository:

    sh

    Copy code

    `git clone https://github.com/aniruddh-krovvidi/CarMania-FullStack.git
    cd CarMania-FullStack`

2.  Install dependencies:

    sh

    Copy code

    `cd client
    npm install
    cd ../api
    npm install`

3.  Set up environment variables: Create a `.env` file in the `api` directory with the following content:

    env

    Copy code

    `MONGO_URL=your_mongodb_connection_string
    JWT_SECRET_KEY=your_jwt_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key`

4.  Start the development server:

    sh

    Copy code

    `# In the api directory
    node app.js

    # In the client directory
    npm run dev`

5.  Open your browser and navigate to `http://localhost:5173`.


API Endpoints
-------------

### Auth

-   `POST /api/auth/register`: Register a new user
-   `POST /api/auth/login`: Login a user

### User

-   `GET /api/user`: Get user profile
-   `POST /api/user/save`: Save a car listing

### Car Listings

-   `GET /api/cars`: Get all car listings
-   `GET /api/cars/:id`: Get a single car listing
-   `POST /api/cars`: Create a new car listing (Admin only)
-   `PUT /api/cars/:id`: Update a car listing (Admin only)
-   `DELETE /api/cars/:id`: Delete a car listing (Admin only)

### Cart

-   `POST /api/cart`: Add a car to the cart
-   `DELETE /api/cart/:id`: Remove a car from the cart
-   `GET /api/cart`: Get all cart items

### Payment

-   `POST /api/payment`: Create a payment session with Stripe

Usage
-----

### User Authentication

-   Register and login to access the full features of the app.
-   JWT tokens are used for authentication.

### Car Listings

-   Browse car listings on the homepage.
-   View detailed information about each car by clicking on a listing.

### Add to Cart

-   Add cars to your cart for later purchase.
-   View and manage cart items.

### Save Listings

-   Save car listings for future reference.

### Payments

-   Use the Stripe integration to securely process payments.


Contributing
------------

Contributions are welcome! Please fork the repository and create a pull request to propose changes.
