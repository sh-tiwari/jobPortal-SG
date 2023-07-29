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
  country: String,
  addressCoordinates: {
    latitude: Number,
    longitude: Number
  }, 
  /* user: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  } */
  status: {
    type: String,
    default: 'open'
  },
  /* applicants: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedDate: Date,
  }]  */
}, {
  timestamps: true,
});

/* JobSchema.plugin(autoIncrement.plugin, {
  model: 'Job',
  field: 'jobID',
  startAt: 300000,
  incrementBy: 1
}); */
const JobModel = mongoose.model("job", JobSchema);
module.exports = JobModel; 