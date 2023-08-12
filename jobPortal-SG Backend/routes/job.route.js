const express = require("express");
const router = express.Router();
const Job = require('../controller/job.controller');



router.route('/')
    
    .get(Job.fetchAll);

router.route('/create')
    .post( Job.create);
router.route('/:id')
    //.get (Job._populate, Job.fetch)
    .put( Job._populate,Job.update)
    .delete( Job._populate, Job.delete);

router.post('/:id/apply', Job.apply);

//router.get('/:id/postedJobs', Job.postedJobs);

router.get("/applicants/:Id", Job.getApplicants);

module.exports = router;