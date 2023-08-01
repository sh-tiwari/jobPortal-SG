/* const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const CandidateStructure = require('../models/candidate');

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
  }; */