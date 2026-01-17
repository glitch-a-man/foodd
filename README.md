# Food Application

This project is split into two main parts:

- **frontend**: React/Next.js application.
- **backend**: Node.js + Express + MongoDB.

## Project Structure

```bash
.
├── frontend/    # Next.js frontend
└── backend/     # Express backend
```

## Getting Started

### Frontend

To run the frontend:

```bash
cd frontend
npm install
npm run dev
```

### Backend

The backend is built with **Node.js + Express** and uses **MongoDB** for data persistence.

To run the backend:

```bash
cd backend
npm install
npm run dev
```

Key features:
- User synchronization with Google OAuth
- MongoDB integration with Mongoose
- Standard API security (Helmet, CORS)
- Logging with Morgan

## Deployment (Google OAuth Setup)

To use Google Authentication on both **Localhost** and **Netlify**, you must configure your Google Cloud Console properly:

### 1. Google Cloud Console Configuration
Add the following to your OAuth 2.0 Client ID settings:

**Authorized JavaScript origins:**
- `http://localhost:3000`
- `https://a-man-food-deliv.netlify.app`

**Authorized redirect URIs:**
- `http://localhost:3000/api/auth/callback/google`
- `https://a-man-food-deliv.netlify.app/api/auth/callback/google`

### 2. Environment Variables
Ensure these are set in your local `.env.local` and in the **Netlify Environment Variables** settings:

- `GOOGLE_CLIENT_ID`: Your Google Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google Client Secret
- `NEXTAUTH_SECRET`: A random string (generate one using `openssl rand -base64 32`)
- `NEXTAUTH_URL`: 
  - Local: `http://localhost:3000`
  - Netlify: `https://a-man-food-deliv.netlify.app`
