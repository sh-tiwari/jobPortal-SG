const express = require("express");
const router = express.Router();
const Candidate = require('../controller/candidate.controller');

router.route('/')
    .post( Candidate.create)
    .get(Candidate.fetchAll);



router.route('/:id')
    .get (Candidate._populate, Candidate.fetch)
    .put( Candidate._populate,Candidate.update)
    .delete( Candidate._populate, Candidate.delete);
    

router.get('/:id/appliedJobs', Candidate.appliedJobs);


module.exports = router;