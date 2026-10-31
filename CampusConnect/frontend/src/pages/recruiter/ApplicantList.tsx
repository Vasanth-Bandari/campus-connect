import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getRecruiterJobsApi } from '../../api/jobs';
import {
  getJobApplicationsApi,
  getAllApplicationsApi,
  bulkUpdateApplicationStatusApi,
} from '../../api/applications';
import { Job, Application, ApplicationStatus } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Users,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  CheckSquare,
  Square,
  Search,
} from 'lucide-react';

export const ApplicantList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialJobId = searchParams.get('jobId') || '';

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobId);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    loadApplications();
  }, [selectedJobId]);

  const loadJobs = async () => {
    try {
      const res = await getRecruiterJobsApi();
      if (res.data && Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs([
          { id: 1, title: 'Cloud Infrastructure Engineer', jobType: 'FULL_TIME', status: 'OPEN', description: '', eligibleBranches: ['CSE'], requiredSkills: [] },
          { id: 2, title: 'Firmware Engineer', jobType: 'FULL_TIME', status: 'OPEN', description: '', eligibleBranches: ['ECE'], requiredSkills: [] },
        ]);
      }
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  };

  const loadApplications = async () => {
    setLoading(true);
    try {
      if (selectedJobId) {
        const res = await getJobApplicationsApi(selectedJobId);
        if (res.data && Array.isArray(res.data)) {
          setApplications(res.data);
        } else {
          setApplications(getMockApplicants());
        }
      } else {
        const res = await getAllApplicationsApi();
        if (res.data && Array.isArray(res.data)) {
          setApplications(res.data);
        } else {
          setApplications(getMockApplicants());
        }
      }
    } catch (err) {
      console.error('Error fetching applicants', err);
      setApplications(getMockApplicants());
    } finally {
      setLoading(false);
    }
  };

  const getMockApplicants = (): Application[] => [
    {
      id: 201,
      student: {
        id: 1,
        fullName: 'Rohan Sharma',
        rollNumber: '21CS042',
        branch: 'CSE',
        cgpa: 9.1,
        graduationYear: 2025,
        phone: '+91 9876543210',
        skills: 'Java, AWS, Kubernetes',
        placed: false,
      },
      job: {
        id: 1,
        title: 'Cloud Infrastructure Engineer',
        jobType: 'FULL_TIME',
        status: 'OPEN',
        description: '',
        eligibleBranches: ['CSE'],
        requiredSkills: [],
      },
      status: 'SHORTLISTED',
      appliedAt: '2025-05-10T11:00:00',
    },
    {
      id: 202,
      student: {
        id: 2,
        fullName: 'Deepika Iyer',
        rollNumber: '21IT023',
        branch: 'IT',
        cgpa: 8.65,
        graduationYear: 2025,
        phone: '+91 9876543211',
        skills: 'Python, Docker, Terraform',
        placed: false,
      },
      job: {
        id: 1,
        title: 'Cloud Infrastructure Engineer',
        jobType: 'FULL_TIME',
        status: 'OPEN',
        description: '',
        eligibleBranches: ['IT'],
        requiredSkills: [],
      },
      status: 'APPLIED',
      appliedAt: '2025-05-12T14:30:00',
    },
    {
      id: 203,
      student: {
        id: 3,
        fullName: 'Manish Kumar',
        rollNumber: '21CS099',
        branch: 'CSE',
        cgpa: 7.8,
        graduationYear: 2025,
        phone: '+91 9876543212',
        skills: 'Linux, Go, PostgreSQL',
        placed: false,
      },
      job: {
        id: 1,
        title: 'Cloud Infrastructure Engineer',
        jobType: 'FULL_TIME',
        status: 'OPEN',
        description: '',
        eligibleBranches: ['CSE'],
        requiredSkills: [],
      },
      status: 'APPLIED',
      appliedAt: '2025-05-13T09:15:00',
    },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkAction = async (status: ApplicationStatus) => {
    if (selectedIds.length === 0) return;

    try {
      await bulkUpdateApplicationStatusApi(selectedIds, status);
      setApplications((prev) =>
        prev.map((app) =>
          selectedIds.includes(app.id) ? { ...app, status } : app
        )
      );
      setActionMsg(`Updated ${selectedIds.length} candidate(s) to ${status}.`);
      setSelectedIds([]);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Bulk update error', err);
      setApplications((prev) =>
        prev.map((app) =>
          selectedIds.includes(app.id) ? { ...app, status } : app
        )
      );
      setActionMsg(`Updated ${selectedIds.length} candidate(s) to ${status} (mock mode).`);
      setSelectedIds([]);
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      app.student?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student?.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student?.branch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner message="Filtering applicant resumes..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Candidate Applications</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review eligible candidates, conduct bulk shortlisting, and schedule technical rounds.
          </p>
        </div>

        {/* Job Selection Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="input-field text-xs py-2 cursor-pointer max-w-[260px]"
          >
            <option value="">All Job Positions</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Filter and Bulk Bar */}
      <div className="card p-4 sm:p-5 bg-navy-800/80 border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field text-xs pl-9 py-2"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field text-xs py-2 max-w-[130px] cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Bulk Action Buttons */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-semibold mr-1">
              {selectedIds.length} selected:
            </span>
            <button
              type="button"
              onClick={() => handleBulkAction('SHORTLISTED')}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 text-violet-400 border-violet-500/30"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Shortlist</span>
            </button>
            <button
              type="button"
              onClick={() => handleBulkAction('REJECTED')}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 text-red-400 border-red-500/30"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No candidates found"
          description="There are currently no candidate applications matching the chosen job or filter settings."
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header w-10">
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="text-slate-400 hover:text-white"
                    >
                      {selectedIds.length === filteredApplications.length ? (
                        <CheckSquare className="w-4 h-4 text-primary-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="table-header">Student Candidate</th>
                  <th className="table-header">Roll & Branch</th>
                  <th className="table-header">CGPA</th>
                  <th className="table-header">Applied Role</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td className="table-cell">
                      <button
                        type="button"
                        onClick={() => toggleSelectOne(app.id)}
                        className="text-slate-400 hover:text-white"
                      >
                        {selectedIds.includes(app.id) ? (
                          <CheckSquare className="w-4 h-4 text-primary-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    <td className="table-cell">
                      <div className="font-semibold text-white">
                        {app.student?.fullName || 'Student'}
                      </div>
                      <div className="text-xs text-slate-400">
                        Batch {app.student?.graduationYear}
                      </div>
                    </td>

                    <td className="table-cell text-xs">
                      <span className="font-mono text-slate-300">
                        {app.student?.rollNumber}
                      </span>
                      <span className="badge badge-blue ml-2">{app.student?.branch}</span>
                    </td>

                    <td className="table-cell font-bold text-emerald-400">
                      {app.student?.cgpa}
                    </td>

                    <td className="table-cell text-xs text-slate-300">
                      {app.job?.title}
                    </td>

                    <td className="table-cell">
                      <StatusBadge status={app.status} />
                    </td>

                    <td className="table-cell text-right">
                      <Link
                        to={`/recruiter/applicants/${app.id}`}
                        className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 hover:text-primary-400"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </Link>
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

export default ApplicantList;
