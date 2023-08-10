const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const autoIncrement = require('mongoose-auto-increment');


const JobSchema = new Schema({
  jobTitle: String,
  companyName: String,
  jobType: String,
  workingHours:String,
  experience:String,
  salary: String,
  description: String,
  location: String,
  city:String,
  postCode:String,
  what:String,
  country: String,
  addressCoordinates: {
    latitude: Number,
    longitude: Number
  }, 
  recruiter: {
      type: Schema.Types.ObjectId,
      ref: 'recruiter'
  },
  status: {
    type: String,
    default: 'open'
  },
  applicants: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    appliedDate: Date,
  }]
}, {
  timestamps: true,
});
// Pre middleware for updating appliedJobs array in the Candidate model
/* JobSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const jobId = this._update?.$set?.applicants?._id;

    if (jobId) {
      // Find the candidate and update the appliedJobs array
      await this.model('Candidate').updateOne(
        { _id: jobId },
        { $addToSet: { appliedJobs: { _id: this._conditions._id, appliedDate: new Date() } } }
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}); */

// Pre middleware for updating appliedJobs array in the Candidate model
JobSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const candidateId = this._update?.$push?.applicants?._id;

    if (candidateId) {
      // Find the candidate and update the appliedJobs array
      await this.model('Candidate').updateOne(
        { _id: candidateId },
        { $addToSet: { appliedJobs: { _id: this._conditions._id, appliedDate: new Date() } } }
      );
    }
    next();
  } catch (err) {
    next(err);
  }
});

/* JobSchema.plugin(autoIncrement.plugin, {
  model: 'Job',
  field: 'jobID',
  startAt: 300000,
  incrementBy: 1
}); */
const JobModel = mongoose.model("job", JobSchema);
module.exports = JobModel; 