const RecruiterStructure = require("../models/recruiter");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');



exports._populate = async (req, res, next) => {
    if (req.params.id) {
        const {
            id,
        } = req.params;
        try {
            const recruiter = await RecruiterStructure.findById(id).exec();

            if (!job) {
                const err = new Error('Recruiter not found.');
                err.status = 404;
                return next(err);
            }
            req.recruiter = recruiter;
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


    let newRecruiter = new RecruiterStructure(filter);

    

    try {
        const recruiter = await newRecruiter.save();
        res.status(201).json({
            isSuccess: true,
        Recruiter: newRecruiter
        });
    } catch (err) {
        console.log("error=>",err);
        next(err);
    }


};


exports.fetchAll = async (req, res, next) => {
    try {
        const recruiter = await RecruiterStructure.find().exec();

      
        res.json({
            isSuccess: true,
            data: recruiter,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.update = async (req, res, next) => {

    let recruiter = req.recruiter;
    let updatedRecruiter = Object.assign(recruiter, req.body);    
  
    try{
        const savedUser = await updatedRecruiter.save();
        res.status(200).json({
            isSuccess:true,
            recruiter:updatedRecruiter
        })
    }catch(err){
        next(err);
    }
      
  };
  
  exports.delete = async (req, res, next) => {
    if (!req.recruiter) {
        return res.sendStatus(403)
    }
    try {
        const response = await RecruiterStructure.deleteOne(req.user);
    res.status(200).json({isSuccess:true,response});
        
    } catch (err) {
        next(err);
    }
  };



  exports.postedJobs = async (req, res, next) => {
		const user = req.user;
		let userId = user._id;
		let filter = {}
		filter['user._id'] = userId;
		const [results, itemCount] = await Promise.all([
			Job.find(filter).populate('user._id', 'name mobile email companyName location street city postcode country addressCoordinates').exec(),
			Job.countDocuments(filter),
		]);
		const pageCount = Math.ceil(itemCount / req.query.limit);
		const isSuccess = true;
		try {
			res.status(200).json({
				object: 'list',
				page: {
					totalPages: pageCount,
					totalElements: itemCount,
				},
				data: results,
				isSuccess
			});
		} catch (err) {
			next(err);
		}
	}