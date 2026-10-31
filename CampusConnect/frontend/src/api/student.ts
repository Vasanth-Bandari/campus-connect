import api from './axios';
import { Student, Job, Interview, Application } from '../types';

export const getStudentProfileApi = () =>
  api.get<Student>('/students/profile');

export const updateStudentProfileApi = (data: Partial<Student>) =>
  api.put<Student>('/students/profile', data);

export const uploadResumeApi = (formData: FormData) =>
  api.post<{ resumeUrl: string }>('/students/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getStudentDashboardApi = () =>
  api.get<{
    stats: {
      profileCompletion: number;
      totalApplications: number;
      shortlisted: number;
      upcomingInterviews: number;
      unreadNotifications: number;
    };
    recentApplications: Application[];
    eligibleJobs: Job[];
  }>('/students/dashboard');

export const getEligibleJobsApi = () =>
  api.get<Job[]>('/students/eligible-jobs');

export const getStudentInterviewsApi = () =>
  api.get<Interview[]>('/students/interviews');
