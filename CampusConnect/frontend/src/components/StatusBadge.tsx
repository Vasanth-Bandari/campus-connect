import React from 'react';
import { ApplicationStatus, JobStatus, InterviewOutcome, DriveStatus } from '../types';

interface StatusBadgeProps {
  status: ApplicationStatus | JobStatus | InterviewOutcome | DriveStatus | string | boolean;
  type?: 'application' | 'job' | 'interview' | 'drive' | 'boolean' | 'custom';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'application' }) => {
  if (typeof status === 'boolean') {
    return status ? (
      <span className="badge badge-green">Active</span>
    ) : (
      <span className="badge badge-red">Inactive</span>
    );
  }

  const strStatus = String(status).toUpperCase();

  switch (strStatus) {
    // Application Statuses
    case 'APPLIED':
      return <span className="badge badge-blue">Applied</span>;
    case 'SHORTLISTED':
      return <span className="badge badge-violet">Shortlisted</span>;
    case 'SELECTED':
      return <span className="badge badge-green">Selected</span>;
    case 'REJECTED':
      return <span className="badge badge-red">Rejected</span>;
    case 'WITHDRAWN':
      return <span className="badge bg-slate-700/60 text-slate-300">Withdrawn</span>;

    // Job Statuses
    case 'OPEN':
      return <span className="badge badge-green">Open</span>;
    case 'CLOSED':
      return <span className="badge badge-yellow">Closed</span>;
    case 'DRAFT':
      return <span className="badge bg-slate-700 text-slate-300">Draft</span>;
    case 'CANCELLED':
      return <span className="badge badge-red">Cancelled</span>;

    // Interview Outcomes
    case 'PENDING':
      return <span className="badge badge-yellow">Pending</span>;
    case 'PASSED':
      return <span className="badge badge-green">Passed</span>;
    case 'FAILED':
      return <span className="badge badge-red">Failed</span>;

    // Drive Statuses
    case 'UPCOMING':
      return <span className="badge badge-blue">Upcoming</span>;
    case 'ONGOING':
      return <span className="badge badge-violet">Ongoing</span>;
    case 'COMPLETED':
      return <span className="badge badge-green">Completed</span>;

    // Approvals
    case 'APPROVED':
      return <span className="badge badge-green">Approved</span>;

    default:
      return <span className="badge bg-navy-700 text-slate-300">{status}</span>;
  }
};

export default StatusBadge;
