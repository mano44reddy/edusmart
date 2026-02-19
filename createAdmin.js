const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

// ⚠️ IMPORTANT: SAME DATABASE NAME AS db.js
mongoose.connect("mongodb://127.0.0.1:27017/edusmart");

async function createAdmins() {
  try {

    const admins = [
      { username: "manohar", password: "admin123" },
      { username: "rosun", password: "admin123" }
    ];

    for (let admin of admins) {

      const exists = await Admin.findOne({ username: admin.username });

      if (!exists) {

        const hashedPassword = await bcrypt.hash(admin.password, 10);

        await Admin.create({
          username: admin.username,
          password: hashedPassword
        });

        console.log(admin.username + " created successfully");

      } else {
        console.log(admin.username + " already exists");
      }
    }

    mongoose.disconnect();

  } catch (error) {
    console.error("Error creating admin:", error);
  }
}

createAdmins();
