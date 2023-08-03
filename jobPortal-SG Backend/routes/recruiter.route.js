const express = require("express");
const router = express.Router();
const Recruiter = require("../controller/recruiter.controller");


router.route('/')
    .post( Recruiter.create)
    .get(Recruiter.fetchAll);



router.route('/:id')
    //.get (Recruiter._populate, Recruiter.fetch)
    .put( Recruiter._populate,Recruiter.update)
    .delete(Recruiter._populate,Recruiter.delete); 

module.exports = router;