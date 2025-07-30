# Smart Mess Management System 🍽️ + 🎯

A **Smart Mess Management System** that automates student attendance using **face recognition** and simplifies mess operations like meal tracking, payment logging, and user management. Built with **ReactJS**, **Node.js**, and **Python** (OpenCV & face recognition libraries).

---

## 🚀 Features

### 👁️ Face Recognition Attendance
- Automatic face detection and recognition for attendance
- Real-time webcam capture or image upload
- No manual sign-ins or ID cards required

### 🍛 Mess Management
- Meal booking & tracking system
- Daily/weekly meal status for each user
- Transaction & payment history tracking
- Admin panel to manage users, meals, and payments

### 🔐 User Roles
- **Students**: Face login, view attendance, manage meals
- **Admins**: Dashboard for attendance logs, mess data, and reports

---

## 🛠️ Tech Stack

| Frontend       | Backend        | AI/ML             | Database    |
|----------------|----------------|-------------------|-------------|
| ReactJS        | Node.js (Express)| Python (OpenCV, face_recognition) | MongoDB      |

---

## 📁 Project Structure



## 🧠 Face Recognition Logic

- Utilizes the `face_recognition` Python library for accurate and fast face matching.
- Student face data is collected and stored securely in the backend during registration.
- When attendance is being marked:
  - A live image (or frame) is captured from webcam or uploaded.
  - The image is sent to the Python-based face recognition API.
  - The system matches the face against the stored dataset.
  - If a match is found, attendance is logged with timestamp into the database.

---

## 📸 Screenshots (Optional)

_Include the following screenshots in your documentation folder:_

- ✅ Face Recognition in action (with bounding boxes)
- 📋 Attendance Dashboard view
- 🍛 Meal Tracking UI
- 💳 Payment & Transaction History page
- 👤 Admin User Management Panel

---

## ✍️ Future Enhancements

- 🎥 **Live Camera Streaming**  
  Replace static image uploads with real-time webcam attendance capture.

- 🔔 **Notification Alerts**  
  Email or SMS notifications for attendance confirmation, meal status, and payments.

- 📱 **QR Code Fallback Login**  
  In case face recognition fails, allow secure login via user-specific QR codes.

- 🏨 **Integration with Hostel/Billing Systems**  
  Seamless sync with hostel room allocation, fee payment, and student profile management.

- 📊 **Advanced Analytics**  
  Graphs and reports for admin: meal usage patterns, absence records, budget planning.

---

## 🏗️ System Design

The Smart Mess Management System is divided into three main layers:

1. **Frontend (Client)**
2. **Backend (API Server)**
3. **Face Recognition Service (Python)**
4. **Database (MongoDB)**

---

### 🧱 Architecture Overview

lua
Copy
Edit
         +--------------------+                      
         |   ReactJS Frontend |
         +---------+----------+
                   |
                   | REST API / HTTP
                   v
         +---------+----------+
         |  Node.js Backend   |
         | (Express.js API)   |
         +---------+----------+
                   |
    +--------------+--------------+
    |                             |
    v                             v
+---------------+ +----------------------+
| MongoDB | | Face Recognition API |
| (Attendance, |<----------->| Python + OpenCV |
| Meals, Users)| Face match | face_recognition |
+---------------+ result +----------------------+

yaml
Copy
Edit

---

### ⚙️ Component Breakdown

#### 1. **Frontend: ReactJS**
- Student Dashboard: view attendance, meal plan, and payments
- Admin Panel: manage users, monitor attendance, meals, and transactions
- Interacts with backend via REST APIs

#### 2. **Backend: Node.js + Express**
- Handles routing, authentication, session/token management
- Connects to MongoDB for persistent storage
- Sends attendance images to Python face recognition API
- Handles meal booking, payment logs, admin control

#### 3. **Face Recognition Service: Python (Flask or FastAPI)**
- Uses `face_recognition` and OpenCV to:
  - Encode and compare facial features
  - Train model on known faces
  - Match real-time input image and return student ID or fail

#### 4. **Database: MongoDB**
- Stores:
  - User data (name, roll no, face encodings path)
  - Attendance logs (timestamp, user ID)
  - Meal transactions (booking, consumption, payments)

---

### 🔄 Data Flow (Attendance Workflow)

1. Student opens the attendance portal.
2. Webcam captures image → image sent to backend.
3. Backend sends image to Python Face API.
4. Python service compares image with known encodings.
5. On successful match:
   - Python returns student ID
   - Backend logs attendance in MongoDB
   - Frontend shows confirmation to user

---

### 🔐 Security Considerations

- Passwords and sensitive data are hashed and encrypted
- Face data is stored securely, encoded (not raw images)
- Token-based authentication (JWT) for session management

---


