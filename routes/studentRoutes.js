const express = require("express");
const router = express.Router();
const { readJSON } = require("../utils/fileHelper");

router.get("/tutors", (req, res) => {
  const tutors = readJSON("./data/tutors.json");

  const limited = tutors.map(t => ({
    name: t.name,
    email: t.premiumAccess ? t.email : "Login & Pay to view contact",
    premiumAccess: t.premiumAccess
  }));

  res.json(limited);
});

module.exports = router;
