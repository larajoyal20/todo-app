# To-Do List API

A RESTful API for managing users and to-do tasks, built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication (JWT-based)
- Session management (sign in / sign out)
- CRUD operations for users and tasks
- Input validation using Joi
- Protected routes for task operations
- Background job scheduling with BullMQ (for overdue task notifications)
- Email notifications via SMTP (Nodemailer)

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
├── scheduler/
│   └── worker.js
├── validations/
├── package.json
└── .env
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas or local)
- Redis (for BullMQ job queue)
- SMTP credentials (for email notifications)

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
   REDIS_HOST=localhost
   REDIS_PORT=6379
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   ```

### Running the App

Start the main server:

```sh
node app.js
```

Or with nodemon for development:

```sh
npx nodemon app.js
```

Start the background worker (for scheduled jobs and email notifications):

```sh
node scheduler/worker.js
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

**Author:** Joyal Lara Thangarasu
