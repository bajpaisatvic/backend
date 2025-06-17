# 🎮 Video Library Backend API

A backend-only RESTful API built with **Node.js**, **Express**, and **MongoDB** that powers a video-sharing platform. The project supports user authentication, video uploads, cloud storage via Cloudinary, and role-based access control.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register, login, logout
  - JWT-based access and refresh token management
  - Password change and secure token storage with cookies

- 📹 **Video Management**
  - Upload videos with thumbnail (Cloudinary integration)
  - Fetch all videos with filtering, sorting, and pagination
  - Edit, delete, and toggle video publish status
  - Fetch single video by ID

- 👤 **User Profile**
  - Update profile, avatar, and cover image
  - Fetch channel data and watch history

- 📁 **File Uploads**
  - Cloudinary integration for video and image uploads
  - Automatic cleanup of old files

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (Access & Refresh tokens)
- **File Storage:** Cloudinary
- **Others:** Prettier, dotenv, cookie-parser, multer

---

## 🗃️ Folder Structure

```
src/
├── controllers/        # Business logic (video & user controllers)
├── routes/             # Route handlers
├── models/             # Mongoose models
├── middlewares/        # JWT auth, error handlers
├── utils/              # Cloudinary, token helpers, responses
├── db/                 # DB connection logic
├── constants.js        # Centralized config constants
├── app.js              # Express app setup
└── index.js            # Entry point
```

---

## 🔑 API Endpoints

### 🧑 User Routes

| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | `/api/v1/user/register`  | Register new user              |
| POST   | `/api/v1/user/login`     | Login user                     |
| POST   | `/api/v1/user/logout`    | Logout current user            |
| GET    | `/api/v1/user/me`        | Get current user               |
| PATCH  | `/api/v1/user/update`    | Update profile info            |
| PATCH  | `/api/v1/user/avatar`    | Update profile avatar          |
| PATCH  | `/api/v1/user/cover`     | Update profile cover image     |
| POST   | `/api/v1/user/refresh`   | Refresh JWT token              |
| PATCH  | `/api/v1/user/password`  | Change password                |
| GET    | `/api/v1/user/channel/:username` | Get channel info         |
| GET    | `/api/v1/user/history`   | Get watch history              |

### 📹 Video Routes

| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/api/v1/videos`         | Get all videos with pagination       |
| GET    | `/api/v1/videos/:id`     | Get single video by ID               |
| POST   | `/api/v1/videos`         | Upload video with thumbnail          |
| PATCH  | `/api/v1/videos/:id`     | Update title, description, thumbnail |
| DELETE | `/api/v1/videos/:id`     | Delete a video                       |
| PATCH  | `/api/v1/videos/toggle/:id` | Toggle video publish status      |

---

## ⚙️ Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/your-username/video-library-backend.git
cd video-library-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file and add the following:
```env
PORT=5000
MONGODB_URI=your_mongo_uri
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Start the server**
```bash
npm run dev
```



