import React, { useState, useEffect } from 'react';
import { getRecruiterInterviewsApi, updateInterviewOutcomeApi } from '../../api/applications';
import { Interview, InterviewOutcome } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  ExternalLink,
  MessageSquare,
  Filter,
} from 'lucide-react';

export const InterviewManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [outcomeFilter, setOutcomeFilter] = useState('ALL');
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await getRecruiterInterviewsApi();
      if (res.data && Array.isArray(res.data)) {
        setInterviews(res.data);
      } else {
        setInterviews(getMockRecruiterInterviews());
      }
    } catch (err) {
      console.error('Error fetching recruiter interviews', err);
      setInterviews(getMockRecruiterInterviews());
    } finally {
      setLoading(false);
    }
  };

  const getMockRecruiterInterviews = (): Interview[] => [
    {
      id: 301,
      scheduledAt: new Date(Date.now() + 86400000 * 1).toISOString(),
      mode: 'ONLINE',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      round: 1,
      outcome: 'PENDING',
      feedback: 'Candidate demonstrated strong grasp of multithreading in Java.',
      application: {
        id: 101,
        status: 'SHORTLISTED',
        job: {
          id: 1,
          title: 'Cloud Infrastructure Engineer',
          jobType: 'FULL_TIME',
          status: 'OPEN',
          description: '',
          eligibleBranches: ['CSE'],
          requiredSkills: [],
        },
        student: {
          id: 1,
          fullName: 'Rohan Sharma',
          rollNumber: '21CS042',
          branch: 'CSE',
          cgpa: 9.1,
          graduationYear: 2025,
          placed: false,
        },
      },
    },
    {
      id: 302,
      scheduledAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      mode: 'OFFLINE',
      venue: 'Interview Room 3',
      round: 2,
      outcome: 'PASSED',
      feedback: 'Excellent problem solving and communication. Advanced to selection.',
      application: {
        id: 102,
        status: 'SELECTED',
        job: {
          id: 1,
          title: 'Cloud Infrastructure Engineer',
          jobType: 'FULL_TIME',
          status: 'OPEN',
          description: '',
          eligibleBranches: ['CSE'],
          requiredSkills: [],
        },
        student: {
          id: 2,
          fullName: 'Deepika Iyer',
          rollNumber: '21IT023',
          branch: 'IT',
          cgpa: 8.65,
          graduationYear: 2025,
          placed: false,
        },
      },
    },
  ];

  const handleUpdateOutcome = async (
    id: number,
    outcome: InterviewOutcome,
    feedback?: string
  ) => {
    try {
      await updateInterviewOutcomeApi(id, outcome, feedback);
      setInterviews((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, outcome, feedback: feedback || item.feedback } : item
        )
      );
      setActionMsg(`Interview outcome updated to ${outcome}.`);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Update outcome error', err);
      setInterviews((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, outcome, feedback: feedback || item.feedback } : item
        )
      );
      setActionMsg(`Interview outcome updated to ${outcome} (mock mode).`);
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  const filtered = interviews.filter((i) => {
    if (outcomeFilter === 'ALL') return true;
    return i.outcome === outcomeFilter;
  });

  if (loading) {
    return <LoadingSpinner message="Loading interview coordinator schedules..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Interview Coordination</h1>
          <p className="text-xs text-slate-400 mt-1">
            Conduct multi-stage technical and behavioral interviews, submit evaluation notes, and record candidate outcomes.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="input-field text-xs py-2 max-w-[150px] cursor-pointer"
          >
            <option value="ALL">All Outcomes</option>
            <option value="PENDING">Pending</option>
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No interview sessions found"
          description="Schedule candidate interviews from the Applicants list to track outcomes here."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((interview) => (
            <div
              key={interview.id}
              className="card p-6 bg-navy-800/80 border-navy-700 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center font-bold text-white text-base">
                    R{interview.round || 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {interview.application?.student?.fullName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {interview.application?.student?.rollNumber} • {interview.application?.student?.branch} • {interview.application?.job?.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="badge badge-blue">{interview.mode}</span>
                  <StatusBadge status={interview.outcome} />
                </div>
              </div>

              {/* Schedule and Link Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2 border-t border-navy-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>
                    {new Date(interview.scheduledAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>

                <div>
                  {interview.mode === 'ONLINE' ? (
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-primary-400" />
                      {interview.meetingLink ? (
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:underline flex items-center gap-1"
                        >
                          <span>Launch Video Call</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span>No link provided</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>{interview.venue || 'Placement Office'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback notes */}
              {interview.feedback && (
                <div className="p-3 rounded-lg bg-navy-700/40 border border-navy-700 text-xs text-slate-300 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{interview.feedback}</span>
                </div>
              )}

              {/* Outcome Update Action Buttons */}
              <div className="pt-2 border-t border-navy-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Update Outcome:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateOutcome(interview.id, 'PASSED')}
                    className="btn-secondary text-xs py-1 px-3 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                  >
                    Mark Passed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateOutcome(interview.id, 'FAILED')}
                    className="btn-secondary text-xs py-1 px-3 text-red-400 border-red-500/30 hover:bg-red-500/10"
                  >
                    Mark Failed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateOutcome(interview.id, 'CANCELLED')}
                    className="btn-secondary text-xs py-1 px-3 text-slate-400 hover:text-white"
                  >
                    Cancel Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewManagement;
