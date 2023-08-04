/**
 * @model this file job for model
 */
export interface JobBasic {
  _id: string;
  jobID?: string;
  jobTitle?: string;
  companyName?: string;
  jobType?: string;
  schedule?: string;
  workTime?: string;
  jobSkills?: string[]; // Change [] to string[]
  experience?: string;
  salary?: string;
  description?: string;
  location?: string;
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
  addressCoordinates: {
    latitude?: number; // Change Number to number
    longitude?: number; // Change Number to number
  };
  user: {
    _id?: string;
  };
  status: string;
  applicants: Array<{
    _id?: string;
    appliedDate?: Date;
  }>;
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
