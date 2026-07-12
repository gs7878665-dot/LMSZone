const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
let plm = require("passport-local-mongoose");
if (plm && typeof plm !== "function" && typeof plm.default === "function") {
  plm = plm.default;
}

mongoose.connect("mongodb://127.0.0.1:27017/lms");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});
userSchema.plugin(plm);
const user = mongoose.model("user", userSchema);

const courseSchema = mongoose.Schema({
  courseName: String,
  courseCode: String,
  credit: Number,
});

const course = mongoose.model("course", courseSchema);

const studentProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  rollNumber: String,
  branch: String,
  semester: Number,
  section: String,

  phone: String,
  avatar: String,

  totalClasses: {
    type: Number,
    default: 0,
  },

  attendedClasses: {
    type: Number,
    default: 0,
  },

  totalFees: {
    type: Number,
    default: 0,
  },

  paidFees: {
    type: Number,
    default: 0,
  },
});

const StudentProfile = mongoose.model("studentProfile", studentProfileSchema);

const studentCourseSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentProfile",
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },

  teacher: String,
});

const StudentCourse = mongoose.model("studentCourse", studentCourseSchema);

const scheduleSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentProfile",
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },

  teacher: String,

  subject: String,

  startTime: String,

  endTime: String,

  room: String,

  day: String,
});
const Schedule = mongoose.model("schedule", scheduleSchema);

const assignmentSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentProfile",
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },

  title: String,

  description: String,

  deadline: Date,

  status: {
    type: String,
    default: "Pending",
  },
});

const Assignment = mongoose.model("assignment", assignmentSchema);

const taskSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentProfile",
  },

  title: String,

  deadline: Date,

  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("task", taskSchema);

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "abc",
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new LocalStrategy(user.authenticate()));

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", function (req, res) {
  res.render("register");
});
app.post("/register", function (req, res) {
  console.log("Reached register route");
  console.log(req.body);

  var userData = new user({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  });

  console.log(userData);

  user.register(userData, req.body.password, function (err, registeredUser) {
    if (err) {
      console.log("Register error:", err);
      return res.render("register");
    }

    req.logIn(registeredUser, function (err) {
      if (err) {
        console.log("Login after register error:", err);
        return res.render("register");
      }
      return res.redirect("/profile");
    });
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/register",
  }),
);

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/profile", isloggedIn, async (req, res) => {
  try {
    const sp = await StudentProfile.findOne({ userId: req.user._id });
    const studentId = sp ? sp._id : null;
    const [users, courses, sc, assignments, schedule, tasks] = await Promise.all([
      user.find({}),
      course.find({}),
      StudentCourse.find({ studentId }),
      Assignment.find({ studentId }),
      Schedule.find({ studentId }),
      Task.find({ studentId }),
    ]);

    console.log("All the connections sent to ejs file");
    res.locals.user = req.user;
    res.render("profile", {
      users: users,
      courses: courses,
      tasks: tasks,
      sp: sp,
      assignments: assignments,
      schedule: schedule,
      sc: sc,
    });
    console.log("No error");
  } catch (err) {
    console.log("Error found ", err);
  }
});

app.post("/tasks", isloggedIn, async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findOne({ userId: req.user._id });
    const taskData = {
      title: req.body.title || "Untitled Task",
      completed: false,
    };
    if (studentProfile) {
      taskData.studentId = studentProfile._id;
    }
    if (req.body.deadline) {
      const deadlineDate = new Date(req.body.deadline);
      if (!Number.isNaN(deadlineDate.getTime())) {
        taskData.deadline = deadlineDate;
      }
    }
    await Task.create(taskData);
    res.redirect("/profile");
  } catch (err) {
    console.log("Task creation error:", err);
    res.redirect("/profile");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


