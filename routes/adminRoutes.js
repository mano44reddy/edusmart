const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ============================
// 📋 GET ALL STUDENTS
// ============================
router.get("/all-students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ============================
// ✅ APPROVE STUDENT
// ============================
router.put("/approve-student/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      approved: true,
    });
    res.json({ message: "Student approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ============================
// 💰 UPDATE PAYMENT STATUS
// ============================
router.put("/update-payment/:id", async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    await Student.findByIdAndUpdate(req.params.id, {
      paymentStatus,
    });

    res.json({ message: "Payment status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ============================
// ❌ DELETE STUDENT
// ============================
router.delete("/delete-student/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
