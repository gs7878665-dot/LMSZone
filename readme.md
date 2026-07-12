# LMSZone 📚

A modern, full-stack **Learning Management System (LMS)** built using **Node.js, Express.js, MongoDB, Passport.js, EJS, HTML, CSS, and JavaScript**. LMSZone provides students with a centralized platform to manage courses, schedules, assignments, attendance, fees, and personal tasks through an interactive dashboard.

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- Password hashing using Passport-Local-Mongoose
- Session-based authentication
- Protected routes
- Logout functionality

---

### 📊 Dashboard
- Overview of enrolled courses
- Attendance percentage
- Pending assignments
- Upcoming classes
- Student progress overview

---

### 📅 Schedule Management
- Weekly timetable view
- Time-slot based class schedule
- Dynamic schedule generation from database
- Subject, classroom and timing display

---

### 📖 Course Management
- View enrolled courses
- Course Code
- Course Credits
- Course Information

---

### 📝 Assignment Management
- View all assignments
- Pending assignments
- Submitted assignments
- Graded assignments
- Assignment descriptions
- Due dates

---

### ✅ Task Manager
- Create personal tasks
- Update task status
- To Do
- In Progress
- Completed
- Dynamic task management

---

### 📈 Attendance Tracker
- Overall attendance percentage
- Total classes
- Classes attended
- Attendance statistics

---

### 💰 Fee Management
- Total fees
- Paid amount
- Remaining dues
- Payment history

---

### 👤 Student Profile
- Personal information
- Department
- Semester
- Student ID
- Contact information
- Account management

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session

---

## 📂 Project Structure

```
LMSZone
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── index.ejs
│   ├── profile.ejs
│   ├── partials/
│   └── ...
│
├── models/
│   ├── User.js
│   ├── Student.js
│   ├── Course.js
│   ├── Schedule.js
│   ├── Assignment.js
│   ├── Task.js
│   ├── Attendance.js
│   └── Fee.js
│
├── routes/
│
├── app.js
│
├── package.json
│
└── README.md
```

---

## 📸 Modules

- Dashboard
- Schedule
- Courses
- Assignments
- Tasks
- Fees
- Student Profile

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/LMSZone.git
```

---

### Go to project directory

```bash
cd LMSZone
```

---

### Install Dependencies

```bash
npm install
```

---

### Start MongoDB

```bash
mongod
```

---

### Run Server

```bash
node app.js
```

or

```bash
nodemon app.js
```

---

Visit

```
http://localhost:3000
```

---

## 📦 Dependencies

```json
express
mongoose
passport
passport-local
passport-local-mongoose
express-session
ejs
path
```

---

## 📊 Database Collections

- Users
- Students
- Courses
- Assignments
- Schedule
- Tasks
- Attendance
- Fees

---

## 🔒 Authentication Flow

```
Register
      ↓
Password Hashing
      ↓
Store User
      ↓
Login
      ↓
Session Created
      ↓
Access Protected Routes
```

---

## 🌟 Future Improvements

- Notifications
- Search across LMS
- Faculty Dashboard
- Admin Dashboard
- Attendance Analytics
- Assignment File Upload
- Profile Picture Upload
- Email Notifications
- Calendar Integration
- Mobile Responsive Design
- Dark / Light Theme
- Real-time Updates using Socket.io

---

## 🎯 Learning Outcomes

This project demonstrates practical implementation of:

- Authentication using Passport.js
- Session Management
- MongoDB Database Design
- CRUD Operations
- Mongoose Relationships
- Dynamic Rendering with EJS
- Express Routing
- RESTful Backend Development
- Dashboard Design
- Full Stack Web Development

---

## 👨‍💻 Author

**Gaurav Shukla**

Computer Science Engineering Student

GitHub: https://github.com/gs7878665-dot

LinkedIn: www.linkedin.com/in/gaurav-shukla7878665

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!

---