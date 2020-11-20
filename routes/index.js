const express = require('express');
const router = express.Router();


//startside
router.get('/', (req, res) => res.render('welcome'))




module.exports = router;
