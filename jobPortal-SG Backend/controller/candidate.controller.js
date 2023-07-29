const CandidateStructure = require('../models/candidate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

exports._populate = async (req, res, next) => {
  if (req.params.id) {
      const {
          id,
      } = req.params;

      try {
          const candidate = await CandidateStructure.findById(id).exec();

          if (!candidate) {
              const err = new Error('Candidate not found.');
              err.status = 404;
              return next(err);
          }
          req.candidate = candidate;
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


    let newCandidate = new CandidateStructure(filter);

    

    try {
        const candidate = await newCandidate.save();
        res.status(201).json({
            isSuccess: true,
            Candidate: candidate
        });
    } catch (err) {
        console.log("error=>",err);
        next(err);
    }


};



exports.register = async (req, res, next) => {
  try {
    // Check if the candidate with the given email already exists
    const existingCandidate = await CandidateStructure.findOne({ email: req.body.email }).exec();

    if (existingCandidate) {
      // If the candidate already exists, return a 400 status with an error message
      return res.status(400).json({ email: "Email already exists" });
    }

    // If the candidate does not exist, proceed with creating a new candidate
    const newCandidate = new CandidateStructure({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Hash password before saving in the database
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw err;
      }

      bcrypt.hash(newCandidate.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }

        // Set the hashed password and save the candidate in the database
        newCandidate.password = hash;
        newCandidate.save()
          .then(candidate => res.json(candidate))
          .catch(err => console.log(err)); // Handle error during saving
      });
    });
  } catch (err) {
    console.log("Error during candidate registration:", err);
    // Return a 500 status with a general error message
    return res.status(500).json({ error: "Internal server error" });
  }
};




exports.login = async (req, res, next) => {
  console.log("This is Body", req.body);

  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find candidate by email
    const candidate = await CandidateStructure.findOne({ email }).exec();

    // Check if candidate exists
    if (!candidate) {
      return res.status(404).json({ EmailNotFound: "Email not found" });
    }

    // Check password using bcrypt
    const isMatch = await bcrypt.compare(password, candidate.password);
    if (isMatch) {
      console.log("Candidate Found");

      // Create JWT Payload
      const payload = {
        id: candidate.id,
        name: candidate.name
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
            role: "Candidate",
            user: candidate
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  } catch (err) {
    console.log("Error during candidate login:", err);
    // Return a 500 status with a general error message
    return res.status(500).json({ error: "Internal server error" });
  }
};




exports.fetchAll = async (req, res, next) => {
    try {

        const candidates = await CandidateStructure.find().exec();

      
        res.json({
            isSuccess: true,
            data: candidates,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.fetch = async (req, res, next) => {
  let candidate = req.candidate;

  res.status(200).json({
      isSuccess: true,
      Candidate: candidate
  });
};


exports.update = async (req, res, next) => {

  let candidate = req.candidate;
  let updatedCandidate = Object.assign(candidate, req.body);    

  try{
      const savedUser = await updatedCandidate.save();
      res.status(200).json({
          isSuccess:true,
          candidate:updatedCandidate
      })
  }catch(err){
      next(err);
  }
  
  
};



exports.delete = async (req, res, next) => {
  if (!req.candidate) {
      return res.sendStatus(403)
  }
  try {
      const response = await CandidateStructure.deleteOne(req.user);
  res.status(200).json({isSuccess:true,response});
      
  } catch (err) {
      next(err);
  }
};