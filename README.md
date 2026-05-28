# 🚀 VedaAI – AI Powered Assessment Creator

An AI-powered teacher platform that helps educators create assignments, generate structured AI question papers, manage study materials, and organize groups efficiently.

Built using **Next.js, Express.js, MongoDB, Redis, BullMQ, and Multiple AI APIs**.

---

# 🌐 Live Demo

## Frontend

https://ai-teacher-platform-seven.vercel.app

## Backend

https://ai-teacher-platform-i8cg.onrender.com

> ⚠️ Note:
> Backend is hosted on Render free tier and may take a few seconds to wake up initially.

---

# 🔐 Demo Credentials

## Email

[teacher@vedaai.com](mailto:teacher@vedaai.com)

## Password

123456

---

# ✨ Core Features

## 🔑 Authentication System

* Teacher Signup & Login
* JWT-based Authentication
* Protected Routes
* Persistent Login using LocalStorage

---

## 📝 AI Assignment Generation

* Create Assignments Dynamically
* AI-generated Question Papers
* Structured Sections (A, B, etc.)
* Difficulty Tags (Easy / Medium / Hard)
* Marks Allocation
* Additional Instructions Support

---

## 🤖 AI Toolkit

* AI Quiz Generator
* Dynamic Quiz Viewer
* Structured Prompt Engineering
* Multi-AI Fallback Support

### Integrated AI Providers

* Gemini API
* Groq API
* Claude API

---

## 📚 Library Management

* Upload Study Materials
* Download Uploaded Files
* Quiz Storage inside Library
* Teacher-specific Resource Management

---

## 👨‍🏫 Group Management

* Create Teacher Groups
* Join Existing Groups
* Student Joining Support
* Unique Join Code System

---

## 📊 Dynamic Dashboard

* Personalized Teacher Dashboard
* Teacher-specific Assignments
* Dynamic Activity View
* Clean Responsive UI

---

# ⚡ Backend Features

* MongoDB Database Integration
* Redis Caching
* BullMQ Worker Setup
* RESTful API Architecture
* Protected Middleware
* File Upload Support using Multer

---

# 🎨 UI / UX Features

* Responsive Dashboard
* Sidebar & Topbar Reusable Components
* Structured Exam Paper Layout
* Mobile Responsive Design
* Modern Clean Interface based on provided Figma

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* TypeScript
* Zustand
* Tailwind CSS

---

## Backend

* Node.js
* Express.js
* MongoDB
* Redis
* BullMQ
* Socket.IO

---

## AI Services

* Gemini API
* Groq API
* Claude API

---

# 🏗️ Architecture Overview

```txt id="3ndrr9"
Frontend (Next.js)
        ↓
 REST API Requests
        ↓
 Express.js Backend
        ↓
 MongoDB + Redis
        ↓
 AI Services (Gemini / Groq / Claude)
```

---

# ⚡ Redis Usage

Redis is used for:

* Assignment Caching
* Faster Repeated AI Generations
* Backend Performance Optimization

---

# 🧵 BullMQ Usage

BullMQ worker setup included for:

* Background Assignment Generation
* AI Processing Queue Handling

---

# 📁 Folder Structure

```txt id="oj9tw2"
AI-Assignment
│
├── client
│   ├── app
│   ├── components
│   ├── utils
│   └── public
│
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── uploads
│   │   ├── utils
│   │   └── workers
│
└── README.md
```

---

# ⚙️ Setup Instructions

## Clone Repository

```bash id="i8q5tr"
git clone https://github.com/YOUR_USERNAME/vedaai-teacher-toolkit.git
```

---

# 💻 Frontend Setup

```bash id="hbg9w0"
cd client

npm install

npm run dev
```

---

# 🖥️ Backend Setup

```bash id="mjlwmn"
cd server

npm install

npm run dev
```

---

# 🔐 Environment Variables

## Frontend (.env.local)

```env id="04f9pk"
NEXT_PUBLIC_API_URL=
```

---

## Backend (.env)

```env id="ojc4t8"
PORT=

MONGO_URL=

JWT_SECRET=

GEMINI_API_KEY=

GROQ_API_KEY=

CLAUDE_API_KEY=

REDIS_URL=
```

---

# 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |
| Redis    | Upstash Redis |

---

# ✅ Functionalities Completed

* AI Assessment Creation
* AI Question Generation
* Structured Question Paper Output
* Teacher Authentication
* Dynamic Dashboard
* Quiz Generation
* Library Upload System
* Redis Integration
* BullMQ Worker Setup
* Responsive UI
* Full Deployment

---

# 🌟 Bonus Features Implemented

* Redis Assignment Caching
* Quiz Storage inside Library
* Dynamic Dashboard
* Mobile Responsive Design
* PDF Download Support
* Multi-AI Fallback System

---

# 🔮 Future Improvements

* Real-time WebSocket Updates
* Student Submission System
* Assignment Analytics Dashboard
* Realtime Notifications
* Assignment Regeneration
* Advanced PDF Formatting

