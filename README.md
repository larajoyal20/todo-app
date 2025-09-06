# To-Do List API

A RESTful API for managing users and to-do tasks, built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication (JWT-based)
- Session management (sign in / sign out)
- CRUD operations for users and tasks
- Input validation using Joi
- Protected routes for task operations

## Project Structure

```
.
├── app.js
├── config/
│   └── config.js
├── controllers/
├── middleware/
├── models/
├── routers/
├── validations/
├── package.json
└── .env
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas or local)

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd To-Do-list
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   NODE_ENV=development
   PORT=3000
   MONGODB_HOST=<your-mongodb-host>
   MONGODB_USER=<your-mongodb-username>
   MONGODB_PASSWORD=<your-mongodb-password>
   MONGODB_DATABASE=<your-database-name>
   JWT_TokenKey=<your-secret-key>
   ```

### Running the App

```sh
node app.js
```

Or with nodemon for development:

```sh
npx nodemon app.js
```

## API Endpoints

### Auth

- `POST /api/signin` — Sign in (returns JWT and session ID)
- `POST /api/signout` — Sign out (requires authentication)

### Users

- `GET /api/users` — List all users
- `GET /api/users/:id` — Get user by ID
- `POST /api/users` — Register a new user
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

### Tasks (Protected)

- `POST /api/Task` — Create a new task
- `GET /api/Task` — List all tasks for the user
- `GET /api/Task/:id` — Get task by ID
- `PUT /api/Task/:id` — Update task
- `DELETE /api/Task/:id` — Delete task

**Note:** For protected routes, include `x-auth-token`, `session-ID`, and `User_id` headers.

## License

ISC

---

**Author:** [Joyal Lara Thangarasu]
