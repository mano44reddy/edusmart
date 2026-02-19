const express = require("express");
const razorpay = require("../utils/razorpay");
const { readJSON, writeJSON } = require("../utils/fileHelper");

const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { role } = req.body;

  const amount = role === "student" ? 4900 : 7900;

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: "receipt_" + Date.now()
  });

  res.json(order);
});

router.post("/verify-payment", (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ message: "Login required" });

  const path = user.role === "student"
    ? "./data/students.json"
    : "./data/tutors.json";

  const users = readJSON(path);
  const index = users.findIndex(u => u.id === user.id);

  users[index].premiumAccess = true;
  writeJSON(path, users);

  req.session.user.premiumAccess = true;

  res.json({ message: "Payment successful, premium unlocked" });
});

module.exports = router;
