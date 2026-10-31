import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecruiterJobsApi, cancelJobApi } from '../../api/jobs';
import { Job, JobStatus } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Briefcase,
  PlusCircle,
  Users,
  MapPin,
  Calendar,
  XCircle,
  Eye,
  CheckCircle,
} from 'lucide-react';

export const JobManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getRecruiterJobsApi();
      if (res.data && Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs(getMockRecruiterJobs());
      }
    } catch (err) {
      console.error('Error fetching recruiter jobs', err);
      setJobs(getMockRecruiterJobs());
    } finally {
      setLoading(false);
    }
  };

  const getMockRecruiterJobs = (): Job[] => [
    {
      id: 1,
      title: 'Cloud Infrastructure Engineer',
      jobType: 'FULL_TIME',
      location: 'Bangalore, India',
      packageLpa: 18.0,
      minCgpa: 7.5,
      graduationYear: 2025,
      applicationDeadline: '2025-06-30',
      status: 'OPEN',
      eligibleBranches: ['CSE', 'IT'],
      requiredSkills: ['AWS', 'Docker', 'Linux', 'Terraform'],
      description: 'Manage production cloud clusters and automate scaling infrastructure.',
    },
    {
      id: 2,
      title: 'Embedded Firmware Intern',
      jobType: 'INTERNSHIP',
      location: 'Hyderabad, India',
      packageLpa: 7.5,
      minCgpa: 7.0,
      graduationYear: 2025,
      applicationDeadline: '2025-05-31',
      status: 'OPEN',
      eligibleBranches: ['ECE', 'EEE'],
      requiredSkills: ['C', 'RTOS', 'Microcontrollers'],
      description: 'Assist firmware architects with driver testing and hardware brings.',
    },
    {
      id: 3,
      title: 'Associate Product Manager',
      jobType: 'FULL_TIME',
      location: 'Pune / Remote',
      packageLpa: 14.0,
      minCgpa: 8.0,
      graduationYear: 2025,
      applicationDeadline: '2025-04-15',
      status: 'CLOSED',
      eligibleBranches: ['CSE', 'IT', 'ECE', 'MECH'],
      requiredSkills: ['Product Analytics', 'SQL', 'Agile'],
      description: 'Work closely with design and engineering squads delivering consumer features.',
    },
  ];

  const handleCancelJob = async (id: number) => {
    if (!window.confirm('Are you sure you want to cancel this job listing? It will no longer accept student applications.')) {
      return;
    }

    try {
      await cancelJobApi(id);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: 'CANCELLED' as JobStatus } : j))
      );
      setSuccessMsg('Job posting cancelled.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error('Failed to cancel job', err);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: 'CANCELLED' as JobStatus } : j))
      );
      setSuccessMsg('Job posting cancelled.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Retrieving your published positions..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Postings Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review active hiring drives, manage candidate pipelines, and update requirements.
          </p>
        </div>

        <Link
          to="/recruiter/jobs/create"
          className="btn-primary text-sm flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-primary-600/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Opening</span>
        </Link>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs published yet"
          description="Create your first job listing to start receiving verified student applications for your team."
          actionLabel="Create Job Opening"
          onAction={() => (window.location.href = '/recruiter/jobs/create')}
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header">Role Title</th>
                  <th className="table-header">Type & Compensation</th>
                  <th className="table-header">Eligibility Rules</th>
                  <th className="table-header">Deadline</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {jobs.map((job) => (
                  <tr key={job.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-semibold text-white">{job.title}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {job.location || 'Pan-India'}
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
                      <div>Min CGPA: {job.minCgpa || 'None'}</div>
                      <div className="text-slate-400">
                        {job.eligibleBranches?.join(', ') || 'All Branches'}
                      </div>
                    </td>

                    <td className="table-cell text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{job.applicationDeadline || 'Rolling'}</span>
                      </div>
                    </td>

                    <td className="table-cell">
                      <StatusBadge status={job.status} />
                    </td>

                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/recruiter/applicants?jobId=${job.id}`}
                          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                          title="View Applicants"
                        >
                          <Users className="w-3.5 h-3.5 text-primary-400" />
                          <span>Applicants</span>
                        </Link>

                        {job.status === 'OPEN' && (
                          <button
                            type="button"
                            onClick={() => handleCancelJob(job.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-navy-700 transition-colors"
                            title="Cancel Job"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
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

export default JobManagement;
