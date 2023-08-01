const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RecruiterSchema = new Schema({
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
  status: {
    type: String,
    default: 'active'
  },  
},
{
  timestamps:true,



});
const RecruiterModel = mongoose.model("recruiter", RecruiterSchema);
module.exports = RecruiterModel;