import api from './axios';
import { AuthResponse } from '../types';

export const loginApi = (data: { email: string; password: string }) =>
  api.post<AuthResponse>('/auth/login', data);

export const registerStudentApi = (data: {
  fullName: string;
  email: string;
  password?: string;
  rollNumber: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  phone?: string;
}) => api.post('/auth/register/student', data);

export const registerRecruiterApi = (data: {
  fullName: string;
  email: string;
  password?: string;
  companyName: string;
  designation: string;
  phone?: string;
}) => api.post('/auth/register/recruiter', data);

export const getCurrentUserApi = () =>
  api.get('/auth/me');
