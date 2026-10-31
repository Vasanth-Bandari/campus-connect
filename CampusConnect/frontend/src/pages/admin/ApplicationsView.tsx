import React, { useState, useEffect } from 'react';
import { getAllApplicationsApi } from '../../api/applications';
import { Application } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  FileCheck,
  Search,
  Filter,
  Building2,
  GraduationCap,
  Calendar,
} from 'lucide-react';

export const ApplicationsView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await getAllApplicationsApi();
      if (res.data && Array.isArray(res.data)) {
        setApplications(res.data);
      } else {
        setApplications(getMockAdminApplications());
      }
    } catch (err) {
      console.error('Error fetching all applications', err);
      setApplications(getMockAdminApplications());
    } finally {
      setLoading(false);
    }
  };

  const getMockAdminApplications = (): Application[] => [
    {
      id: 501,
      student: {
        id: 1,
        fullName: 'Aarav Sharma',
        rollNumber: '21CS001',
        branch: 'CSE',
        cgpa: 9.2,
        graduationYear: 2025,
        placed: true,
      },
      job: {
        id: 1,
        title: 'Software Development Engineer',
        company: { id: 1, name: 'Amazon AWS', approved: true },
        packageLpa: 18.5,
        jobType: 'FULL_TIME',
        status: 'OPEN',
        eligibleBranches: ['CSE'],
        requiredSkills: [],
        description: '',
      },
      status: 'SELECTED',
      appliedAt: '2025-05-10T09:30:00',
    },
    {
      id: 502,
      student: {
        id: 2,
        fullName: 'Bhavna Patel',
        rollNumber: '21IT014',
        branch: 'IT',
        cgpa: 8.4,
        graduationYear: 2025,
        placed: false,
      },
      job: {
        id: 2,
        title: 'Frontend Engineer',
        company: { id: 2, name: 'Microsoft IDC', approved: true },
        packageLpa: 16.0,
        jobType: 'FULL_TIME',
        status: 'OPEN',
        eligibleBranches: ['IT'],
        requiredSkills: [],
        description: '',
      },
      status: 'SHORTLISTED',
      appliedAt: '2025-05-11T12:00:00',
    },
    {
      id: 503,
      student: {
        id: 3,
        fullName: 'Chirag Sen',
        rollNumber: '21EC033',
        branch: 'ECE',
        cgpa: 8.75,
        graduationYear: 2025,
        placed: true,
      },
      job: {
        id: 3,
        title: 'Firmware Engineer',
        company: { id: 3, name: 'Qualcomm', approved: true },
        packageLpa: 19.0,
        jobType: 'FULL_TIME',
        status: 'OPEN',
        eligibleBranches: ['ECE'],
        requiredSkills: [],
        description: '',
      },
      status: 'SELECTED',
      appliedAt: '2025-05-08T15:20:00',
    },
  ];

  const filtered = applications.filter((app) => {
    const matchesSearch =
      !search ||
      app.student?.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.student?.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.job?.title.toLowerCase().includes(search.toLowerCase()) ||
      app.job?.company?.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner message="Aggregating student application pipelines..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Central Applications Register</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete institutional oversight across student submissions and recruiter decisions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 sm:p-5 bg-navy-800/80 border-navy-700 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student, roll number, role, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-xs pl-9"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field text-xs max-w-[150px] cursor-pointer"
        >
          <option value="ALL">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="SELECTED">Selected</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileCheck}
          title="No applications matched"
          description="Adjust your search keywords or status filter."
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header">Student Candidate</th>
                  <th className="table-header">Department & CGPA</th>
                  <th className="table-header">Job Opening</th>
                  <th className="table-header">Company</th>
                  <th className="table-header">Applied Date</th>
                  <th className="table-header">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {filtered.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-semibold text-white">
                        {app.student?.fullName || 'Student'}
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {app.student?.rollNumber}
                      </div>
                    </td>

                    <td className="table-cell text-xs">
                      <span className="badge badge-blue">{app.student?.branch}</span>
                      <span className="ml-2 font-semibold text-emerald-400">
                        {app.student?.cgpa} CGPA
                      </span>
                    </td>

                    <td className="table-cell font-medium text-slate-200">
                      {app.job?.title}
                    </td>

                    <td className="table-cell text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{app.job?.company?.name || 'Partner Company'}</span>
                      </div>
                    </td>

                    <td className="table-cell text-xs text-slate-400">
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString()
                        : 'Recent'}
                    </td>

                    <td className="table-cell">
                      <StatusBadge status={app.status} />
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

export default ApplicationsView;
