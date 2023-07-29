/**
 * @model this file job for model
 */
export interface JobBasic{
    _id: string;
    jobID?: string, 
    jobTitle?: String,
    companyName?: String,
    jobType?: String,
    schedule?:String,
    workTime?:String,
    jobSkills?: [],
    experience?: String,
    salary?: String,
    description?: String,
    location?: String,
    street?: String,
    city?: String,
    postcode?: String, 
    country?: String,  
    addressCoordinates: {
      latitude?: Number,
      longitude?: Number
    }, 
    user: {
      _id?: string
    },
    status: string,
    applicants: [{
      _id?: string;
      appliedDate?: Date;
    }] 
  }
  
  export interface JobBasicData {
    error: string;
    message: string;
    data?: JobBasic;
  }
  
  export interface JobBasicDatas {
    page: any;
    error: string;
    message: string;
    data?: JobBasic[];
    // page?: {
    //   page: number, 
    //   limit: number, 
    //   totalPages: number, 
    //   totalElements: number
    // };
  }
  