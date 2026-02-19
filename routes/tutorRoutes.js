const express = require("express");
const router = express.Router();
const { readJSON } = require("../utils/fileHelper");

router.get("/students", (req, res) => {
  if (!req.session.user?.premiumAccess)
    return res.status(403).json({ message: "Payment required" });

  const students = readJSON("./data/students.json");
  res.json(students);
});

module.exports = router;
