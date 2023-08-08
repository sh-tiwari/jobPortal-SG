export interface CompanyBasic {
  _id: string;
  profileImageURL:string;
  profileImageDest: string;
  companyName:string;
  recruiterName:string;
  mobile: String,
  companyWebsite:String,
  email:string; 
  gender: String, 
  location: String,  
  city: String,
  postcode: String,
  country: String,
  addressCoordinates: {
    latitude: Number,
    longitude: Number
  },  
  status: string;    
  postedJobs: [{
    _id: string;
    postedOn: Date;
  }]
}


export interface CompanyBasicData {
  isSuccess: boolean;
  message: string;
  user?: CompanyBasic;
}

export interface CompaniesBasicData {
  error: string;
  message: string;
  data?: CompanyBasic[];
}