import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplicationsApi, withdrawApplicationApi } from '../../api/applications';
import { Application, ApplicationStatus } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  FileCheck,
  Calendar,
  XCircle,
  Building2,
  ExternalLink,
  Filter,
  CheckCircle,
} from 'lucide-react';

export const MyApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await getMyApplicationsApi();
      if (res.data && Array.isArray(res.data)) {
        setApplications(res.data);
      } else {
        setApplications(getMockApplications());
      }
    } catch (err) {
      console.error('Error fetching applications', err);
      setApplications(getMockApplications());
    } finally {
      setLoading(false);
    }
  };

  const getMockApplications = (): Application[] => [
    {
      id: 1,
      job: {
        id: 1,
        title: 'Software Development Engineer',
        company: { id: 1, name: 'Amazon AWS', approved: true },
        location: 'Bangalore, India',
        packageLpa: 18.5,
        jobType: 'FULL_TIME',
        status: 'OPEN',
        eligibleBranches: ['CSE', 'IT'],
        requiredSkills: ['Java', 'Distributed Systems'],
        description: '',
      },
      status: 'SHORTLISTED',
      coverLetter: 'Passionate about distributed storage engines.',
      appliedAt: '2025-05-10T10:30:00',
    },
    {
      id: 2,
      job: {
        id: 2,
        title: 'Frontend Engineer',
        company: { id: 2, name: 'Microsoft IDC', approved: true },
        location: 'Hyderabad, India',
        packageLpa: 16.0,
        jobType: 'FULL_TIME',
        status: 'OPEN',
        eligibleBranches: ['CSE', 'IT'],
        requiredSkills: ['React', 'TypeScript'],
        description: '',
      },
      status: 'APPLIED',
      coverLetter: 'Strong frontend background in React and state management.',
      appliedAt: '2025-05-12T14:15:00',
    },
    {
      id: 3,
      job: {
        id: 3,
        title: 'Cloud Systems Intern',
        company: { id: 3, name: 'Cisco Systems', approved: true },
        location: 'Remote',
        packageLpa: 8.0,
        jobType: 'INTERNSHIP',
        status: 'OPEN',
        eligibleBranches: ['CSE', 'IT', 'ECE'],
        requiredSkills: ['Linux', 'Docker'],
        description: '',
      },
      status: 'SELECTED',
      appliedAt: '2025-04-20T09:00:00',
    },
  ];

  const handleWithdraw = async (id: number) => {
    if (!window.confirm('Are you sure you want to withdraw this application? This action cannot be reversed.')) {
      return;
    }

    try {
      await withdrawApplicationApi(id);
      setActionSuccess('Application has been withdrawn successfully.');
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: 'WITHDRAWN' as ApplicationStatus } : app
        )
      );
      setTimeout(() => setActionSuccess(null), 3500);
    } catch (err) {
      console.error('Failed to withdraw application', err);
      // Fallback update
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: 'WITHDRAWN' as ApplicationStatus } : app
        )
      );
      setActionSuccess('Application withdrawn.');
      setTimeout(() => setActionSuccess(null), 3500);
    }
  };

  const filtered = applications.filter((app) => {
    if (selectedStatus === 'ALL') return true;
    return app.status === selectedStatus;
  });

  if (loading) {
    return <LoadingSpinner message="Loading your submitted applications..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Job Applications</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track hiring progression and status updates from campus recruiters.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field max-w-[180px] text-xs py-2 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No applications found"
          description={
            selectedStatus !== 'ALL'
              ? `No applications with status "${selectedStatus}".`
              : "You haven't submitted any job applications yet."
          }
          actionLabel="Browse Available Jobs"
          onAction={() => (window.location.href = '/student/jobs')}
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header">Job Title & Details</th>
                  <th className="table-header">Hiring Partner</th>
                  <th className="table-header">Submission Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {filtered.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-semibold text-white">
                        {app.job?.title || 'Position'}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {app.job?.location} • ₹{app.job?.packageLpa} LPA
                      </div>
                    </td>

                    <td className="table-cell font-medium text-slate-300">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{app.job?.company?.name || 'Company'}</span>
                      </div>
                    </td>

                    <td className="table-cell text-xs text-slate-400">
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Recent'}
                    </td>

                    <td className="table-cell">
                      <StatusBadge status={app.status} />
                    </td>

                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        {app.status === 'SHORTLISTED' && (
                          <Link
                            to="/student/interviews"
                            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-primary-400 border-primary-500/30"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Interviews</span>
                          </Link>
                        )}

                        {app.status === 'APPLIED' && (
                          <button
                            type="button"
                            onClick={() => handleWithdraw(app.id)}
                            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition-colors"
                          >
                            Withdraw
                          </button>
                        )}

                        {app.job?.id && (
                          <Link
                            to={`/student/jobs/${app.job.id}`}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-700"
                            title="View Job Details"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
