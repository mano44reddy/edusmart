const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  studentName: String,
  email: String,
  course: String,
  amount: Number,
  transactionId: String,
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
