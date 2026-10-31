import api from './axios';
import {
  Student,
  Recruiter,
  Company,
  RecruitmentDrive,
  DashboardStats,
  BranchPlacementStat,
  MonthlyPlacementStat,
  StatusDistributionStat,
} from '../types';

export const getAdminDashboardApi = () =>
  api.get<{
    stats: DashboardStats;
    recentActivities: Array<{
      id: number;
      action: string;
      target: string;
      timestamp: string;
      type: string;
    }>;
    branchStats: BranchPlacementStat[];
    statusDistribution: StatusDistributionStat[];
  }>('/admin/dashboard');

export const getAdminStudentsApi = (params?: { branch?: string; placed?: boolean; search?: string }) =>
  api.get<Student[]>('/admin/students', { params });

export const getAdminStudentByIdApi = (id: number | string) =>
  api.get<Student>(`/admin/students/${id}`);

export const toggleStudentStatusApi = (id: number | string, active: boolean) =>
  api.put(`/admin/students/${id}/status`, { active });

export const getAdminRecruitersApi = () =>
  api.get<Recruiter[]>('/admin/recruiters');

export const approveRecruiterApi = (id: number | string, approved: boolean) =>
  api.put(`/admin/recruiters/${id}/approve`, { approved });

export const getAdminCompaniesApi = () =>
  api.get<Company[]>('/admin/companies');

export const approveCompanyApi = (id: number | string, approved: boolean) =>
  api.put(`/admin/companies/${id}/approve`, { approved });

export const getAdminDrivesApi = () =>
  api.get<RecruitmentDrive[]>('/admin/drives');

export const createDriveApi = (data: Partial<RecruitmentDrive>) =>
  api.post<RecruitmentDrive>('/admin/drives', data);

export const updateDriveApi = (id: number | string, data: Partial<RecruitmentDrive>) =>
  api.put<RecruitmentDrive>(`/admin/drives/${id}`, data);

export const getPlacementAnalyticsApi = () =>
  api.get<{
    summary: {
      totalEligible: number;
      placedCount: number;
      placementRate: number;
      avgPackageLpa: number;
      highestPackageLpa: number;
      totalOffers: number;
    };
    branchWise: BranchPlacementStat[];
    monthlyTrend: MonthlyPlacementStat[];
    statusDistribution: StatusDistributionStat[];
    topCompanies: Array<{ name: string; hires: number }>;
  }>('/admin/analytics');
