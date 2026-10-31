import React, { useState, useEffect } from 'react';
import { getAdminRecruitersApi, approveRecruiterApi } from '../../api/admin';
import { Recruiter } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Users,
  Building2,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';

export const RecruiterManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const res = await getAdminRecruitersApi();
      if (res.data && Array.isArray(res.data)) {
        setRecruiters(res.data);
      } else {
        setRecruiters(getMockRecruiters());
      }
    } catch (err) {
      console.error('Error fetching recruiters', err);
      setRecruiters(getMockRecruiters());
    } finally {
      setLoading(false);
    }
  };

  const getMockRecruiters = (): Recruiter[] => [
    {
      id: 1,
      fullName: 'Sarah Jenkins',
      designation: 'Lead University Recruiter',
      phone: '+91 9876500001',
      company: { id: 1, name: 'Amazon AWS', approved: true },
      approved: true,
      user: { id: 10, email: 'sjenkins@amazon.com', role: 'RECRUITER' },
    },
    {
      id: 2,
      fullName: 'Vikram Malhotra',
      designation: 'Technical Talent Acquisition',
      phone: '+91 9876500002',
      company: { id: 2, name: 'Microsoft IDC', approved: true },
      approved: true,
      user: { id: 11, email: 'vmalhotra@microsoft.com', role: 'RECRUITER' },
    },
    {
      id: 3,
      fullName: 'Anjali Deshmukh',
      designation: 'HR Partner',
      phone: '+91 9876500003',
      company: { id: 3, name: 'Stripe India', approved: false },
      approved: false,
      user: { id: 12, email: 'anjali@stripe.com', role: 'RECRUITER' },
    },
  ];

  const handleApprove = async (id: number, approved: boolean) => {
    try {
      await approveRecruiterApi(id, approved);
      setRecruiters((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved } : r))
      );
      setActionMsg(
        `Recruiter ${approved ? 'approved' : 'access rejected'}.`
      );
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Approval error', err);
      setRecruiters((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved } : r))
      );
      setActionMsg(`Recruiter ${approved ? 'approved' : 'rejected'} (mock mode).`);
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Verifying corporate recruiter credentials..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Recruiter Verification & Approvals</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review corporate account access requests and authorized hiring agents for campus drives.
        </p>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {recruiters.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No recruiter registrations"
          description="Newly registered recruiters awaiting verification will appear here."
        />
      ) : (
        <div className="card p-0 overflow-hidden bg-navy-800/80 border-navy-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  <th className="table-header">Recruiter Name</th>
                  <th className="table-header">Company Association</th>
                  <th className="table-header">Designation</th>
                  <th className="table-header">Official Email</th>
                  <th className="table-header">Authorization</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700/60">
                {recruiters.map((r) => (
                  <tr key={r.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-semibold text-white">{r.fullName}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{r.phone || 'N/A'}</span>
                      </div>
                    </td>

                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-200">
                          {r.company?.name || 'Company Not Specified'}
                        </span>
                      </div>
                    </td>

                    <td className="table-cell text-xs text-slate-300">
                      {r.designation || 'Hiring Lead'}
                    </td>

                    <td className="table-cell text-xs text-slate-400 font-mono">
                      {r.user?.email || 'N/A'}
                    </td>

                    <td className="table-cell">
                      {r.approved ? (
                        <span className="badge badge-green flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="badge badge-yellow flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!r.approved ? (
                          <button
                            type="button"
                            onClick={() => handleApprove(r.id, true)}
                            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 shadow-sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Authorize</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprove(r.id, false)}
                            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition-colors"
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

export default RecruiterManagement;
