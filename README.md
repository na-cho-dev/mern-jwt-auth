# MERN JWT Auth

A full-stack authentication boilerplate using MongoDB, Express, React, Node.js, and JWT.  
Includes secure authentication, email verification, password reset, and session management.

## Project Structure

```
mern-jwt-auth/
  client/        # React frontend (not included in this repo by default)
  server/        # Express backend API (see server/README.md for backend details)
  README.md      # This file
```

## Features

- User registration and login with JWT authentication
- Email verification and password reset via email
- Secure session management with refresh tokens
- HTTP-only cookie handling for tokens
- Rate limiting and input validation
- Modular, scalable codebase
- API documentation with Swagger (OpenAPI)

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` in `server/` for version)
- MongoDB instance (local or cloud)
- [Resend](https://resend.com/) account for email sending

### Backend Setup

See [server/README.md](server/README.md) for detailed backend setup and API documentation.

### Frontend Setup

If you have a React client, set it up in the `client/` directory. Would update the client side soon

## API Documentation

- The backend API is documented with Swagger.
- Once the server is running, visit [http://localhost:4004/api-docs](http://localhost:4004/api-docs) to view and test the API.

## License

MIT