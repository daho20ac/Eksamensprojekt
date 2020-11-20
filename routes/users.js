const express = require('express');
const router = express.Router();

// Login side
router.get('/login', (req, res) => res.send("Login"))

// Register side
router.get('/register', (req, res) => res.send("Register"))



module.exports = router;
