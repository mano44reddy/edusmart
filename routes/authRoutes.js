const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Tutor = require("../models/Tutor");

const router = express.Router();

// STUDENT REGISTER
router.post("/student/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Registered Successfully" });
  } catch(err){
    res.status(400).json({ message: "Error registering student" });
  }
});

// STUDENT LOGIN
router.post("/student/login", async (req, res) => {

  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if(!student) return res.status(400).json({ message: "Student not found" });

  const isMatch = await bcrypt.compare(password, student.password);
  if(!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: student._id, role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

// ADMIN LOGIN
router.post("/admin/login", async (req, res) => {

  const { username, password } = req.body;

  if(
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ){
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.json({ token });
  }

  res.status(400).json({ message: "Invalid Admin Credentials" });
});

module.exports = router;
