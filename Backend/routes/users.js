const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");

// Sign up
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ 
      message: "User registered successfully",
      userId: newUser.id,
      role: newUser.role
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ where: { username, role } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    res.status(200).json({ 
      message: "Login successful",
      userId: user.id,
      role: user.role,
      username: user.username
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

// Get teachers list
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await User.findAll({ where: { role: 'teacher' }, attributes: ['id','username','email'] });
    res.status(200).json({ teachers });
  } catch (err) {
    console.error('GET TEACHERS ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
