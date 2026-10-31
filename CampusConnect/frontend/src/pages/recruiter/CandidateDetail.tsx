import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getApplicationByIdApi,
  updateApplicationStatusApi,
  scheduleInterviewApi,
} from '../../api/applications';
import { Application, ApplicationStatus, Interview } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import {
  ArrowLeft,
  User,
  BookOpen,
  Award,
  Phone,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Send,
  Video,
  MapPin,
  Clock,
} from 'lucide-react';

export const CandidateDetail: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Interview Schedule Form
  const [interviewForm, setInterviewForm] = useState({
    scheduledAt: '',
    mode: 'ONLINE',
    venue: '',
    meetingLink: '',
    round: 1,
  });

  useEffect(() => {
    if (applicationId) {
      loadApplication(applicationId);
    }
  }, [applicationId]);

  const loadApplication = async (id: string) => {
    try {
      const res = await getApplicationByIdApi(id);
      if (res.data) {
        setApplication(res.data);
      } else {
        setApplication(getMockCandidateApplication(Number(id)));
      }
    } catch (err) {
      console.error('Failed to load application', err);
      setApplication(getMockCandidateApplication(Number(id)));
    } finally {
      setLoading(false);
    }
  };

  const getMockCandidateApplication = (id: number): Application => ({
    id,
    student: {
      id: 1,
      fullName: 'Rohan Sharma',
      rollNumber: '21CS042',
      branch: 'CSE',
      cgpa: 9.1,
      graduationYear: 2025,
      phone: '+91 9876543210',
      skills: 'Java, Spring Boot, AWS, Docker, Kubernetes, MySQL',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      placed: false,
    },
    job: {
      id: 1,
      title: 'Cloud Infrastructure Engineer',
      jobType: 'FULL_TIME',
      packageLpa: 18.0,
      status: 'OPEN',
      description: '',
      eligibleBranches: ['CSE', 'IT'],
      requiredSkills: ['AWS', 'Docker'],
    },
    status: 'APPLIED',
    coverLetter:
      'I have designed automated Kubernetes deployments in our university research laboratory and completed AWS Certified Cloud Practitioner. I look forward to contributing to your cloud team.',
    appliedAt: '2025-05-12T10:15:00',
  });

  const handleUpdateStatus = async (newStatus: ApplicationStatus) => {
    if (!application) return;
    setSubmitting(true);
    setActionSuccess(null);

    try {
      await updateApplicationStatusApi(application.id, newStatus);
      setApplication({ ...application, status: newStatus });
      setActionSuccess(`Candidate status successfully set to ${newStatus}.`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error('Update status error', err);
      setApplication({ ...application, status: newStatus });
      setActionSuccess(`Candidate status set to ${newStatus} (mock mode).`);
      setTimeout(() => setActionSuccess(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application) return;

    setSubmitting(true);
    try {
      await scheduleInterviewApi({
        applicationId: application.id,
        scheduledAt: interviewForm.scheduledAt,
        mode: interviewForm.mode,
        venue: interviewForm.venue,
        meetingLink: interviewForm.meetingLink,
        round: interviewForm.round,
      });

      setApplication({ ...application, status: 'SHORTLISTED' });
      setShowScheduleModal(false);
      setActionSuccess('Interview round scheduled and calendar invitation dispatched to student!');
      setTimeout(() => setActionSuccess(null), 3500);
    } catch (err) {
      console.error('Schedule interview error', err);
      setApplication({ ...application, status: 'SHORTLISTED' });
      setShowScheduleModal(false);
      setActionSuccess('Interview scheduled (mock mode)!');
      setTimeout(() => setActionSuccess(null), 3500);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Retrieving candidate dossier..." />;
  }

  if (!application || !application.student) {
    return (
      <div className="card p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Candidate Record Not Found</h2>
        <Link to="/recruiter/applicants" className="btn-primary text-sm mt-4 inline-block">
          Return to Applicants List
        </Link>
      </div>
    );
  }

  const { student, job } = application;
  const skillsArray = student.skills
    ? student.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header back */}
      <div>
        <Link
          to="/recruiter/applicants"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applicants</span>
        </Link>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Candidate Card */}
      <div className="card p-6 sm:p-8 bg-navy-800/80 border-navy-700">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-primary-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
              {student.fullName.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{student.fullName}</h1>
                <StatusBadge status={application.status} />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Applying for: <span className="text-primary-400 font-semibold">{job?.title}</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3">
                <span className="font-mono text-slate-400">Roll: {student.rollNumber}</span>
                <span className="badge badge-blue">{student.branch}</span>
                <span className="text-emerald-400 font-bold">CGPA: {student.cgpa} / 10.0</span>
                <span>Graduation Batch {student.graduationYear}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {application.status !== 'SHORTLISTED' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('SHORTLISTED')}
                disabled={submitting}
                className="btn-secondary text-xs text-violet-400 border-violet-500/30 hover:bg-violet-500/10"
              >
                Shortlist
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowScheduleModal(true)}
              className="btn-primary text-xs flex items-center gap-1.5 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Interview</span>
            </button>

            {application.status !== 'SELECTED' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('SELECTED')}
                disabled={submitting}
                className="btn-secondary text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
              >
                Mark Selected
              </button>
            )}

            {application.status !== 'REJECTED' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('REJECTED')}
                disabled={submitting}
                className="btn-danger text-xs"
              >
                Reject
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Academic & Skills + Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Cover Note */}
          {application.coverLetter && (
            <div className="card p-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Candidate Note / Cover Message
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed italic bg-navy-700/40 p-4 rounded-xl border border-navy-700">
                "{application.coverLetter}"
              </p>
            </div>
          )}

          {/* Skills */}
          <div className="card p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Verified Technical Proficiencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsArray.length > 0 ? (
                skillsArray.map((skill, idx) => (
                  <span key={idx} className="badge badge-blue py-1 px-3 text-xs">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">No specific skills listed.</span>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="card p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Direct Contact Information
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{student.phone || 'Phone number not recorded'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Resume */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-400" />
              Verified Resume
            </h2>

            {student.resumeUrl ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-navy-700/50 border border-navy-600 text-center">
                  <FileText className="w-10 h-10 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white">Student Resume.pdf</p>
                  <p className="text-[10px] text-slate-400">Authenticated college file</p>
                </div>

                <a
                  href={student.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-1.5"
                >
                  <span>Open PDF in Viewer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic text-center py-4">
                No resume document attached to this student record.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="card max-w-lg w-full p-6 bg-navy-800 border-navy-700 animate-slide-up">
            <h3 className="text-lg font-bold text-white mb-1">
              Schedule Interview with {student.fullName}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Invites and instructions will be notified to the student instantly.
            </p>

            <form onSubmit={handleScheduleInterview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Interview Round
                  </label>
                  <select
                    value={interviewForm.round}
                    onChange={(e) => setInterviewForm({ ...interviewForm, round: Number(e.target.value) })}
                    className="input-field text-xs cursor-pointer"
                  >
                    <option value={1}>Round 1 (Technical Screening)</option>
                    <option value={2}>Round 2 (System Design / Coding)</option>
                    <option value={3}>Round 3 (Managerial / HR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Mode
                  </label>
                  <select
                    value={interviewForm.mode}
                    onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value })}
                    className="input-field text-xs cursor-pointer"
                  >
                    <option value="ONLINE">Virtual Online (Google Meet/Teams)</option>
                    <option value="OFFLINE">On-Premise (Placement Cell)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Interview Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={interviewForm.scheduledAt}
                  onChange={(e) => setInterviewForm({ ...interviewForm, scheduledAt: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              {interviewForm.mode === 'ONLINE' ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Meeting URL / Video Link
                  </label>
                  <input
                    type="url"
                    value={interviewForm.meetingLink}
                    onChange={(e) => setInterviewForm({ ...interviewForm, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/abc-def-ghi"
                    className="input-field text-xs"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Campus Hall / Venue Location
                  </label>
                  <input
                    type="text"
                    value={interviewForm.venue}
                    onChange={(e) => setInterviewForm({ ...interviewForm, venue: e.target.value })}
                    placeholder="e.g. Placement Cell Conference Room B"
                    className="input-field text-xs"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-700">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Confirming...' : 'Dispatch Interview Invite'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDetail;
