const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const CandidateStructure = require('../models/candidate');
const RecruiterStructure = require("../models/recruiter");

//Candidate Register and signIn

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


// Recruiter Register Login
exports.recRegister = async (req, res, next) => {
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



exports.recLogin = async (req, res, next) => {
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