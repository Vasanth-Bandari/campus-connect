export type Role = 'STUDENT' | 'RECRUITER' | 'ADMIN';

export type JobType = 'FULL_TIME' | 'INTERNSHIP' | 'PART_TIME';

export type JobStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'CANCELLED';

export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED' | 'WITHDRAWN';

export type InterviewMode = 'ONLINE' | 'OFFLINE';

export type InterviewOutcome = 'PENDING' | 'PASSED' | 'FAILED' | 'CANCELLED';

export type DriveStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export type NotificationType = 'INFO' | 'APPLICATION_UPDATE' | 'INTERVIEW_SCHEDULED' | 'SELECTION';

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface AuthUser {
  id: number;
  email: string;
  role: Role;
  token: string;
  fullName?: string;
}

export interface AuthResponse {
  token: string;
  type?: string;
  id: number;
  email: string;
  role: Role;
  fullName?: string;
}

export interface Company {
  id: number;
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  logoUrl?: string;
  approved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: number;
  user?: User;
  fullName: string;
  rollNumber: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  phone?: string;
  skills?: string;
  resumeUrl?: string;
  placed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Recruiter {
  id: number;
  user?: User;
  company?: Company;
  fullName: string;
  designation?: string;
  phone?: string;
  approved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  id: number;
  company?: Company;
  drive?: RecruitmentDrive;
  recruiter?: Recruiter;
  title: string;
  description: string;
  jobType: JobType;
  location?: string;
  packageLpa?: number;
  minCgpa?: number;
  graduationYear?: number;
  applicationDeadline?: string;
  status: JobStatus;
  eligibleBranches: string[];
  requiredSkills: string[];
  createdAt?: string;
  updatedAt?: string;
  hasApplied?: boolean;
  isEligible?: boolean;
}

export interface Application {
  id: number;
  student?: Student;
  job?: Job;
  status: ApplicationStatus;
  coverLetter?: string;
  appliedAt?: string;
  updatedAt?: string;
}

export interface Interview {
  id: number;
  application?: Application;
  scheduledAt: string;
  mode: InterviewMode;
  venue?: string;
  meetingLink?: string;
  round?: number;
  outcome: InterviewOutcome;
  feedback?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: number;
  user?: User;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export interface RecruitmentDrive {
  id: number;
  title: string;
  company?: Company;
  description?: string;
  startDate?: string;
  endDate?: string;
  status: DriveStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlacementResult {
  id: number;
  student?: Student;
  job?: Job;
  company?: Company;
  packageOffered?: number;
  placedAt?: string;
}

export interface DashboardStats {
  totalApplications?: number;
  shortlisted?: number;
  interviewsCount?: number;
  activeJobsCount?: number;
  totalStudents?: number;
  totalRecruiters?: number;
  totalCompanies?: number;
  totalJobs?: number;
  placementRate?: number;
  profileCompletion?: number;
  pendingApprovals?: number;
}

export interface BranchPlacementStat {
  branch: string;
  placed: number;
  total: number;
  percentage: number;
}

export interface MonthlyPlacementStat {
  month: string;
  count: number;
}

export interface StatusDistributionStat {
  name: string;
  value: number;
  color: string;
}
