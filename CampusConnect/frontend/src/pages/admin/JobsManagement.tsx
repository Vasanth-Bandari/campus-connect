import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getJobsApi, cancelJobApi } from '../../api/jobs';
import { Job, JobStatus } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  XCircle,
  Filter,
  Search,
  CheckCircle,
} from 'lucide-react';

export const JobsManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const companyQuery = searchParams.get('company') || '';

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState(companyQuery);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobsApi();
      if (res.data && Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs(getMockAllJobs());
      }
    } catch (err) {
      console.error('Error loading jobs', err);
      setJobs(getMockAllJobs());
    } finally {
      setLoading(false);
    }
  };

  const getMockAllJobs = (): Job[] => [
    {
      id: 1,
      title: 'Software Development Engineer',
      company: { id: 1, name: 'Amazon AWS', approved: true },
      jobType: 'FULL_TIME',
      location: 'Bangalore, India',
      packageLpa: 18.5,
      minCgpa: 8.0,
      graduationYear: 2025,
      applicationDeadline: '2025-06-30',
      status: 'OPEN',
      eligibleBranches: ['CSE', 'IT'],
      requiredSkills: ['Java', 'Cloud'],
      description: 'Distributed cloud systems engineering.',
    },
    {
      id: 2,
      title: 'Frontend Engineer',
      company: { id: 2, name: 'Microsoft IDC', approved: true },
      jobType: 'FULL_TIME',
      location: 'Hyderabad, India',
      packageLpa: 16.0,
      minCgpa: 7.5,
      graduationYear: 2025,
      applicationDeadline: '2025-07-15',
      status: 'OPEN',
      eligibleBranches: ['CSE', 'IT'],
      requiredSkills: ['React', 'TypeScript'],
      description: 'Web engineering for enterprise SaaS suite.',
    },
    {
      id: 3,
      title: 'Embedded Firmware Intern',
      company: { id: 3, name: 'Qualcomm', approved: true },
      jobType: 'INTERNSHIP',
      location: 'Chennai / Bangalore',
      packageLpa: 8.0,
      minCgpa: 7.0,
      graduationYear: 2025,
      applicationDeadline: '2025-05-31',
      status: 'OPEN',
      eligibleBranches: ['ECE', 'EEE'],
      requiredSkills: ['C', 'RTOS'],
      description: 'Modem driver testing and hardware brings.',
    },
    {
      id: 4,
      title: 'Associate Product Manager',
      company: { id: 4, name: 'Flipkart', approved: true },
      jobType: 'FULL_TIME',
      location: 'Bangalore, India',
      packageLpa: 15.0,
      minCgpa: 8.0,
      graduationYear: 2025,
      applicationDeadline: '2025-04-10',
      status: 'CLOSED',
      eligibleBranches: ['CSE', 'IT', 'MECH'],
      requiredSkills: ['SQL', 'Product Strategy'],
      description: 'Supply chain automation features.',
    },
  ];

  const handleCancelJob = async (id: number) => {
    if (!window.confirm('Cancel this job posting across the campus portal?')) {
      return;
    }

    try {
      await cancelJobApi(id);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: 'CANCELLED' as JobStatus } : j))
      );
      setActionMsg('Job posting cancelled.');
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Cancel job error', err);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: 'CANCELLED' as JobStatus } : j))
      );
      setActionMsg('Job posting cancelled (mock mode).');
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  const filtered = jobs.filter((j) => {
    const matchesSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company?.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner message="Auditing institutional job postings..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Institutional Jobs & Openings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor all campus openings, cut-off parameters, and recruiter compliance.
        </p>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Filter bar */}
      <div className="card p-4 sm:p-5 bg-navy-800/80 border-navy-700 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-xs pl-9"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field text-xs max-w-[140px] cursor-pointer"
        >
          <option value="ALL">All Status</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs matching filter"
          description="Adjust your search query or status filter."
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header">Role & Company</th>
                  <th className="table-header">Type & CTC</th>
                  <th className="table-header">Branch & CGPA</th>
                  <th className="table-header">Deadline</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {filtered.map((job) => (
                  <tr key={job.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-semibold text-white">{job.title}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{job.company?.name || 'Company'}</span>
                        <span>•</span>
                        <span>{job.location || 'Pan-India'}</span>
                      </div>
                    </td>

                    <td className="table-cell">
                      <span className="badge badge-blue">{job.jobType.replace('_', ' ')}</span>
                      {job.packageLpa && (
                        <div className="text-xs font-semibold text-emerald-400 mt-1">
                          ₹{job.packageLpa} LPA
                        </div>
                      )}
                    </td>

                    <td className="table-cell text-xs text-slate-300">
                      <div>Min CGPA: {job.minCgpa || '0'}</div>
                      <div className="text-slate-400">
                        {job.eligibleBranches?.join(', ') || 'All Branches'}
                      </div>
                    </td>

                    <td className="table-cell text-xs text-slate-400">
                      {job.applicationDeadline || 'Rolling'}
                    </td>

                    <td className="table-cell">
                      <StatusBadge status={job.status} />
                    </td>

                    <td className="table-cell text-right">
                      {job.status === 'OPEN' && (
                        <button
                          type="button"
                          onClick={() => handleCancelJob(job.id)}
                          className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10"
                        >
                          Cancel Job
                        </button>
                      )}
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

export default JobsManagement;
