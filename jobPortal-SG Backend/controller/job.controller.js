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