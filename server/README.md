# MERN JWT Auth Server

This is the backend server for a MERN stack authentication system using JWT, Express, MongoDB, and TypeScript.

## Features

- User registration and login with JWT authentication
- Email verification and password reset via email
- Session management with refresh tokens
- Secure cookie handling (HTTP-only cookies for tokens)
- Rate limiting for password reset requests
- Input validation using Zod
- Modular code structure
- API documentation with Swagger (OpenAPI)

## Project Structure

```
server/
  src/
    config/           # Database and email configuration
    constants/        # App-wide constants
    controllers/      # Express route handlers
    middleware/       # Express middleware
    models/           # Mongoose models
    routes/           # Express route definitions
    services/         # Business logic
    utils/            # Utility functions
    swagger.yaml      # OpenAPI documentation
    postman.json      # Postman collection for API testing

  .env                # Environment variables
  package.json
  tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- MongoDB instance
- [Resend](https://resend.com/) account for email sending

### Installation

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `server/` directory with the following variables:

   ```
   NODE_ENV=development
   PORT=4004
   MONGODB_URI=your_mongodb_uri
   APP_ORIGIN=http://localhost:4004
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   EMAIL_SENDER=your_email_sender
   RESEND_API_KEY=your_resend_api_key
   ```

### Running the Server

Start the development server:

```sh
npm run dev
```

The server will run on the port specified in your `.env` file (default: 4004).

## API Documentation

- The API is documented using [Swagger (OpenAPI)](https://swagger.io/).
- Documentation is maintained in `src/swagger.yaml`.
- Visit [http://localhost:3300/api-docs](http://localhost:3300/api-docs) to view and test the API.

### Authentication Notes

- Authentication is handled via HTTP-only cookies.
- Protected endpoints (User and Session) require a valid JWT token, which is set as a cookie upon login.
- To test protected endpoints in Swagger UI, log in first to receive the cookie, or use the "Authorize" button with a JWT if you prefer header-based auth.
- Logging out via Swagger UI only removes the header; to fully log out, use the `/api/auth/logout` endpoint to clear the cookie.

## License

MIT
