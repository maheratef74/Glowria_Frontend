# Amira Beauty - Next.js Version

This project has been migrated to **Next.js** with built-in API routes for the backend.

## ✅ What's Been Done

### Backend (Next.js API Routes)
- ✅ Authentication API routes (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- ✅ MongoDB connection with Mongoose
- ✅ User model with password hashing
- ✅ JWT token authentication
- ✅ Health check endpoint

### Frontend Structure
- ✅ Next.js configuration
- ✅ App wrapper with providers (`_app.js`)
- ✅ Layout component
- ✅ Home page converted
- ✅ Components updated for Next.js
- ✅ Contexts migrated
- ✅ Auth service updated

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/amira-beauty
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong random string!

### 3. Start MongoDB

Make sure MongoDB is running on your system.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api/*`

## 📁 Project Structure

```
├── pages/
│   ├── api/                    # Backend API routes
│   │   ├── auth/
│   │   │   ├── register.js    # POST /api/auth/register
│   │   │   ├── login.js        # POST /api/auth/login
│   │   │   └── me.js           # GET /api/auth/me
│   │   └── health.js            # GET /api/health
│   ├── _app.js                  # App wrapper
│   ├── index.js                 # Home page (/)
│   ├── products.js              # Products page (/products)
│   ├── about.js                 # About page (/about)
│   ├── contact.js               # Contact page (/contact)
│   ├── login.js                 # Login page (/login)
│   └── register.js              # Register page (/register)
├── components/                   # React components
│   ├── Header.js
│   ├── Footer.js
│   ├── Layout.js
│   └── ...
├── contexts/                     # React contexts
│   ├── AuthContext.js
│   └── LanguageContext.js
├── lib/                          # Utilities
│   ├── mongodb.js               # MongoDB connection
│   └── authService.js           # Auth API calls
├── models/                       # Mongoose models
│   └── User.js
├── translations/                 # Translation files
├── data/                         # Static data
└── styles/                       # Styles
    ├── globals.css              # Global styles
    └── *.module.css             # CSS modules
```

## 🔌 API Endpoints

All API routes are prefixed with `/api`:

### Authentication

- **POST** `/api/auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/me` - Get current user (requires Bearer token)
  ```
  Authorization: Bearer <token>
  ```

- **GET** `/api/health` - Health check

## 🎨 Key Features

- ✅ Full-stack Next.js application
- ✅ Server-side API routes (no separate backend server needed)
- ✅ MongoDB database integration
- ✅ JWT authentication
- ✅ Bilingual support (Arabic/English)
- ✅ Responsive design
- ✅ CSS Modules for styling

## 📝 Next Steps

Some pages still need to be fully converted:
1. Products page
2. About page
3. Contact page
4. Login page
5. Register page

These can be converted following the same pattern as the Home page.

## 🛠️ Development

- **Dev mode**: `npm run dev` (with hot reload)
- **Build**: `npm run build`
- **Start production**: `npm start`

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
