
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/tutor", require("./routes/tutorRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(process.env.PORT, () =>
  console.log("EDUSMART running on http://localhost:" + process.env.PORT)
);
