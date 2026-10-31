import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboardApi } from '../../api/student';
import { Job, Application } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Briefcase,
  FileCheck,
  CheckCircle2,
  Calendar,
  Bell,
  ArrowRight,
  TrendingUp,
  Building2,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    profileCompletion: 80,
    totalApplications: 0,
    shortlisted: 0,
    upcomingInterviews: 0,
    unreadNotifications: 0,
  });
  const [eligibleJobs, setEligibleJobs] = useState<Job[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const res = await getStudentDashboardApi();
      if (res.data) {
        if (res.data.stats) setStats(res.data.stats);
        if (res.data.eligibleJobs) setEligibleJobs(res.data.eligibleJobs.slice(0, 3));
        if (res.data.recentApplications) setRecentApplications(res.data.recentApplications.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching dashboard', err);
      // Fallback/mock defaults if backend endpoint is initializing
      setEligibleJobs([
        {
          id: 1,
          title: 'Software Development Engineer',
          company: { id: 1, name: 'Amazon AWS', approved: true },
          location: 'Bangalore, India',
          packageLpa: 18.5,
          jobType: 'FULL_TIME',
          description: 'Build hyperscale cloud backend microservices using Java and distributed systems.',
          eligibleBranches: ['CSE', 'IT', 'ECE'],
          requiredSkills: ['Java', 'Spring Boot', 'AWS', 'Data Structures'],
          status: 'OPEN',
          applicationDeadline: '2025-06-30',
        },
        {
          id: 2,
          title: 'Full Stack Engineer',
          company: { id: 2, name: 'Microsoft IDC', approved: true },
          location: 'Hyderabad, India',
          packageLpa: 16.0,
          jobType: 'FULL_TIME',
          description: 'Work with Azure core cloud services and develop responsive web interfaces.',
          eligibleBranches: ['CSE', 'IT'],
          requiredSkills: ['React', 'TypeScript', 'C#', 'SQL'],
          status: 'OPEN',
          applicationDeadline: '2025-07-15',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your student workspace..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900/60 via-navy-800 to-violet-900/60 border border-navy-700 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Placement Season 2024-25</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.fullName || user?.email.split('@')[0]}!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Track your hiring rounds, discover company drives matching your academic credentials, and prepare for interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/jobs"
              className="btn-primary text-sm flex items-center gap-2 shadow-lg shadow-primary-600/30 whitespace-nowrap"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Profile Completion */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Profile Ready</span>
            <TrendingUp className="w-4 h-4 text-primary-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{stats.profileCompletion}%</span>
            <Link to="/student/profile" className="text-xs text-primary-400 hover:underline">
              Edit
            </Link>
          </div>
          <div className="w-full bg-navy-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.profileCompletion}%` }}
            />
          </div>
        </div>

        {/* Applications */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Applied</span>
            <FileCheck className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.totalApplications}</span>
          <p className="text-xs text-slate-400 mt-1">Submitted applications</p>
        </div>

        {/* Shortlisted */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Shortlisted</span>
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.shortlisted}</span>
          <p className="text-xs text-slate-400 mt-1">Advancing candidates</p>
        </div>

        {/* Interviews */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Interviews</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.upcomingInterviews}</span>
          <p className="text-xs text-slate-400 mt-1">Scheduled sessions</p>
        </div>

        {/* Unread Alerts */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Alerts</span>
            <Bell className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.unreadNotifications}</span>
          <p className="text-xs text-slate-400 mt-1">Unread notices</p>
        </div>
      </div>

      {/* Main Grid: Eligible Jobs & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Eligible Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Eligible Openings For You</h2>
              <p className="text-xs text-slate-400">Matches your branch, CGPA, and pass-out year</p>
            </div>
            <Link
              to="/student/jobs"
              className="text-xs font-semibold text-primary-400 hover:text-primary-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {eligibleJobs.length === 0 ? (
            <EmptyState
              title="No eligible jobs right now"
              description="Keep your profile updated. New drives are announced frequently by the placement coordinator."
            />
          ) : (
            <div className="space-y-4">
              {eligibleJobs.map((job) => (
                <div
                  key={job.id}
                  className="card card-hover p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{job.title}</h3>
                      <span className="badge badge-blue">{job.jobType.replace('_', ' ')}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {job.company?.name || 'Partner Company'}
                      </span>
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                      )}
                      {job.packageLpa && (
                        <span className="text-emerald-400 font-semibold">
                          ₹{job.packageLpa} LPA
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/student/jobs/${job.id}`}
                    className="btn-secondary text-xs sm:self-center text-center whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links & Tips */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-base font-bold text-white mb-4">Quick Navigation</h3>
            <div className="space-y-3">
              <Link
                to="/student/resume"
                className="flex items-center justify-between p-3 rounded-lg bg-navy-700/60 hover:bg-navy-700 text-sm text-slate-200 transition-colors"
              >
                <span>Upload Latest Resume</span>
                <ArrowRight className="w-4 h-4 text-primary-400" />
              </Link>
              <Link
                to="/student/applications"
                className="flex items-center justify-between p-3 rounded-lg bg-navy-700/60 hover:bg-navy-700 text-sm text-slate-200 transition-colors"
              >
                <span>Check Application Status</span>
                <ArrowRight className="w-4 h-4 text-primary-400" />
              </Link>
              <Link
                to="/student/interviews"
                className="flex items-center justify-between p-3 rounded-lg bg-navy-700/60 hover:bg-navy-700 text-sm text-slate-200 transition-colors"
              >
                <span>Interview Schedule</span>
                <ArrowRight className="w-4 h-4 text-primary-400" />
              </Link>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-violet-950/40 to-navy-800 border-violet-800/30">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Placement Readiness Tip
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ensure your verified resume highlights core technologies, live project URLs, and internship experience for higher shortlisting conversion.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Applications</h2>
          <Link
            to="/student/applications"
            className="text-xs font-semibold text-primary-400 hover:text-primary-300"
          >
            View all
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">
            You haven't applied to any jobs yet. Check eligible jobs above!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="table-header">Role</th>
                  <th className="table-header">Company</th>
                  <th className="table-header">Applied Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td className="table-cell font-medium text-white">{app.job?.title || 'Job Opening'}</td>
                    <td className="table-cell">{app.job?.company?.name || 'Company'}</td>
                    <td className="table-cell">
                      {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="table-cell">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="table-cell text-right">
                      <Link
                        to="/student/applications"
                        className="text-xs font-medium text-primary-400 hover:underline"
                      >
                        Details
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

export default StudentDashboard;
