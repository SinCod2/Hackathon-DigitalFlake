# 🚀 Quick Setup Guide - DigitalFlake Hackathon 2025

## Step-by-Step Installation

### Step 1: Install MongoDB

#### Windows:

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will start automatically as a service

#### Alternative: Use MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in backend/.env

### Step 2: Setup Backend

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# The .env file is already configured for local MongoDB
# If using MongoDB Atlas, update MONGODB_URI in .env

# Start the backend server
npm run dev
```

You should see:

```
Server is running on port 5000
MongoDB Connected Successfully
```

### Step 3: Setup Frontend

Open a NEW terminal (keep backend running):

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 4: Access the Application

1. Open your browser
2. Go to: **http://localhost:3000**
3. You'll see the Login page
4. Click "Sign up" to create a new account
5. After registration, you'll be automatically logged in

## 🎯 First Time Usage

### Create Your First Account

1. Click "Sign up" on the login page
2. Enter:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
3. Click "Sign Up"
4. You'll be redirected to the Dashboard

### Create Roles

1. Navigate to "Roles" from the sidebar
2. Click "Add Role"
3. Enter role name (e.g., "Admin", "Manager", "User")
4. Select status (Active/Inactive)
5. Click "Create Role"

### Manage Users

1. Navigate to "Users" from the sidebar
2. View all registered users
3. Click edit icon to:
   - Change user details
   - Assign roles
   - Activate/deactivate users
4. Use search to filter users

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB Connection Error`

**Solution:**

```powershell
# Check if MongoDB is running
# On Windows, it should be running as a service

# Or start MongoDB manually:
mongod

# Or use MongoDB Atlas (cloud) instead
```

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**

1. Open `backend/.env`
2. Change `PORT=5000` to `PORT=5001`
3. Restart backend server

**Error:** `Port 3000 is already in use`

**Solution:**

1. The terminal will ask if you want to use another port
2. Press 'y' to use an alternative port
3. Or kill the process using port 3000

### Dependencies Installation Issues

**Error:** `npm install` fails

**Solution:**

```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall
npm install
```

## 📱 Testing Features

### 1. Authentication

- ✅ Sign up with new account
- ✅ Login with credentials
- ✅ Test "Forgot Password" flow
- ✅ Logout and login again

### 2. Role Management

- ✅ Create multiple roles (Admin, Manager, User, etc.)
- ✅ Edit role names
- ✅ Activate/deactivate roles
- ✅ Search roles
- ✅ Delete roles

### 3. User Management

- ✅ View all users
- ✅ Edit user information
- ✅ Assign roles to users
- ✅ Change user status
- ✅ Search users
- ✅ Delete users

### 4. Dashboard

- ✅ View statistics (will show counts once you have data)
- ✅ Navigate between pages

## 🎨 UI Features

The application includes:

- **Purple Theme** matching DigitalFlake branding
- **Responsive Design** works on mobile, tablet, desktop
- **Data Tables** with sorting, filtering, pagination
- **Modal Dialogs** for editing
- **Toast Notifications** for user feedback
- **Professional Forms** with validation
- **Loading States** for better UX

## 🔐 Security Features

- ✅ **Password Hashing** with bcrypt
- ✅ **JWT Tokens** for authentication
- ✅ **Protected Routes** requiring login
- ✅ **Token Validation** on every request
- ✅ **Auto Logout** on token expiry
- ✅ **Input Validation** on frontend and backend

## 📊 API Testing (Optional)

You can test the API using tools like Postman:

### Register User

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy the returned token and use it for protected routes:

### Get Users (Protected)

```
GET http://localhost:5000/api/users
Authorization: Bearer <your_token_here>
```

## 🏗️ Production Deployment

### Backend

```powershell
cd backend
npm start
```

### Frontend

```powershell
cd frontend
npm run build
# The build folder will contain optimized production files
```

## 💡 Tips

1. **Keep both terminals open** - one for backend, one for frontend
2. **Check browser console** for any frontend errors
3. **Check backend terminal** for API errors
4. **Use Chrome DevTools** to inspect network requests
5. **MongoDB Compass** is great for viewing database contents

## 📞 Need Help?

Common issues and solutions are covered in the main README.md file.

### Useful Commands

```powershell
# Backend
cd backend
npm run dev          # Start development server
npm start           # Start production server

# Frontend
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build

# MongoDB
mongod              # Start MongoDB
mongo               # Open MongoDB shell
```

## ✅ Verification Checklist

Before submitting, verify:

- [ ] Backend server starts without errors
- [ ] Frontend loads in browser
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can create roles
- [ ] Can edit users
- [ ] Tables show data correctly
- [ ] Search/filter works
- [ ] Responsive on mobile
- [ ] Toast notifications appear
- [ ] Logout works properly

---

**Congratulations!** 🎉 Your DigitalFlake application is ready!
