export interface CandidateBasic {
  _id: string;
  candidateID: string;
  profileImageURL:string;
  profileImageDest: string;
  name:string;
  mobile: String,
  email:string; 
  gender: String,
  dob: Date; 
  location: String,
  street: String,  
  city: String,
  postcode: String,
  country: String,
  addressCoordinates: {
    latitude: Number,
    longitude: Number
  },  
  companyName: String,
  status: string;    
  isBlocked: boolean;
  type: String,  
  userSkills:[],
  appliedJobs: [{
    _id: string;
    appliedDate: Date;
  }]
}


export interface CandidateBasicData {
  isSuccess: boolean;
  message: string;
  user?: CandidateBasic;
}

export interface CandidatesBasicData {
  error: string;
  message: string;
  data?: CandidateBasic[];
}