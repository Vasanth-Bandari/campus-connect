import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { registerStudentApi, registerRecruiterApi } from '../../api/auth';
import {
  Briefcase,
  GraduationCap,
  Building2,
  Lock,
  Mail,
  User,
  Phone,
  Hash,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'student' | 'recruiter'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'recruiter') {
      setActiveTab('recruiter');
    } else {
      setActiveTab('student');
    }
  }, [searchParams]);

  // Student form state
  const [studentForm, setStudentForm] = useState({
    fullName: '',
    email: '',
    rollNumber: '',
    branch: 'CSE',
    cgpa: '',
    graduationYear: new Date().getFullYear(),
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Recruiter form state
  const [recruiterForm, setRecruiterForm] = useState({
    fullName: '',
    email: '',
    companyName: '',
    designation: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (studentForm.password !== studentForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const cgpaNum = parseFloat(studentForm.cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setError('Please provide a valid CGPA between 0.0 and 10.0');
      return;
    }

    setLoading(true);
    try {
      await registerStudentApi({
        fullName: studentForm.fullName,
        email: studentForm.email,
        password: studentForm.password,
        rollNumber: studentForm.rollNumber.trim().toUpperCase(),
        branch: studentForm.branch,
        cgpa: cgpaNum,
        graduationYear: Number(studentForm.graduationYear),
        phone: studentForm.phone,
      });

      navigate('/login', {
        state: { message: 'Registration successful! You can now log in with your credentials.' },
      });
    } catch (err: any) {
      console.error('Registration failed', err);
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please check inputs.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRecruiterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (recruiterForm.password !== recruiterForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerRecruiterApi({
        fullName: recruiterForm.fullName,
        email: recruiterForm.email,
        password: recruiterForm.password,
        companyName: recruiterForm.companyName,
        designation: recruiterForm.designation,
        phone: recruiterForm.phone,
      });

      navigate('/login', {
        state: { message: 'Recruiter account registered! Awaiting administration approval before full job posting access.' },
      });
    } catch (err: any) {
      console.error('Recruiter registration failed', err);
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please check inputs.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <Link to="/" className="flex items-center justify-center gap-3 mb-6 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-primary-400 bg-clip-text text-transparent">
            Campus<span className="text-primary-500">Connect</span>
          </span>
        </Link>

        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400 mb-8">
          Join our university recruitment network
        </p>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1.5 bg-navy-800 border border-navy-700 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveTab('student');
              setError(null);
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'student'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Registration</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('recruiter');
              setError(null);
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'recruiter'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Recruiter Registration</span>
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="card p-8 shadow-2xl backdrop-blur-md bg-navy-800/80 border-navy-700/80">
          {activeTab === 'student' ? (
            /* Student Form */
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={studentForm.fullName}
                    onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    College Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      placeholder="student@univ.edu"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Roll / Reg. Number *
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={studentForm.rollNumber}
                      onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                      placeholder="e.g. 21CS042"
                      className="input-field pl-10 uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Branch *
                  </label>
                  <select
                    value={studentForm.branch}
                    onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })}
                    className="input-field cursor-pointer"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    CGPA (0 - 10) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={studentForm.cgpa}
                    onChange={(e) => setStudentForm({ ...studentForm, cgpa: e.target.value })}
                    placeholder="8.50"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Graduation Year *
                  </label>
                  <select
                    value={studentForm.graduationYear}
                    onChange={(e) => setStudentForm({ ...studentForm, graduationYear: Number(e.target.value) })}
                    className="input-field cursor-pointer"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="tel"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={studentForm.confirmPassword}
                      onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 mt-4 text-center font-semibold"
              >
                {loading ? 'Creating Student Profile...' : 'Complete Student Registration'}
              </button>
            </form>
          ) : (
            /* Recruiter Form */
            <form onSubmit={handleRecruiterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={recruiterForm.fullName}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, fullName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Official Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={recruiterForm.email}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={recruiterForm.companyName}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, companyName: e.target.value })}
                      placeholder="e.g. Google, Microsoft"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={recruiterForm.designation}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, designation: e.target.value })}
                    placeholder="e.g. Technical Recruiter"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Direct Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="tel"
                      value={recruiterForm.phone}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={recruiterForm.password}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={recruiterForm.confirmPassword}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting Recruiter Details...' : 'Register Corporate Account'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-navy-700/80 text-center">
            <p className="text-sm text-slate-400">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-primary-400 hover:text-primary-300">
                Log in to portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
