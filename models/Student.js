const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  paymentStatus: {
    type: String,
    default: "Pending"
  }
});

// Hash password before save
studentSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Student", studentSchema);
