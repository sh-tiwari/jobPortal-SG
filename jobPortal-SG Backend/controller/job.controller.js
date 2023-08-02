const JobStructure = require('../models/job');
/* exports._populate = async (req, res, next) => {
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
 */
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