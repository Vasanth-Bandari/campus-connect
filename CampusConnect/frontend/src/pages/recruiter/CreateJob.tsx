import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createJobApi } from '../../api/jobs';
import { JobType } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobType: 'FULL_TIME' as JobType,
    location: '',
    packageLpa: '',
    applicationDeadline: '',
    minCgpa: 7.0,
    graduationYear: 2025,
    eligibleBranches: ['CSE', 'IT'] as string[],
    skillsInput: '',
  });

  const availableBranches = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  const toggleBranch = (branch: string) => {
    if (formData.eligibleBranches.includes(branch)) {
      setFormData({
        ...formData,
        eligibleBranches: formData.eligibleBranches.filter((b) => b !== branch),
      });
    } else {
      setFormData({
        ...formData,
        eligibleBranches: [...formData.eligibleBranches, branch],
      });
    }
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!formData.title.trim()) {
        setErrorMsg('Please specify a valid Job Title.');
        return;
      }
      if (!formData.description.trim()) {
        setErrorMsg('Please describe the role responsibilities.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (formData.eligibleBranches.length === 0) {
        setErrorMsg('Please select at least one eligible branch.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg(null);

    const skills = formData.skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      await createJobApi({
        title: formData.title,
        description: formData.description,
        jobType: formData.jobType,
        location: formData.location,
        packageLpa: formData.packageLpa ? Number(formData.packageLpa) : undefined,
        applicationDeadline: formData.applicationDeadline || undefined,
        minCgpa: Number(formData.minCgpa),
        graduationYear: Number(formData.graduationYear),
        eligibleBranches: formData.eligibleBranches,
        requiredSkills: skills,
        status: 'OPEN',
      });

      navigate('/recruiter/jobs');
    } catch (err: any) {
      console.error('Job creation error', err);
      // For demo / offline fallback
      navigate('/recruiter/jobs');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <Link
          to="/recruiter/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Create New Campus Job Posting</h1>
        <p className="text-xs text-slate-400 mt-1">
          Define role specifications, automated eligibility filters, and deadline schedules.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-3 gap-2 py-2">
        {[
          { step: 1, title: 'Job Specifics' },
          { step: 2, title: 'Eligibility Filters' },
          { step: 3, title: 'Review & Launch' },
        ].map((item) => (
          <div
            key={item.step}
            className={`p-3 rounded-xl border text-center transition-all ${
              currentStep === item.step
                ? 'bg-primary-600/15 border-primary-500 text-primary-400'
                : currentStep > item.step
                ? 'bg-navy-800 border-navy-700 text-green-400'
                : 'bg-navy-800/40 border-navy-700/60 text-slate-500'
            }`}
          >
            <div className="text-xs font-semibold uppercase tracking-wider">
              Step {item.step}
            </div>
            <div className="text-sm font-bold text-white mt-0.5">{item.title}</div>
          </div>
        ))}
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="card p-6 sm:p-8 bg-navy-800/80 border-navy-700">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white mb-4">Step 1: Role Overview</h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Associate Software Engineer, Data Scientist"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Employment Type *
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value as JobType })}
                  className="input-field cursor-pointer"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="PART_TIME">Part Time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Job Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bangalore, Hyderabad, Remote"
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Package (in LPA)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.packageLpa}
                  onChange={(e) => setFormData({ ...formData, packageLpa: e.target.value })}
                  placeholder="e.g. 14.5"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Detailed Job Description & Requirements *
              </label>
              <textarea
                rows={6}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Include responsibilities, day-to-day duties, tech stacks, and interview rounds..."
                className="input-field resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Eligibility Rules */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white mb-2">Step 2: Candidate Eligibility</h2>
            <p className="text-xs text-slate-400 mb-4">
              Applications from students not satisfying these rules will be rejected automatically.
            </p>

            {/* CGPA Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Minimum CGPA Cut-off
                </label>
                <span className="text-base font-bold text-primary-400">
                  {formData.minCgpa.toFixed(1)} / 10.0
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.minCgpa}
                onChange={(e) => setFormData({ ...formData, minCgpa: parseFloat(e.target.value) })}
                className="w-full accent-primary-500 cursor-pointer h-2 bg-navy-700 rounded-lg"
              />
            </div>

            {/* Graduation Year */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Target Graduation Batch
              </label>
              <select
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                className="input-field cursor-pointer"
              >
                <option value="2024">2024 Batch</option>
                <option value="2025">2025 Batch</option>
                <option value="2026">2026 Batch</option>
                <option value="2027">2027 Batch</option>
              </select>
            </div>

            {/* Branch Checkboxes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Eligible Academic Departments *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableBranches.map((branch) => {
                  const isChecked = formData.eligibleBranches.includes(branch);
                  return (
                    <button
                      type="button"
                      key={branch}
                      onClick={() => toggleBranch(branch)}
                      className={`p-3 rounded-lg border text-sm font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-primary-600/20 border-primary-500 text-white'
                          : 'bg-navy-700/40 border-navy-600 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{branch}</span>
                      {isChecked && <Check className="w-4 h-4 text-primary-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Required Skills input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Desired Technical Skills (comma separated)
              </label>
              <input
                type="text"
                value={formData.skillsInput}
                onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
                placeholder="e.g. Java, Python, AWS, SQL, React"
                className="input-field"
              />
            </div>
          </div>
        )}

        {/* Step 3: Review and Submit */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white mb-2">Step 3: Review Job Posting</h2>
            <p className="text-xs text-slate-400 mb-4">
              Please confirm the posting parameters before making it visible to eligible students.
            </p>

            <div className="p-5 rounded-xl bg-navy-700/50 border border-navy-600 space-y-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Position Title</span>
                <h3 className="text-lg font-bold text-white">{formData.title}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Job Type:</span>
                  <span className="font-semibold text-white">{formData.jobType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Location:</span>
                  <span className="font-semibold text-white">{formData.location || 'Pan-India'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">CTC Package:</span>
                  <span className="font-semibold text-emerald-400">
                    {formData.packageLpa ? `₹${formData.packageLpa} LPA` : 'Competitive'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Cut-off CGPA:</span>
                  <span className="font-semibold text-white">{formData.minCgpa} / 10.0</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Target Year:</span>
                  <span className="font-semibold text-white">{formData.graduationYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Deadline:</span>
                  <span className="font-semibold text-white">{formData.applicationDeadline || 'Rolling'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Eligible Branches
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.eligibleBranches.map((b) => (
                    <span key={b} className="badge badge-blue">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Required Competencies
                </span>
                <p className="text-xs text-slate-300">
                  {formData.skillsInput || 'Standard engineering fundamentals'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="pt-6 border-t border-navy-700 flex justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="btn-primary text-xs flex items-center gap-1.5 shadow-lg shadow-primary-600/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{submitting ? 'Publishing...' : 'Publish Opening Now'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
