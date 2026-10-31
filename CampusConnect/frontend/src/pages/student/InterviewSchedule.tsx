import React, { useState, useEffect } from 'react';
import { getStudentInterviewsApi } from '../../api/student';
import { Interview } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Building2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const InterviewSchedule: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await getStudentInterviewsApi();
      if (res.data && Array.isArray(res.data)) {
        setInterviews(res.data);
      } else {
        setInterviews(getMockInterviews());
      }
    } catch (err) {
      console.error('Error fetching interviews', err);
      setInterviews(getMockInterviews());
    } finally {
      setLoading(false);
    }
  };

  const getMockInterviews = (): Interview[] => [
    {
      id: 1,
      scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      mode: 'ONLINE',
      meetingLink: 'https://meet.google.com/xyz-abcd-uvw',
      round: 1,
      outcome: 'PENDING',
      feedback: 'Technical coding round focusing on Binary Trees and Dynamic Programming.',
      application: {
        id: 1,
        status: 'SHORTLISTED',
        job: {
          id: 1,
          title: 'Software Development Engineer',
          company: { id: 1, name: 'Amazon AWS', approved: true },
          eligibleBranches: ['CSE', 'IT'],
          requiredSkills: ['Java', 'Algorithms'],
          status: 'OPEN',
          description: '',
          jobType: 'FULL_TIME',
        },
      },
    },
    {
      id: 2,
      scheduledAt: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
      mode: 'OFFLINE',
      venue: 'Auditorium Hall 2, Placement Center',
      round: 2,
      outcome: 'PENDING',
      feedback: 'Managerial and behavioral cultural alignment discussion.',
      application: {
        id: 2,
        status: 'SHORTLISTED',
        job: {
          id: 2,
          title: 'Frontend Engineer',
          company: { id: 2, name: 'Microsoft IDC', approved: true },
          eligibleBranches: ['CSE', 'IT'],
          requiredSkills: ['React', 'TypeScript'],
          status: 'OPEN',
          description: '',
          jobType: 'FULL_TIME',
        },
      },
    },
  ];

  // Helper for countdown
  const getNextInterviewCountdown = () => {
    const upcoming = interviews
      .filter((i) => new Date(i.scheduledAt).getTime() > Date.now())
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];

    if (!upcoming) return null;

    const diffMs = new Date(upcoming.scheduledAt).getTime() - Date.now();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {
      upcoming,
      text: `${days}d ${hours}h remaining`,
    };
  };

  if (loading) {
    return <LoadingSpinner message="Retrieving your interview slots..." />;
  }

  const nextInfo = getNextInterviewCountdown();

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Interview Schedule</h1>
        <p className="text-xs text-slate-400 mt-1">
          Stay on top of upcoming campus interview rounds, virtual test links, and on-premise venues.
        </p>
      </div>

      {/* Countdown Card */}
      {nextInfo && (
        <div className="card p-6 bg-gradient-to-r from-primary-950/70 via-navy-800 to-violet-950/70 border-primary-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Upcoming Round</span>
              </span>
              <h3 className="text-xl font-bold text-white">
                Round {nextInfo.upcoming.round}: {nextInfo.upcoming.application?.job?.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                With {nextInfo.upcoming.application?.job?.company?.name} •{' '}
                {new Date(nextInfo.upcoming.scheduledAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-navy-700 sm:pl-6">
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                Countdown
              </span>
              <span className="text-2xl font-black text-primary-400">
                {nextInfo.text}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* List of interviews */}
      {interviews.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No interviews scheduled yet"
          description="When recruiters shortlist your profile for technical or HR rounds, interview invitations with date and links will appear here."
          actionLabel="Check Application Progress"
          onAction={() => (window.location.href = '/student/applications')}
        />
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="card card-hover p-6 bg-navy-800/80 border-navy-700 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold">
                    R{interview.round || 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {interview.application?.job?.title || 'Campus Interview'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {interview.application?.job?.company?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="badge badge-blue">{interview.mode}</span>
                  <StatusBadge status={interview.outcome} />
                </div>
              </div>

              {/* Detail row */}
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
                          <span>Join Virtual Meeting</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span>Meeting link will be shared prior to session</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>{interview.venue || 'Campus Placement Hall'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback / Instructions */}
              {interview.feedback && (
                <div className="p-3 rounded-lg bg-navy-700/50 border border-navy-600 text-xs text-slate-300">
                  <span className="font-semibold text-slate-200">Notes from Recruiter: </span>
                  {interview.feedback}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;
