const express = require("express");
const router = express.Router();
const Candidate = require('../controller/candidate.controller');

router.route('/')
    .post( Candidate.create)
    .get(Candidate.fetchAll);

router.route('/register')
    .post(Candidate.register);

router.route('/login')
    .post(Candidate.login);

router.route('/:id')
    .get (Candidate._populate, Candidate.fetch)
    .put( Candidate._populate,Candidate.update)
    .delete( Candidate._populate, Candidate.delete); 


module.exports = router;