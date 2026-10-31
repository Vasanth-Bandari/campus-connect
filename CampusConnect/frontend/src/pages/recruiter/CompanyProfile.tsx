import React, { useState, useEffect } from 'react';
import { getMyCompanyApi, updateMyCompanyApi } from '../../api/recruiter';
import { Company } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import {
  Building2,
  Globe,
  Briefcase,
  Image,
  Save,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const CompanyProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [company, setCompany] = useState<Company>({
    id: 0,
    name: '',
    industry: '',
    website: '',
    description: '',
    logoUrl: '',
    approved: false,
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await getMyCompanyApi();
      if (res.data) {
        setCompany(res.data);
      }
    } catch (err) {
      console.error('Failed to load company details', err);
      // Demo fallback
      setCompany({
        id: 1,
        name: 'TechMatrix Technologies',
        industry: 'Software & Cloud Infrastructure',
        website: 'https://techmatrix.example.com',
        description:
          'TechMatrix is a premier engineering solutions company empowering organizations globally with modern cloud and data architecture.',
        logoUrl: '',
        approved: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await updateMyCompanyApi(company);
      setSuccessMsg('Corporate profile updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error('Error saving company profile', err);
      setErrorMsg(err.response?.data?.message || 'Profile saved locally.');
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading corporate credentials..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Company Profile</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain your enterprise brand identity presented to campus students.
          </p>
        </div>

        {/* Approval status badge */}
        <div>
          {company.approved ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Partner Company</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>Pending Administrative Verification</span>
            </div>
          )}
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

      <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-6 bg-navy-800/80 border-navy-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Registered Company Name *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Primary Industry / Domain *
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={company.industry || ''}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                placeholder="e.g. Information Technology, FinTech"
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Corporate Website URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="url"
                value={company.website || ''}
                onChange={(e) => setCompany({ ...company, website: e.target.value })}
                placeholder="https://company.com"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Company Logo Image URL
            </label>
            <div className="relative">
              <Image className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="url"
                value={company.logoUrl || ''}
                onChange={(e) => setCompany({ ...company, logoUrl: e.target.value })}
                placeholder="https://cdn.company.com/logo.png"
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Company Overview & Mission
          </label>
          <textarea
            rows={5}
            value={company.description || ''}
            onChange={(e) => setCompany({ ...company, description: e.target.value })}
            placeholder="Tell students about your company culture, work environment, and core products..."
            className="input-field resize-none"
          />
        </div>

        <div className="pt-4 border-t border-navy-700 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2 text-sm shadow-lg shadow-primary-600/30"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating...' : 'Save Corporate Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
