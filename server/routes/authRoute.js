"use strict";
const express = require("express");
const router = express.Router();
// const {body} = require('express-validator');
// const {login, logout, register} = require('../controllers/authController');
const { login } = require("../controllers/authController");

router
//   .get('/logout', logout)
  .post("/login", login)
//   .post(
//     '/register',
//     body('username').isLength({ min: 3 }).trim().escape(),
//     body('email').isEmail().normalizeEmail(),
//     body('password').isLength({ min: 8 }).trim(),
//     register
//   );
module.exports = router;