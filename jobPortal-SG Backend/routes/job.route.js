const express = require("express");
const router = express.Router();
const Job = require('../controller/job.controller');



router.route('/')
    .post( Job.create)
    .get(Job.fetchAll);

router.route('/:id')
    //.get (Job._populate, Job.fetch)
    .put( Job._populate,Job.update)
    .delete( Job._populate, Job.delete);

router.post('/:id/apply', Job.apply);

module.exports = router;