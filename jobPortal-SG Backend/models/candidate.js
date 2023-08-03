const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const autoIncrement = require('mongoose-auto-increment');


const CandidateSchema = new Schema({
name:String,
mobile:String,

    email: {
        type: String,
        lowercase: true,
        validate: {
          validator(mainEmail) {
            // eslint-disable-next-line max-len
            const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
    
            if (mainEmail) {
              return emailRegex.test(mainEmail);
            } 
            else {
              return true;
            }
          },
          message: '{VALUE} is not a valid email.',
        },
    },
    password: String,
    gender: String,
    dob: Date,
    selfDescription: String,
    address: String,
    city:String,
    postCode:String,
    country: String,
    appliedJobs: [{
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
      },
      appliedDate: Date,
    }],
   
  status: {
    type: String,
    default: 'active'
  },
  
}, {
  timestamps: true,
});

/* JobSchema.plugin(autoIncrement.plugin, {
  model: 'Job',
  field: 'jobID',
  startAt: 300000,
  incrementBy: 1
}); */
const CandidateModel = mongoose.model("candidate", CandidateSchema);
module.exports = CandidateModel; 