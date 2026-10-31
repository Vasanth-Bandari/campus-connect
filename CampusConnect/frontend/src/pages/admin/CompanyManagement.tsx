import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminCompaniesApi, approveCompanyApi } from '../../api/admin';
import { Company } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Building2,
  Globe,
  CheckCircle,
  XCircle,
  Briefcase,
  ShieldCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const CompanyManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await getAdminCompaniesApi();
      if (res.data && Array.isArray(res.data)) {
        setCompanies(res.data);
      } else {
        setCompanies(getMockCompanies());
      }
    } catch (err) {
      console.error('Error fetching companies', err);
      setCompanies(getMockCompanies());
    } finally {
      setLoading(false);
    }
  };

  const getMockCompanies = (): Company[] => [
    {
      id: 1,
      name: 'Amazon India Services',
      industry: 'Cloud & E-Commerce',
      website: 'https://amazon.jobs',
      approved: true,
      description: 'Global hyperscale cloud and retail platform.',
    },
    {
      id: 2,
      name: 'Microsoft IDC',
      industry: 'Software & Cloud Services',
      website: 'https://careers.microsoft.com',
      approved: true,
      description: 'Enterprise productivity and cloud solutions.',
    },
    {
      id: 3,
      name: 'Stripe Global Services',
      industry: 'Financial Infrastructure',
      website: 'https://stripe.com/jobs',
      approved: false,
      description: 'Online payment infrastructure powering global e-commerce.',
    },
  ];

  const handleApprove = async (id: number, approved: boolean) => {
    try {
      await approveCompanyApi(id, approved);
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, approved } : c))
      );
      setActionMsg(`Company ${approved ? 'approved' : 'rejected'}.`);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Company approval error', err);
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, approved } : c))
      );
      setActionMsg(`Company ${approved ? 'approved' : 'rejected'} (mock mode).`);
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Auditing corporate partner accounts..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Partner Companies Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Approve corporate partner accounts authorized to organize campus recruitment drives.
        </p>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {companies.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No companies registered"
          description="Registered companies participating in campus hiring will be listed here."
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header">Company Name</th>
                  <th className="table-header">Industry</th>
                  <th className="table-header">Website</th>
                  <th className="table-header">Approval Status</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {companies.map((c) => (
                  <tr key={c.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-semibold text-white">{c.name}</div>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-sm mt-0.5">
                        {c.description}
                      </p>
                    </td>

                    <td className="table-cell">
                      <span className="badge badge-violet">{c.industry || 'Tech'}</span>
                    </td>

                    <td className="table-cell text-xs">
                      {c.website ? (
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:underline inline-flex items-center gap-1"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Link</span>
                        </a>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </td>

                    <td className="table-cell">
                      {c.approved ? (
                        <span className="badge badge-green flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="badge badge-yellow flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3" />
                          <span>Awaiting Review</span>
                        </span>
                      )}
                    </td>

                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/jobs?company=${encodeURIComponent(c.name)}`}
                          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-primary-400" />
                          <span>View Jobs</span>
                        </Link>

                        {!c.approved ? (
                          <button
                            type="button"
                            onClick={() => handleApprove(c.id, true)}
                            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 shadow-sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprove(c.id, false)}
                            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10"
                          >
                            Revoke
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

export default CompanyManagement;
