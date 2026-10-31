import api from './axios';
import { Recruiter, Company, Application } from '../types';

export const getRecruiterProfileApi = () =>
  api.get<Recruiter>('/recruiters/profile');

export const updateRecruiterProfileApi = (data: Partial<Recruiter>) =>
  api.put<Recruiter>('/recruiters/profile', data);

export const getMyCompanyApi = () =>
  api.get<Company>('/companies/my-company');

export const updateMyCompanyApi = (data: Partial<Company>) =>
  api.put<Company>('/companies/my-company', data);

export const getRecruiterDashboardApi = () =>
  api.get<{
    stats: {
      activeJobs: number;
      totalApplications: number;
      shortlisted: number;
      interviewsScheduled: number;
    };
    recentApplications: Application[];
  }>('/recruiters/dashboard');
