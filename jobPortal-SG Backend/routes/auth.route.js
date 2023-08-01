const express = require("express");
const router = express.Router();
const Candidate = require('../controller/auth.controller');

router.route('/register')
    .post(Candidate.register);

router.route('/login')
    .post(Candidate.login);