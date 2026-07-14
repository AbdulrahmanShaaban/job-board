export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Application {
  _id: string;
  job: {
    _id: string;
    title: string;
    company: {
      _id: string;
      name: string;
    };
  };
  applicant: {
    _id: string;
    name: string;
    email: string;
  };
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationInput {
  coverLetter: string;
}

export interface UpdateApplicationStatusInput {
  status: ApplicationStatus;
}
