const express = require("express");
const router = express.Router();
const AuthController = require('../controller/auth.controller');

router.route('/register')
    .post(AuthController.register);

router.route('/login')
    .post(AuthController.login);

router.route('/recruiter-register')
    .post(AuthController.recRegister);

router.route('/recruiter-login')
    .post(AuthController.recLogin);

module.exports = router;