const express = require("express");
const routes = express.Router();
const Admin  =  require('./routes/admin.route');
const Candidate = require('./routes/candidate.route');
const Recruiter = require('./routes/recruiter.route');
const Jobs= require('./routes/job.route');

routes.use('/admin',Admin);
routes.use('/jobs',Jobs),
routes.use('/candidate',Candidate);
routes.use('/recruiter',Recruiter)
module.exports= routes;