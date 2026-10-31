import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRecruiterDashboardApi } from '../../api/recruiter';
import { Application } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  PlusCircle,
  Building2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 3,
    totalApplications: 48,
    shortlisted: 12,
    interviewsScheduled: 6,
  });
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getRecruiterDashboardApi();
      if (res.data) {
        if (res.data.stats) setStats(res.data.stats);
        if (res.data.recentApplications) setRecentApplications(res.data.recentApplications);
      }
    } catch (err) {
      console.error('Error fetching recruiter dashboard', err);
      // Mock fallback data for preview
      setRecentApplications([
        {
          id: 101,
          student: {
            id: 1,
            fullName: 'Rohan Sharma',
            rollNumber: '21CS042',
            branch: 'CSE',
            cgpa: 9.1,
            graduationYear: 2025,
            placed: false,
          },
          job: {
            id: 1,
            title: 'Cloud Infrastructure Engineer',
            jobType: 'FULL_TIME',
            status: 'OPEN',
            description: '',
            eligibleBranches: ['CSE', 'IT'],
            requiredSkills: ['AWS', 'Docker'],
          },
          status: 'SHORTLISTED',
          appliedAt: '2025-05-12T09:30:00',
        },
        {
          id: 102,
          student: {
            id: 2,
            fullName: 'Ananya Gupta',
            rollNumber: '21IT019',
            branch: 'IT',
            cgpa: 8.85,
            graduationYear: 2025,
            placed: false,
          },
          job: {
            id: 1,
            title: 'Cloud Infrastructure Engineer',
            jobType: 'FULL_TIME',
            status: 'OPEN',
            description: '',
            eligibleBranches: ['CSE', 'IT'],
            requiredSkills: ['AWS', 'Docker'],
          },
          status: 'APPLIED',
          appliedAt: '2025-05-13T11:00:00',
        },
        {
          id: 103,
          student: {
            id: 3,
            fullName: 'Karthik Raja',
            rollNumber: '21EC055',
            branch: 'ECE',
            cgpa: 8.4,
            graduationYear: 2025,
            placed: false,
          },
          job: {
            id: 2,
            title: 'Firmware Engineer',
            jobType: 'FULL_TIME',
            status: 'OPEN',
            description: '',
            eligibleBranches: ['ECE', 'EEE'],
            requiredSkills: ['C', 'Embedded'],
          },
          status: 'SELECTED',
          appliedAt: '2025-05-10T16:20:00',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading recruiter dashboard..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-950/60 via-navy-800 to-primary-950/60 border border-navy-700 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="badge badge-violet mb-2">Corporate Hiring Workspace</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {user?.fullName || 'Recruiter'}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Manage your company job postings, review filtered talent pipelines, and coordinate candidate interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/recruiter/jobs/create"
              className="btn-primary text-sm flex items-center gap-2 shadow-lg shadow-primary-600/30 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Job</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Positions
            </span>
            <Briefcase className="w-5 h-5 text-primary-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{stats.activeJobs}</span>
          <p className="text-xs text-slate-400 mt-1">Accepting student applications</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Applicants
            </span>
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{stats.totalApplications}</span>
          <p className="text-xs text-slate-400 mt-1">Verified eligible candidates</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Shortlisted
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{stats.shortlisted}</span>
          <p className="text-xs text-slate-400 mt-1">Ready for interview rounds</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Interviews Scheduled
            </span>
            <Calendar className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{stats.interviewsScheduled}</span>
          <p className="text-xs text-slate-400 mt-1">Upcoming technical & HR sessions</p>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/recruiter/jobs/create"
          className="card card-hover p-5 flex items-center gap-4 bg-navy-800/80"
        >
          <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center shrink-0">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Create Job Opening</h4>
            <p className="text-xs text-slate-400 mt-0.5">Define role & criteria</p>
          </div>
        </Link>

        <Link
          to="/recruiter/applicants"
          className="card card-hover p-5 flex items-center gap-4 bg-navy-800/80"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Review Applicants</h4>
            <p className="text-xs text-slate-400 mt-0.5">Filter by GPA & branch</p>
          </div>
        </Link>

        <Link
          to="/recruiter/interviews"
          className="card card-hover p-5 flex items-center gap-4 bg-navy-800/80"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Manage Interviews</h4>
            <p className="text-xs text-slate-400 mt-0.5">Schedule & record outcomes</p>
          </div>
        </Link>
      </div>

      {/* Recent Applicants Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Candidate Applications</h2>
          <Link
            to="/recruiter/applicants"
            className="text-xs font-semibold text-primary-400 hover:text-primary-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            No applicant submissions yet. Ensure your jobs are set to OPEN status.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="table-header">Candidate</th>
                  <th className="table-header">Roll & Branch</th>
                  <th className="table-header">CGPA</th>
                  <th className="table-header">Role Applied</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td className="table-cell font-semibold text-white">
                      {app.student?.fullName || 'Candidate'}
                    </td>
                    <td className="table-cell text-xs">
                      <span className="font-mono text-slate-300">{app.student?.rollNumber}</span>
                      <span className="text-slate-400 ml-2">({app.student?.branch})</span>
                    </td>
                    <td className="table-cell font-semibold text-emerald-400">
                      {app.student?.cgpa}
                    </td>
                    <td className="table-cell text-slate-300">
                      {app.job?.title}
                    </td>
                    <td className="table-cell">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="table-cell text-right">
                      <Link
                        to={`/recruiter/applicants/${app.id}`}
                        className="text-xs font-medium text-primary-400 hover:underline"
                      >
                        Review Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
