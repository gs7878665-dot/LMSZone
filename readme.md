# LMSZone 📚

A student dashboard web app built with **Node.js, Express, MongoDB, Mongoose, Passport.js, and EJS**. LMSZone gives students a single place to log in and view their courses, weekly schedule, assignments, attendance, fee status, and personal tasks.

---

## ✨ Features

### 🔐 Authentication
- Secure registration and login
- Password hashing via Passport-Local-Mongoose
- Session-based authentication
- Protected routes
- Logout functionality

### 📊 Dashboard
- Overview of enrolled courses
- Attendance percentage
- Assignment status
- Weekly class schedule
- Student profile overview

### 📅 Schedule
- Weekly timetable rendered from the database
- Subject, classroom, and timing per class

### 📖 Courses
- Enrolled course list with course code and credits

### 📝 Assignments
- Assignment list with description, due date, and status (Pending / Submitted / Graded)

### ✅ Task Manager
- Create personal tasks with a deadline
- Tasks are saved per student

### 📈 Attendance
- Total classes, classes attended, and attendance percentage

### 💰 Fees
- Total fees, amount paid, and remaining dues

### 👤 Student Profile
- Roll number, branch, semester, and contact details

---

## 🛠 Tech Stack

**Frontend:** HTML5, CSS3, JavaScript, EJS
**Backend:** Node.js, Express
**Database:** MongoDB, Mongoose
**Authentication:** Passport.js, Passport Local, Passport Local Mongoose, Express Session

---

## 📂 Project Structure

```
LMSZone
│
├── app.js                # Express app: DB connection, models, and routes
├── package.json
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── index.js       # Client-side interactions (navigation, modals, profile UI)
│
├── views/
│   ├── index.ejs           # Landing / login page
│   ├── register.ejs        # Registration page
│   └── profile.ejs         # Dashboard
│
└── readme.md
```

---

## 📊 Database Collections

- Users
- Courses
- Student Profiles
- Student Courses
- Schedule
- Assignments
- Tasks

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/gs7878665-dot/LMSZone.git
cd LMSZone
```

### Install dependencies
```bash
npm install
```

### Start MongoDB
```bash
mongod
```

### Run the server
```bash
node app.js
```

Visit:
```
http://localhost:3000
```

---

## 📦 Dependencies

```
express
mongoose
passport
passport-local
passport-local-mongoose
express-session
ejs
```

---

## 🔒 Authentication Flow

```
Register → Password Hashing → Store User → Login → Session Created → Access Dashboard
```

---

## 🌟 Planned Features

- Assignment and course management (create/edit) UI
- Faculty / admin dashboard
- File upload for assignments and avatars
- Email notifications
- Real-time updates with Socket.io
- Mobile-responsive layout
- Dark / light theme

---

## 🎯 What This Project Covers

- Authentication with Passport.js and session management
- MongoDB schema design with relationships (Mongoose refs)
- CRUD operations
- Dynamic server-rendered dashboards with EJS
- Express routing and middleware

---

## 👨‍💻 Author

**Gaurav Shukla**
Computer Science Engineering Student

GitHub: [gs7878665-dot](https://github.com/gs7878665-dot)
LinkedIn: [gaurav-shukla7878665](https://www.linkedin.com/in/gaurav-shukla7878665)

---

⭐ If you like this project, consider giving it a star on GitHub!
