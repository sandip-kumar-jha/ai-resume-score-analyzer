# 🤖 AI Resume Score Analyzer

An AI-powered **Resume Analysis and Job Matching Platform** built using the **MERN Stack**. Users can upload their resume in PDF format, provide a job description, and receive an AI-generated resume match score with professional feedback.

The application combines **React, Node.js, Express.js, MongoDB, PDF processing, Firebase Authentication, and Cohere AI** to provide an end-to-end resume analysis experience.

## 🚀 Live Project

**Frontend: https://ai-resume-score-analyzer-two.vercel.app/
**Backend:   https://ai-resume-score-analyzer.onrender.com
 
---

## ✨ Features

* 🔐 User authentication with Firebase
* 📄 Upload resumes in PDF format
* 📝 Enter a target Job Description
* 🤖 AI-powered resume and job-description analysis
* 📊 Resume match score from 0–100
* 💡 AI-generated professional feedback
* 📚 Resume analysis history
* 👤 User-specific resume records
* 🛡️ Admin resume management
* 📱 Responsive React interface
* ⚡ RESTful API architecture
* ☁️ Cloud deployment with Vercel and Render

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router
* Firebase Authentication

### Backend

* Node.js
* Express.js
* REST API
* Multer
* PDF Parse

### Database

* MongoDB
* Mongoose

### AI

* Cohere AI API

### Authentication

* Firebase Authentication

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

### Development Tools

* Git
* GitHub
* VS Code
* npm

---

## 🏗️ Project Architecture

```text
                 ┌──────────────────────┐
                 │      React.js        │
                 │      Frontend        │
                 └──────────┬───────────┘
                            │
                            │ REST API
                            ▼
                 ┌──────────────────────┐
                 │    Node.js +         │
                 │    Express.js        │
                 └──────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
       ┌───────────┐  ┌────────────┐  ┌─────────────┐
       │ MongoDB   │  │ PDF Parse  │  │ Cohere AI   │
       │ Database  │  │ Processing │  │ Analysis    │
       └───────────┘  └────────────┘  └─────────────┘
```

---

## 🔄 Application Workflow

```text
User Login
    ↓
Upload Resume PDF
    ↓
Enter Job Description
    ↓
React sends multipart/form-data
    ↓
Express API receives request
    ↓
Multer processes PDF
    ↓
PDF text extraction
    ↓
Resume + Job Description sent to Cohere AI
    ↓
AI generates Match Score + Feedback
    ↓
Result stored in MongoDB
    ↓
Score & Feedback displayed to user
```

---

## 📂 Project Structure

```text
AI-Resume-Score-Analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── Controllers/
│   │   └── resume.js
│   │
│   ├── Models/
│   │   └── resume.js
│   │
│   ├── Routes/
│   │   ├── resume.js
│   │   └── user.js
│   │
│   ├── utils/
│   │   └── multer.js
│   │
│   ├── conn.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Resume APIs

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/resume/addResume` | Upload and analyze resume |
| GET    | `/api/resume/get/:user` | Get user's resume history |
| GET    | `/api/resume/get`       | Get all resumes for admin |

### Resume Upload

The resume analysis API accepts:

```text
resume     → PDF file
user       → User ID
job_desc   → Target job description
```

The API returns:

```json
{
  "message": "Your resume analysis is ready",
  "data": {
    "score": 85,
    "feedback": "Strong match with the required technical skills."
  }
}
```

---

## 🤖 AI Resume Analysis

The application sends the extracted resume content and target job description to the **Cohere AI API**.

The AI evaluates:

* Technical skills
* Required technologies
* Job-role relevance
* Resume-job compatibility
* Overall candidate suitability

The result is converted into a **0–100 match score** along with concise professional feedback.

---

## 📄 PDF Processing

The backend uses **Multer** for handling PDF uploads and **PDF Parse** for extracting resume text.

```text
PDF Upload
    ↓
Multer Memory Storage
    ↓
PDF Buffer
    ↓
PDF Text Extraction
    ↓
AI Analysis
```

The application currently supports PDF resumes up to **5 MB**.

---

## 🔐 Authentication

Firebase Authentication is used for user authentication.

The application maintains authenticated user information and associates each resume analysis with the corresponding user.

```text
User
 ↓
Firebase Authentication
 ↓
Authenticated Session
 ↓
Resume Analysis
 ↓
MongoDB User Record
```

---

## 🗄️ Database

MongoDB is used to store resume analysis information.

Each analysis stores information such as:

```text
User ID
Resume Name
Job Description
AI Match Score
AI Feedback
Created At
```

Mongoose is used for MongoDB schema definition and database operations.

---

## 🌐 Deployment

### Frontend

The React frontend is deployed using:

**Vercel**

### Backend

The Node.js + Express backend is deployed using:

**Render**

### Database

MongoDB is hosted using:

**MongoDB Atlas**

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/AI-Resume-Score-Analyzer.git

cd AI-Resume-Score-Analyzer
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## 🔑 Environment Configuration

For production, sensitive credentials such as:

```text
MongoDB connection string
Cohere API key
Firebase configuration
```

should be stored using the deployment platform's environment-variable system instead of hardcoding secrets in source code.

---

## 🧠 Key Technical Concepts Implemented

* MERN Stack Development
* REST API Development
* CRUD Operations
* MongoDB Data Modeling
* Mongoose
* Express Middleware
* File Upload Handling
* PDF Text Extraction
* AI API Integration
* Firebase Authentication
* Axios API Communication
* Error Handling
* User-specific Data Management
* Admin Data Management
* Frontend-Backend Integration
* CORS Configuration
* Cloud Deployment

---

## 🎯 Future Improvements

* 📌 ATS keyword analysis
* 📌 Resume section-wise scoring
* 📌 Skill gap detection
* 📌 Resume improvement suggestions
* 📌 Multiple resume formats
* 📌 Resume builder
* 📌 Job recommendation system
* 📌 OCR support for scanned PDFs
* 📌 Detailed AI-generated interview questions
* 📌 Resume comparison against multiple job descriptions

---

## 👨‍💻 Developer

**Sandip Kumar Jha**

BSc in Computer Science & Data Analytics
IIT Patna

### Skills

**Frontend:** React.js, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap
**Backend:** Node.js, Express.js, REST APIs
**Database:** MongoDB, Mongoose
**AI:** Cohere API
**Authentication:** Firebase
**Tools:** Git, GitHub, VS Code
**Deployment:** Vercel, Render

---

## ⭐ Project Highlights

> A full-stack AI-powered web application that demonstrates practical experience in **MERN Stack development, REST API design, authentication, file processing, database management, third-party AI API integration, and cloud deployment**.

If you found this project useful, consider giving the repository a ⭐.
