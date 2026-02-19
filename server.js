require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const Student = require("./models/Student");
const Tutor = require("./models/Tutor");

const app = express();

/* =========================
   PRODUCTION MIDDLEWARE
========================= */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILES
========================= */

app.use(express.static(path.join(__dirname, "public")));

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => {
  console.error("MongoDB Connection Error:", err);
  process.exit(1);
});

/* =========================
   AUTH ROUTES
========================= */

app.use("/api", authRoutes);

/* =========================
   PROTECTED ADMIN ROUTES
========================= */

app.get("/api/admin/students", authMiddleware, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const students = await Student.find();
  res.json(students);
});

app.get("/api/admin/tutors", authMiddleware, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const tutors = await Tutor.find();
  res.json(tutors);
});

/* =========================
   ROOT ROUTE FIX (IMPORTANT)
========================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EDUSMART running on port ${PORT}`);
});
