# DigitalFlake Backend API

Node.js/Express backend with MongoDB, JWT authentication, and RESTful API.

## Quick Start

```bash
# Install dependencies
npm install

# Configure .env file
# See .env file for configuration

# Start development server
npm run dev

# Start production server
npm start
```

## API Documentation

### Authentication Endpoints

**POST /api/auth/register**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /api/auth/login**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /api/auth/forgot-password**

```json
{
  "email": "john@example.com"
}
```

**GET /api/auth/me** (Protected)

- Headers: `Authorization: Bearer <token>`

### User Endpoints (All Protected)

**GET /api/users** - Get all users
**GET /api/users/:id** - Get single user
**PUT /api/users/:id** - Update user
**DELETE /api/users/:id** - Delete user

### Role Endpoints (All Protected)

**GET /api/roles** - Get all roles
**GET /api/roles/:id** - Get single role
**POST /api/roles** - Create role
**PUT /api/roles/:id** - Update role
**DELETE /api/roles/:id** - Delete role

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digitalflake
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - CORS middleware
- dotenv - Environment variables
- express-validator - Input validation
