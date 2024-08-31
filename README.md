# Product Management API

This is a simple Product Management API built with Node.js, Express.js, and MongoDB. The API allows you to perform CRUD operations on products, as well as search, filter, and sort them.

## Features

- **Create, Read, Update, and Delete (CRUD) operations on products.**
- **Search products by name.**
- **Filter products by category and price range.**
- **Sort products by price in ascending or descending order.**

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- CORS for Cross-Origin Resource Sharing

## Setup

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or accessible via a cloud service

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/product-management-api.git
    ```

2. Change directory into the project:

    ```bash
    cd product-management-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/yourdatabase
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

6. Your server should now be running at `http://localhost:5000`.

## API Endpoints

### 1. **Add a Product**

   - **Endpoint:** `POST /api/products`
   - **Description:** Adds a new product to the database.
   - **Request Body Example:**

     ```json
     {
       "name": "Organic Tomato",
       "category": "Vegetables",
       "price": 2.99,
       "description": "Fresh organic tomatoes, perfect for salads and cooking."
     }
     ```

   - **Response Example:**

     ```json
     {
       "_id": "60c72b2f9b1e8a1b0c8fbcf1",
       "name": "Organic Tomato",
       "category": "Vegetables",
       "price": 2.99,
       "description": "Fresh organic tomatoes, perfect for salads and cooking.",
       "createdAt": "2024-08-31T10:00:00.000Z",
       "__v": 0
     }
     ```

### 2. **Get All Products**

   - **Endpoint:** `GET /api/products`
   - **Description:** Retrieves all products, with optional search, filter, and sort options.
   - **Query Parameters:**

     - `search`: (optional) Search products by name.
     - `categories`: (optional) Filter by categories, comma-separated.
     - `minPrice`: (optional) Minimum price for filtering.
     - `maxPrice`: (optional) Maximum price for filtering.
     - `sortBy`: (optional) Field to sort by (e.g., `price`).
     - `sortOrder`: (optional) Sort order, `asc` for ascending or `desc` for descending.

   - **Example Request:**

     ```plaintext
     GET /api/products?search=Organic&categories=Vegetables,Electronics&minPrice=1&maxPrice=100&sortBy=price&sortOrder=asc
     ```

   - **Response Example:**

     ```json
     [
       {
         "_id": "60c72b2f9b1e8a1b0c8fbcf1",
         "name": "Organic Tomato",
         "category": "Vegetables",
         "price": 2.99,
         "description": "Fresh organic tomatoes, perfect for salads and cooking.",
         "createdAt": "2024-08-31T10:00:00.000Z",
         "__v": 0
       }
     ]
     ```

### 3. **Get a Single Product by ID**

   - **Endpoint:** `GET /api/products/:id`
   - **Description:** Retrieves a single product by its ID.
   - **Example Request:**

     ```plaintext
     GET /api/products/60c72b2f9b1e8a1b0c8fbcf1
     ```

   - **Response Example:**

     ```json
     {
       "_id": "60c72b2f9b1e8a1b0c8fbcf1",
       "name": "Organic Tomato",
       "category": "Vegetables",
       "price": 2.99,
       "description": "Fresh organic tomatoes, perfect for salads and cooking.",
       "createdAt": "2024-08-31T10:00:00.000Z",
       "__v": 0
     }
     ```

### 4. **Update a Product**

   - **Endpoint:** `PUT /api/products/:id`
   - **Description:** Updates an existing product by its ID.
   - **Request Body Example:**

     ```json
     {
       "name": "Updated Tomato",
       "category": "Vegetables",
       "price": 3.99,
       "description": "Updated description for the organic tomatoes."
     }
     ```

   - **Response Example:**

     ```json
     {
       "_id": "60c72b2f9b1e8a1b0c8fbcf1",
       "name": "Updated Tomato",
       "category": "Vegetables",
       "price": 3.99,
       "description": "Updated description for the organic tomatoes.",
       "createdAt": "2024-08-31T10:00:00.000Z",
       "__v": 0
     }
     ```

### 5. **Delete a Product**

   - **Endpoint:** `DELETE /api/products/:id`
   - **Description:** Deletes a product by its ID.
   - **Example Request:**

     ```plaintext
     DELETE /api/products/60c72b2f9b1e8a1b0c8fbcf1
     ```

   - **Response Example:**

     ```json
     {
       "message": "Product deleted"
     }
     ```

### 6. **Get Products by Category**

   - **Endpoint:** `GET /api/products/category/:category`
   - **Description:** Retrieves all products in a specific category.
   - **Example Request:**

     ```plaintext
     GET /api/products/category/Vegetables
     ```

   - **Response Example:**

     ```json
     [
       {
         "_id": "60c72b2f9b1e8a1b0c8fbcf1",
         "name": "Organic Tomato",
         "category": "Vegetables",
         "price": 2.99,
         "description": "Fresh organic tomatoes, perfect for salads and cooking.",
         "createdAt": "2024-08-31T10:00:00.000Z",
         "__v": 0
       },
       {
         "_id": "60c72b2f9b1e8a1b0c8fbcf2",
         "name": "Organic Spinach",
         "category": "Vegetables",
         "price": 1.99,
         "description": "Fresh organic spinach, rich in iron and vitamins.",
         "createdAt": "2024-08-31T10:10:00.000Z",
         "__v": 0
       }
     ]
     ```

## Notes

- Ensure MongoDB is running locally or use a cloud MongoDB service.
- The API supports searching, filtering, and sorting, which can be combined to refine product queries.

---

This `README.md` file should provide comprehensive information for users and developers to understand and use your Product Management API effectively.
