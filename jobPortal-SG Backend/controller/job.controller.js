const JobStructure = require('../models/job');
const CandidateStructure = require('../models/candidate');
const RecruiterStructure = require('../models/recruiter');
exports._populate = async (req, res, next) => {
    if (req.params.id) {
        const {
            id,
        } = req.params;

        try {
            const job = await JobStructure.findById(id).exec();

            if (!job) {
                const err = new Error('Job not found.');
                err.status = 404;
                return next(err);
            }
            req.job = job;
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    } else {
        next();
    }
}

exports.create = async (req, res, next) => {
    const jobData = req.body;
    console.log(jobData);
  
    try {
      // Create the job in the Job collection
      const newJob = await JobStructure.create(jobData);
  
      // Assuming you have the recruiter ID in req.user.id, adjust it based on your authentication logic
      const recruiterId = req.params.id;
  
      // Find the recruiter and update the postedJobs array
      const recruiter = await RecruiterStructure.findById(recruiterId);
      if (recruiter) {
        recruiter.postedJobs.push({ _id: newJob._id, postedDate: new Date() });
        await recruiter.save();
    }

      return res.json({ message: 'Job posted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.fetchAll = async (req, res, next) => {
    console.log("request",req.query);
    let filter= {};
    
        filter['$and']=[];
        if(req.query.status){
			filter['$and'].push({
				'status': {            
				  '$eq': req.query.status,
				},
			});
		} else if(req.query.status==''){
            filter['$and'].push({
                'status': {
                    '$ne': req.query.status
                }
            });
        }else {
            filter['$and'].push({
                'status': {
                    '$eq': "open"
                }
            });
        }

        if(req.query.type){
			filter['$and'].push({
				'type': {            
				  '$eq': req.query.type,
				},
			});
		} else if(req.query.type==''){
            filter['$and'].push({
                'type': {
                    '$ne': req.query.type
                }
            });
        }else {
            filter['$and'].push({
                'type': {
                    '$eq': ""
                }
            });
        }

        if (req.query.filter) {
			filter['$or'] = [];
			filter['$or'].push({
				'jobTitle': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
			filter['$or'].push({
				'location': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
			filter['$or'].push({
				'city': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
			filter['$or'].push({
				'jobType': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
			filter['$or'].push({
				'salary': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});
			filter['$or'].push({
				'companyName': {
					'$regex': req.query.filter,
					'$options': 'i',
				},
			});

		}
    
    try {

        const jobs = await JobStructure.find(filter).exec();

      
        res.json({
            isSuccess: true,
            data: jobs,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};


exports.update = async (req, res, next) => {

    let job = req.job;
    let updatedJob = Object.assign(job, req.body);    

    try{
        const savedUser = await updatedJob.save();
        res.status(200).json({
            isSuccess:true,
            job:updatedJob
        })
    }catch(err){
        next(err);
    }
    
    
};



exports.delete = async (req, res, next) => {
    if (!req.job) {
        return res.sendStatus(403)
    }
    try {
        const response = await JobStructure.deleteOne(req.user);
		res.status(200).json({isSuccess:true,response});
        
    } catch (err) {
        next(err);
    }
};

/* exports.apply = async (req, res) => {
    const { id } = req.params; // Get the job ID from the URL parameter
    const { candidateId } = req.body; // Get the candidate ID from the request body

    try {
      // Find the job by ID
      const job = await JobStructure.findById(id);

      // Check if the job exists
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      // Check if the candidate has already applied for the job
      if (job.applicants.some(applicant => applicant._id.toString() === candidateId)) {
        return res.status(400).json({ error: 'Candidate has already applied for this job' });
      }

      // Add the candidate ID to the applicants array along with the applied date
      job.applicants.push({ _id: candidateId, appliedDate: new Date() });

      // Save the updated job document
      await job.save();

      return res.json({ message: 'Job application successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
 */

exports.apply = async (req, res) => {

    console.log("apply job",req.body)
    const { id } = req.params; // Get the job ID from the URL parameter
    const { candidateId } = req.body; // Get the candidate ID from the request body

    try {
      // Find the job by ID
      const job = await JobStructure.findById(id);

      // Check if the job exists
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      // Check if the candidate has already applied for the job
      if (job.applicants.some(applicant => applicant._id === candidateId)) {
        return res.status(400).json({ error: 'Candidate has already applied for this job' });
      }

      // Add the candidate ID to the applicants array along with the applied date
      job.applicants.push({ _id: candidateId, appliedDate: new Date() });

      // Save the updated job document
      await job.save();

      // Now update the appliedJobs array in the Candidate model
      const candidate = await CandidateStructure.findById(candidateId);
      if (!candidate) {
        return res.status(404).json({error: 'User not found' })
      }
      if (candidate.appliedJobs.some(appliedJobs => appliedJobs._id === id)){
        return res.status(400).json({ error: 'This job already exists in Applied Job Array of Candidate' });
        
    }

    candidate.appliedJobs.push({ _id: id, appliedDate: new Date() });
    let updateduser = await candidate.save();

      return res.json({ message: 'Job applied successfully' ,user:updateduser});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.postedJobs = async (req, res, next) => {
    const recruiterId = req.params.id; // Assuming you are passing recruiter ID as a parameter
  
    try {
      // Find the recruiter by ID
      const recruiter = await RecruiterStructure.findById(recruiterId);
  
      if (!recruiter) {
        return res.status(404).json({ error: 'Recruiter not found' });
      }
  
      // Get the job IDs from the postedJobs array of the recruiter
      const jobIds = recruiter.postedJobs.map(job => job._id);
  
      // Fetch the details of the jobs with the IDs from the postedJobs array
      const postedJobs = await JobStructure.find({ _id: { $in: jobIds } });
  
      return res.json({ isSuccess: true, data: postedJobs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


//get Applicants list

exports.getApplicants = async (req, res) => {
  try {
    const Id = req.params.Id;

    console.log(Id)
;
    // Find the job by its ID
    const job = await JobStructure.findById(Id).exec();
    console.log(job);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Get the list of candidate IDs who have applied for the job
    const candidateIds = job.applicants.map((applicants) => applicants._id);

    console.log(candidateIds);
    // Find candidates based on the candidateIds array
    const applicants = await CandidateStructure.find({ _id: { $in: candidateIds } }).exec();

    console.log(applicants);

    res.json({
      isSuccess: true,
      data: applicants,
    });
  } catch (error) {
    console.error("Error fetching job applicants:", error);

    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};