# DigitalFlake Frontend

React + Vite frontend with Tailwind CSS, TanStack Table, and JWT authentication.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- ✅ React 18 with Vite
- ✅ Tailwind CSS for styling
- ✅ React Router v6 for navigation
- ✅ Context API for state management
- ✅ TanStack Table for data grids
- ✅ JWT authentication
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Modern UI components

## Project Structure

```
src/
├── components/     # Reusable components
├── context/        # React Context (Auth)
├── pages/          # Page components
├── utils/          # Utilities (API calls)
├── App.jsx         # Main app
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Available Pages

- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Forgot password
- `/dashboard` - Dashboard (protected)
- `/users` - User management (protected)
- `/roles` - Role management (protected)

## Dependencies

- react - UI library
- react-router-dom - Routing
- @tanstack/react-table - Data tables
- axios - HTTP client
- react-toastify - Notifications
- react-icons - Icons
- tailwindcss - CSS framework
