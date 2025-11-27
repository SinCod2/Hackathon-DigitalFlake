# ⚡ Quick Reference - Common Commands

## 🚀 Starting the Application

### Start Backend

```powershell
cd backend
npm run dev
```

**Expected Output:** `Server is running on port 5000` + `MongoDB Connected Successfully`

### Start Frontend (New Terminal)

```powershell
cd frontend
npm run dev
```

**Expected Output:** `Local: http://localhost:3000/`

### Access Application

Open browser: **http://localhost:3000**

---

## 📦 Installation Commands

### Backend

```powershell
cd backend
npm install
```

### Frontend

```powershell
cd frontend
npm install
```

---

## 🔧 MongoDB Commands

### Check MongoDB Status (Windows)

```powershell
# MongoDB runs as a service by default after installation
# Check in Services (services.msc) for "MongoDB Server"
```

### Start MongoDB Manually

```powershell
mongod
```

### Connect to MongoDB Shell

```powershell
mongo
```

### View Databases

```javascript
// In mongo shell
show dbs
use digitalflake
show collections
db.users.find()
db.roles.find()
```

---

## 🛠️ Troubleshooting Commands

### Kill Process on Port (Windows)

**Backend (Port 5000):**

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Frontend (Port 3000):**

```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Clear npm Cache

```powershell
npm cache clean --force
```

### Reinstall Dependencies

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## 🧪 Testing API with cURL

### Register User

```powershell
curl -X POST http://localhost:5000/api/auth/register `
-H "Content-Type: application/json" `
-d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

### Login

```powershell
curl -X POST http://localhost:5000/api/auth/login `
-H "Content-Type: application/json" `
-d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

### Get Users (Replace TOKEN)

```powershell
curl http://localhost:5000/api/users `
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📂 File Locations

### Configuration Files

- Backend Config: `backend/.env`
- Frontend Config: `frontend/vite.config.js`
- Tailwind Config: `frontend/tailwind.config.js`

### Important Directories

- Backend Controllers: `backend/controllers/`
- Backend Models: `backend/models/`
- Backend Routes: `backend/routes/`
- Frontend Pages: `frontend/src/pages/`
- Frontend Components: `frontend/src/components/`

---

## 🔐 Default Configuration

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digitalflake
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (vite.config.js)

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

---

## 📝 Common Tasks

### Create First User

1. Go to http://localhost:3000
2. Click "Sign up"
3. Fill form and submit
4. Auto-login to dashboard

### Create First Role

1. Navigate to "Roles" in sidebar
2. Click "Add Role"
3. Enter name (e.g., "Admin")
4. Click "Create Role"

### Assign Role to User

1. Navigate to "Users"
2. Click edit icon on user
3. Select role from dropdown
4. Click "Update User"

---

## 🚀 Production Commands

### Build Frontend

```powershell
cd frontend
npm run build
```

Output folder: `frontend/dist/`

### Start Backend (Production)

```powershell
cd backend
npm start
```

### Preview Frontend Build

```powershell
cd frontend
npm run preview
```

---

## 🔍 Debugging Commands

### View Backend Logs

Backend logs appear in the terminal where you ran `npm run dev`

### View Frontend Logs

Open browser DevTools (F12) → Console tab

### View Network Requests

Open browser DevTools (F12) → Network tab

### Check MongoDB Connection

```powershell
# In mongo shell
db.runCommand({ ping: 1 })
```

---

## 📊 Database Queries (MongoDB Shell)

### View All Users

```javascript
db.users.find().pretty();
```

### View All Roles

```javascript
db.roles.find().pretty();
```

### Count Documents

```javascript
db.users.countDocuments();
db.roles.countDocuments();
```

### Find User by Email

```javascript
db.users.findOne({ email: "test@example.com" });
```

### Delete All Users (Reset)

```javascript
db.users.deleteMany({});
```

### Delete All Roles (Reset)

```javascript
db.roles.deleteMany({});
```

---

## 🎯 Quick Verification

### Backend Health Check

```powershell
curl http://localhost:5000/api/health
```

Should return: `{"status":"OK","message":"Server is running"}`

### Frontend Health Check

Open: http://localhost:3000
Should show: Login page

### Database Health Check

```powershell
mongo digitalflake --eval "db.stats()"
```

Should show: Database statistics

---

## 💡 Useful Tips

### Keep Both Terminals Open

- Terminal 1: Backend (npm run dev)
- Terminal 2: Frontend (npm run dev)

### Hot Reload is Enabled

- Backend: Changes auto-restart server (nodemon)
- Frontend: Changes auto-refresh browser (Vite HMR)

### Environment Variables

- Backend: Uses `.env` file
- Frontend: Can use `.env` with VITE\_ prefix

### API Base URL

- Development: http://localhost:5000/api
- Uses proxy in Vite config

---

## 🎨 Color Reference (Tailwind)

```css
Primary: #6C2EBC (bg-primary)
Secondary: #5C218B (bg-secondary)
Accent: #8B5DBC (bg-accent)
```

---

## 📞 Quick Help

**Issue:** Can't connect to MongoDB  
**Fix:** Ensure MongoDB service is running or use MongoDB Atlas

**Issue:** Port already in use  
**Fix:** Change port in .env (backend) or accept alternative port (frontend)

**Issue:** npm install fails  
**Fix:** Clear cache and reinstall (see Troubleshooting section)

**Issue:** Can't login after registration  
**Fix:** Check backend terminal for errors, verify MongoDB connection

---

## ✅ Daily Checklist

Before starting development:

- [ ] MongoDB is running
- [ ] Backend .env is configured
- [ ] Dependencies installed (npm install)
- [ ] Two terminals ready

To start working:

- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `cd frontend && npm run dev`
- [ ] Open browser: http://localhost:3000
- [ ] Check no errors in terminals

---

**Save this file for quick reference!** 📌
