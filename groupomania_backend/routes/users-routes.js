const userCtr = require('../controllers/users')
const express = require('express');
const router = express.Router();

router.post('/signup', userCtr.signup)
router.post('/login', userCtr.login)

module.exports = router;