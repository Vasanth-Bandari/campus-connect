import React, { useState, useEffect } from 'react';
import { getAdminDrivesApi, createDriveApi, updateDriveApi, getAdminCompaniesApi } from '../../api/admin';
import { RecruitmentDrive, DriveStatus, Company } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import {
  Target,
  PlusCircle,
  Calendar,
  Building2,
  Clock,
  CheckCircle2,
  X,
} from 'lucide-react';

export const RecruitmentDrives: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [drives, setDrives] = useState<RecruitmentDrive[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Drive form
  const [formData, setFormData] = useState({
    title: '',
    companyId: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'UPCOMING' as DriveStatus,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [drivesRes, companiesRes] = await Promise.allSettled([
        getAdminDrivesApi(),
        getAdminCompaniesApi(),
      ]);

      if (drivesRes.status === 'fulfilled' && Array.isArray(drivesRes.value.data)) {
        setDrives(drivesRes.value.data);
      } else {
        setDrives(getMockDrives());
      }

      if (companiesRes.status === 'fulfilled' && Array.isArray(companiesRes.value.data)) {
        setCompanies(companiesRes.value.data);
      } else {
        setCompanies([
          { id: 1, name: 'Amazon AWS', approved: true },
          { id: 2, name: 'Microsoft IDC', approved: true },
          { id: 3, name: 'Qualcomm', approved: true },
        ]);
      }
    } catch (err) {
      console.error('Error loading drives', err);
      setDrives(getMockDrives());
    } finally {
      setLoading(false);
    }
  };

  const getMockDrives = (): RecruitmentDrive[] => [
    {
      id: 1,
      title: 'Amazon AWS Annual Campus Mega-Drive',
      company: { id: 1, name: 'Amazon AWS', approved: true },
      description: 'Exclusive on-campus recruitment drive for Cloud Support and Software Development roles.',
      startDate: '2025-06-01',
      endDate: '2025-06-15',
      status: 'UPCOMING',
    },
    {
      id: 2,
      title: 'Microsoft Technical Associate Hiring Program',
      company: { id: 2, name: 'Microsoft IDC', approved: true },
      description: 'Multi-round placement initiative for Azure Cloud and AI development squads.',
      startDate: '2025-05-10',
      endDate: '2025-05-25',
      status: 'ONGOING',
    },
    {
      id: 3,
      title: 'Qualcomm Hardware & Silicon Hiring Drive',
      company: { id: 3, name: 'Qualcomm', approved: true },
      description: 'Specialized hiring for circuit design, VLSI, and modem firmware.',
      startDate: '2025-04-01',
      endDate: '2025-04-14',
      status: 'COMPLETED',
    },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCompany = companies.find((c) => String(c.id) === formData.companyId);
      await createDriveApi({
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        company: selectedCompany,
      });

      const newDrive: RecruitmentDrive = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        company: selectedCompany,
      };

      setDrives([newDrive, ...drives]);
      setShowCreateModal(false);
      setActionMsg('New recruitment drive scheduled successfully!');
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Create drive error', err);
      const selectedCompany = companies.find((c) => String(c.id) === formData.companyId);
      const newDrive: RecruitmentDrive = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        company: selectedCompany,
      };
      setDrives([newDrive, ...drives]);
      setShowCreateModal(false);
      setActionMsg('New recruitment drive scheduled (mock mode)!');
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  const handleStatusUpdate = async (id: number, status: DriveStatus) => {
    try {
      await updateDriveApi(id, { status });
      setDrives((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
      setActionMsg(`Drive status updated to ${status}.`);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err) {
      console.error('Update drive error', err);
      setDrives((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
      setActionMsg(`Drive status updated to ${status} (mock mode).`);
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading campus recruitment calendar..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Campus Recruitment Drives</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize institutional hiring drives, coordinate calendar dates, and announce partner recruitment seasons.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="btn-primary text-sm flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-primary-600/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Schedule New Drive</span>
        </button>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {drives.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No drives scheduled"
          description="Click 'Schedule New Drive' to establish calendar periods for corporate partners."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="card p-6 bg-navy-800/80 border-navy-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Building2 className="w-3.5 h-3.5 text-primary-400" />
                      <span>{drive.company?.name || 'Partner Company'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{drive.title}</h3>
                  </div>
                  <StatusBadge status={drive.status} />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {drive.description || 'Official campus recruitment drive.'}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 p-3 rounded-lg bg-navy-700/50 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-400" />
                    <span>Start: {drive.startDate || 'TBD'}</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-violet-400" />
                    <span>End: {drive.endDate || 'TBD'}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="pt-3 border-t border-navy-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold">Drive Status:</span>
                <select
                  value={drive.status}
                  onChange={(e) => handleStatusUpdate(drive.id, e.target.value as DriveStatus)}
                  className="input-field text-xs py-1 px-2.5 max-w-[130px] cursor-pointer"
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Drive Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="card max-w-lg w-full p-6 bg-navy-800 border-navy-700 animate-slide-up space-y-4">
            <div className="flex items-center justify-between border-b border-navy-700 pb-3">
              <h3 className="text-lg font-bold text-white">Schedule Recruitment Drive</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Drive Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Google Cloud Campus Drive 2025"
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Partner Company *
                </label>
                <select
                  required
                  value={formData.companyId}
                  onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                  className="input-field text-xs cursor-pointer"
                >
                  <option value="">Select Partner Company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Drive Overview / Guidelines
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Eligible departments, number of rounds, on-campus date guidelines..."
                  className="input-field text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-navy-700">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs shadow-md"
                >
                  Publish Drive to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentDrives;
