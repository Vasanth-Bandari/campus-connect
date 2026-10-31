import api from './axios';
import { Application, ApplicationStatus, Interview } from '../types';

export const applyJobApi = (data: { jobId: number | string; coverLetter?: string }) =>
  api.post<Application>('/applications', data);

export const getMyApplicationsApi = () =>
  api.get<Application[]>('/applications/my-applications');

export const getApplicationByIdApi = (id: number | string) =>
  api.get<Application>(`/applications/${id}`);

export const withdrawApplicationApi = (id: number | string) =>
  api.put<Application>(`/applications/${id}/withdraw`);

export const getJobApplicationsApi = (jobId: number | string) =>
  api.get<Application[]>(`/applications/job/${jobId}`);

export const updateApplicationStatusApi = (
  id: number | string,
  status: ApplicationStatus,
  feedback?: string
) => api.put<Application>(`/applications/${id}/status`, { status, feedback });

export const bulkUpdateApplicationStatusApi = (
  applicationIds: number[],
  status: ApplicationStatus
) => api.post('/applications/bulk-status', { applicationIds, status });

export const getAllApplicationsApi = (params?: { status?: string; search?: string }) =>
  api.get<Application[]>('/applications', { params });

export const scheduleInterviewApi = (data: {
  applicationId: number | string;
  scheduledAt: string;
  mode: string;
  venue?: string;
  meetingLink?: string;
  round?: number;
}) => api.post<Interview>('/interviews', data);

export const updateInterviewOutcomeApi = (
  id: number | string,
  outcome: string,
  feedback?: string
) => api.put<Interview>(`/interviews/${id}/outcome`, { outcome, feedback });

export const getRecruiterInterviewsApi = () =>
  api.get<Interview[]>('/interviews/recruiter');
