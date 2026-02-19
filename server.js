require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

/* =============================
   SECURITY & MIDDLEWARE
============================= */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =============================
   DATABASE CONNECTION
============================= */

connectDB(); // uses MONGO_URI from Render env variables

/* =============================
   STATIC FILES (Frontend)
============================= */

app.use(express.static(path.join(__dirname, "public")));

/* =============================
   API ROUTES
============================= */

app.use("/api", authRoutes);

/* =============================
   ROOT ROUTE (Important for Render)
============================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =============================
   HANDLE UNKNOWN ROUTES
============================= */

app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

/* =============================
   START SERVER (Render Compatible)
============================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EDUSMART running on port ${PORT}`);
});
