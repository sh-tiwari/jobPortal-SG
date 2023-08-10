import { CompanyBasic } from '../models/campany.model'
export interface Job {
  _id: string;
  jobTitle?: string;
  companyName?: string;
  jobType?: string;
  workingHours?: string;
  jobSkills?: string[];
  experience?: string;
  salary?: string;
  description?: string;
  location?: string;
  city?: string;
  postcode?: string;
  country?: string;
  addressCoordinates?: {
    latitude?: number;
    longitude?: number;
  };
  status: string;
  applicants: Array<{
    _id?: string;
    appliedDate?: Date;
  }>;
  recruiter:CompanyBasic;
}


export interface JobBasicData {
  error?: string;
  message: string;
  data?: Job;
}


export interface JobBasicDatas {
  page?: any;
  error?: string;
  message: string;
  data?: Job[];
}


