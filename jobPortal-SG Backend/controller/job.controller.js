const JobStructure = require('../models/job');
const CandidateStructure = require('../models/candidate');
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
    const filter = req.body;
    console.log(filter);


    let newJob = new JobStructure(filter);

    

    try {
        const job = await newJob.save();
        res.status(201).json({
            isSuccess: true,
            Job: job
        });
    } catch (err) {
        console.log("error=>",err);
        next(err);
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
    let updatedJob = Object.assign(jobob, req.body);    

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

      // Now update the appliedJobs array in the Candidate model
      const candidate = await CandidateStructure.findById(candidateId);
      if (candidate) {
        if (candidate.appliedJobs.some(appliedJobs => appliedJobs._id.toString() === id)){
            return res.status(400).json({ error: 'This job already exists in Applied Job Array of Candidate' });
            
        }

        candidate.appliedJobs.push({ _id: id, appliedDate: new Date() });
        await candidate.save();
      }

      return res.json({ message: 'Job applied successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };