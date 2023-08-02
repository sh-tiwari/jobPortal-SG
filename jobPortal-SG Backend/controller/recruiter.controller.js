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


exports.register = async (req, res, next) => {
    console.log('req.body',req.body);
  try {
      // Check if the recruiter with the given email already exists
      const existingRecruiter = await RecruiterStructure.findOne({ email: req.body.email }).exec();
  
      if (existingRecruiter) {
        // If the recruiter already exists, return a 400 status with an error message
        return res.status(400).json({ email: "Email already exists" });
      }
  
      // If the recruiter does not exist, proceed with creating a new candidate
      const newRecruiter = new RecruiterStructure({
        companyName: req.body.companyName,
        designation: req.body.designation,
        email: req.body.email,
        password: req.body.password
      });
    // Hash password before saving in the database
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
  
        bcrypt.hash(newRecruiter.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
// Set the hashed password and save the recruiter in the database
newRecruiter.password = hash;
newRecruiter.save()
  .then(recruiter => res.json(recruiter))
  .catch(err => console.log(err)); // Handle error during saving
});
});

} catch (err) {
    console.log("Error during recruiter registration:", err);
    // Return a 500 status with a general error message
    return res.status(500).json({ error: "Internal server error" });
  }
};



exports.login = async (req, res, next) => {
    console.log("This is Body", req.body);
  
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      // Find recruiter by email
      const recruiter = await RecruiterStructure.findOne({ email }).exec();
  
      // Check if recruiter exists
      if (!recruiter) {
        return res.status(404).json({ EmailNotFound: "Email not found" });
      }

      // Check password using bcrypt
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (isMatch) {
      console.log("recruiter Found");

      // Create JWT Payload
      const payload = {
        id: recruiter.id,
        name: recruiter.name
      };

      // Sign token
      jwt.sign(
        payload,
        config.secretOrKey,
        {
          expiresIn: 86400 // 1 day in seconds
        },
        (err, token) => {
          if (err) {
            throw err; // Handle error during token signing
          }

          res.json({
            success: true,
            token: token,
            role: "Recruiter",
            user: recruiter
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  } catch (err) {
    console.log("Error during recruiter login:", err);
    // Return a 500 status with a general error message
    return res.status(500).json({ error: "Internal server error" });
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