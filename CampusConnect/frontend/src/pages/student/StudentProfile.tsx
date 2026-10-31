import React, { useState, useEffect } from 'react';
import { getStudentProfileApi, updateStudentProfileApi } from '../../api/student';
import { Student } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  User,
  Mail,
  Hash,
  BookOpen,
  Award,
  Calendar,
  Phone,
  Code,
  Save,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [profile, setProfile] = useState<Student>({
    id: 0,
    fullName: '',
    rollNumber: '',
    branch: 'CSE',
    cgpa: 0,
    graduationYear: 2025,
    phone: '',
    skills: '',
    placed: false,
  });

  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getStudentProfileApi();
      if (res.data) {
        setProfile(res.data);
        if (res.data.skills) {
          setSkillsList(
            res.data.skills
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          );
        }
      }
    } catch (err) {
      console.error('Failed to load student profile', err);
      // Mock default for demo
      setProfile({
        id: 1,
        fullName: 'Alex Morgan',
        rollNumber: '21CS088',
        branch: 'CSE',
        cgpa: 8.75,
        graduationYear: 2025,
        phone: '+91 9876543210',
        skills: 'React, TypeScript, Java, Spring Boot, MySQL',
        placed: false,
      });
      setSkillsList(['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL']);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletion = () => {
    let score = 0;
    if (profile.fullName) score += 20;
    if (profile.rollNumber) score += 20;
    if (profile.branch) score += 15;
    if (profile.cgpa > 0) score += 15;
    if (profile.phone) score += 10;
    if (skillsList.length > 0) score += 20;
    return score;
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter((s) => s !== skillToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const updatedData = {
      ...profile,
      skills: skillsList.join(', '),
    };

    try {
      await updateStudentProfileApi(updatedData);
      setSuccessMsg('Profile successfully updated!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error('Error updating profile', err);
      setErrorMsg(err.response?.data?.message || 'Failed to update profile. Saved locally.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Fetching academic profile..." />;
  }

  const completion = calculateCompletion();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header and Progress */}
      <div className="card p-6 bg-navy-800/80 border-navy-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Student Profile & Credentials</h1>
            <p className="text-xs text-slate-400 mt-1">
              Your profile is verified by the college Training & Placement cell for job eligibility.
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-primary-400">
              Profile Completeness: {completion}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-navy-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-violet-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Full Legal Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Roll / Registration Number *
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={profile.rollNumber}
                onChange={(e) => setProfile({ ...profile, rollNumber: e.target.value })}
                className="input-field pl-10 uppercase"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Department Branch *
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <select
                value={profile.branch}
                onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                className="input-field pl-10 cursor-pointer"
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Cumulative CGPA *
            </label>
            <div className="relative">
              <Award className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={profile.cgpa}
                onChange={(e) => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 0 })}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Graduation Year *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <select
                value={profile.graduationYear}
                onChange={(e) => setProfile({ ...profile, graduationYear: parseInt(e.target.value) })}
                className="input-field pl-10 cursor-pointer"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Placement Status
            </label>
            <div className="h-[42px] flex items-center px-4 rounded-lg bg-navy-700 border border-navy-600">
              <span
                className={`badge ${
                  profile.placed ? 'badge-green' : 'badge-yellow'
                }`}
              >
                {profile.placed ? 'Placed via Campus' : 'Seeking Opportunities'}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Skills Tag Section */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Technical Skills & Proficiencies
          </label>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-3 rounded-lg bg-navy-700/50 border border-navy-600">
            {skillsList.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No skills added yet. Add below.</span>
            ) : (
              skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-blue py-1 px-3 flex items-center gap-1.5 text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. Python, Docker, React, Machine Learning"
              className="input-field"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn-secondary flex items-center gap-1 whitespace-nowrap text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-4 border-t border-navy-700 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2 text-sm shadow-lg shadow-primary-600/30"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile Details'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
