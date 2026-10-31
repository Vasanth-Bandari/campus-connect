import api from './axios';
import { Job } from '../types';

export interface JobFilterParams {
  search?: string;
  branch?: string;
  jobType?: string;
  minPackage?: number;
  status?: string;
  page?: number;
  size?: number;
}

export const getJobsApi = (params?: JobFilterParams) =>
  api.get<Job[]>('/jobs', { params });

export const getJobByIdApi = (id: number | string) =>
  api.get<Job>(`/jobs/${id}`);

export const checkJobEligibilityApi = (id: number | string) =>
  api.get<{ eligible: boolean; reasons: string[]; minCgpaMet: boolean; branchMet: boolean; gradYearMet: boolean }>(
    `/jobs/${id}/eligibility`
  );

export const createJobApi = (data: Partial<Job>) =>
  api.post<Job>('/jobs', data);

export const updateJobApi = (id: number | string, data: Partial<Job>) =>
  api.put<Job>(`/jobs/${id}`, data);

export const cancelJobApi = (id: number | string) =>
  api.put<Job>(`/jobs/${id}/cancel`);

export const getRecruiterJobsApi = () =>
  api.get<Job[]>('/jobs/my-jobs');
