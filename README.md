# DigitalFlake Hackathon 2025 - Full Stack Application

A modern full-stack web application built with React, Node.js, Express, and MongoDB featuring user authentication, role management, and a responsive admin dashboard.

## 🚀 Technology Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Table (React Table v8)** - Data grid/table component
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher) - Running locally or use MongoDB Atlas
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
cd DigitalFlake
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your settings:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/digitalflake
# - JWT_SECRET=your_secret_key_here
# - JWT_EXPIRE=7d

# Start MongoDB (if running locally)
# On Windows: mongod
# On Mac/Linux: sudo systemctl start mongod

# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Features

### Authentication System

- ✅ User Registration (Sign Up)
- ✅ User Login
- ✅ JWT Token-based authentication
- ✅ Password encryption with bcrypt
- ✅ Forgot Password flow
- ✅ Protected routes
- ✅ Auto-redirect on authentication

### User Management

- ✅ View all users in a data grid
- ✅ Edit user details
- ✅ Delete users
- ✅ Assign roles to users
- ✅ Activate/deactivate users
- ✅ Search and filter users
- ✅ Pagination

### Role Management

- ✅ Create new roles
- ✅ View all roles
- ✅ Edit roles
- ✅ Delete roles
- ✅ Activate/deactivate roles
- ✅ Search and filter roles
- ✅ Pagination

### Dashboard

- ✅ User statistics
- ✅ Role statistics
- ✅ Welcome screen
- ✅ Quick actions

### UI/UX Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern purple-themed interface matching Figma design
- ✅ Toast notifications for user feedback
- ✅ Loading states
- ✅ Modal dialogs
- ✅ Sidebar navigation
- ✅ Navbar with user info

## 📁 Project Structure

```
DigitalFlake/
├── backend/
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── roleController.js
│   ├── models/            # Database schemas
│   │   ├── User.js
│   │   └── Role.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── roleRoutes.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── .env              # Environment variables
│   ├── server.js         # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/       # React Context
    │   │   └── AuthContext.jsx
    │   ├── pages/         # Page components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Users.jsx
    │   │   └── Roles.jsx
    │   ├── utils/         # Utility functions
    │   │   └── api.js
    │   ├── App.jsx        # Main app component
    │   ├── main.jsx       # Entry point
    │   └── index.css      # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/me` - Get current user (protected)

### Users

- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get single user (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Roles

- `GET /api/roles` - Get all roles (protected)
- `GET /api/roles/:id` - Get single role (protected)
- `POST /api/roles` - Create role (protected)
- `PUT /api/roles/:id` - Update role (protected)
- `DELETE /api/roles/:id` - Delete role (protected)

## 🎨 UI Design

The application follows the DigitalFlake Figma design with:

- Purple color scheme (#6C2EBC primary)
- Clean, modern interface
- Responsive layouts
- Intuitive navigation
- Professional forms and data tables

## 🧪 Testing the Application

1. **Start MongoDB** and ensure it's running
2. **Start the backend server**: `cd backend && npm run dev`
3. **Start the frontend**: `cd frontend && npm run dev`
4. **Open browser** to `http://localhost:3000`
5. **Register a new account** or use existing credentials
6. **Explore features**:
   - View dashboard
   - Create roles
   - Manage users
   - Test CRUD operations

## 📝 Default Credentials

First user needs to be created via registration. After that:

- Use your registered email and password to login

## 🚀 Production Build

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digitalflake
JWT_SECRET=your_very_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod` or check service status
- Verify connection string in `.env`
- Check if port 27017 is available

### Port Already in Use

- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Issues

- Ensure backend CORS is properly configured
- Check proxy settings in `vite.config.js`

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TanStack Table](https://tanstack.com/table/v8)

## 👨‍💻 Development

Built for **DigitalFlake 8 hrs Job Hackathon 2025**

### Key Features Implemented:

✅ Clean, modular code structure
✅ JWT-based authentication
✅ Password encryption
✅ RESTful API design
✅ React Context for state management
✅ Responsive UI with Tailwind CSS
✅ Advanced data tables with sorting/filtering
✅ Error handling and validation
✅ Professional UI/UX

## 📄 License

This project is created for the DigitalFlake Hackathon 2025.
