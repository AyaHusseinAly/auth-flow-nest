# 🔐 Auth Flow NestJS

A robust, production-ready authentication backend built with NestJS, featuring JWT-based authentication with refresh token rotation and device-based session management.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

## ✨ Features

- 🔐 **JWT Authentication** with access & refresh tokens
- 🔄 **Refresh Token Rotation** for enhanced security
- 📱 **Device-based Session Management**
- 🛡️ **Password Security** with bcrypt hashing
- 🍪 **HTTP-only Cookies** for secure token storage
- ✅ **Input Validation** with class-validator
- 🗄️ **MongoDB Integration** with Mongoose ORM
- 🌐 **CORS Configuration** for frontend integration
- 📝 **Comprehensive Logging** and error handling

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd auth-flow-nest

# Install dependencies
npm install

# copy environment variables from .env.sample to new file named .env 
# update with your actual values
cp .env.sample .env
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "deviceId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/signin`
Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "deviceId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Security Features

- **Password Requirements**: Minimum 8 characters with letters, numbers, and special characters
- **Token Expiration**: Access tokens (15 minutes), Refresh tokens (7 days)
- **Device Tracking**: Each device maintains separate refresh token sessions
- **Secure Cookies**: HTTP-only, secure, sameSite strict cookies for refresh tokens

## 🏗️ Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── auth.controller.ts   # Auth endpoints
│   ├── auth.service.ts      # Auth business logic
│   ├── auth.guard.ts        # JWT authentication guard
│   └── dto/                 # Data transfer objects
│       ├── signin.dto.ts    # Signin validation
│       └── signup.dto.ts    # Signup validation
├── users/                   # User management
│   ├── users.controller.ts  # User endpoints
│   ├── users.service.ts     # User business logic
│   └── user.schema.ts       # User MongoDB schema
├── tokens/                  # Token management
│   ├── tokens.service.ts    # Token operations
│   ├── tokens.schema.ts     # Token MongoDB schema
│   └── dto/                 # Token DTOs
├── shared/                  # Shared utilities
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/auth-flow` |
| `JWT_SECRET` | JWT signing secret | `16Strong84Secret95Confidential75Key` |

### CORS Configuration

The application is configured to accept requests from `http://localhost:5173` (typical Vite dev server) with credentials enabled.

## 📚 Resources

### Documentation & Learning
- <a href="https://docs.nestjs.com/" target="_blank" rel="noopener noreferrer">NestJS Documentation</a> - Official NestJS framework documentation
- <a href="https://docs.mongodb.com/" target="_blank" rel="noopener noreferrer">MongoDB Documentation</a> - MongoDB official documentation
- <a href="https://mongoosejs.com/docs/" target="_blank" rel="noopener noreferrer">Mongoose Documentation</a> - MongoDB object modeling for Node.js

### Useful Tool
- <a href="https://jwt.io/" target="_blank" rel="noopener noreferrer">JWT Debugger</a> - Decode and verify JWT tokens
