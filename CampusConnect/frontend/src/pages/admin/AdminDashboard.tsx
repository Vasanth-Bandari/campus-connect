import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboardApi } from '../../api/admin';
import { DashboardStats, BranchPlacementStat, StatusDistributionStat } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Users,
  Building,
  Briefcase,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 1240,
    totalRecruiters: 45,
    totalCompanies: 38,
    totalJobs: 72,
    totalApplications: 2850,
    placementRate: 86,
  });

  const [branchStats, setBranchStats] = useState<BranchPlacementStat[]>([
    { branch: 'CSE', placed: 280, total: 300, percentage: 93 },
    { branch: 'IT', placed: 180, total: 200, percentage: 90 },
    { branch: 'ECE', placed: 210, total: 250, percentage: 84 },
    { branch: 'EEE', placed: 130, total: 170, percentage: 76 },
    { branch: 'MECH', placed: 110, total: 160, percentage: 68 },
    { branch: 'CIVIL', placed: 85, total: 140, percentage: 60 },
  ]);

  const [statusDistribution, setStatusDistribution] = useState<StatusDistributionStat[]>([
    { name: 'Applied', value: 1200, color: '#3B82F6' },
    { name: 'Shortlisted', value: 650, color: '#8B5CF6' },
    { name: 'Selected', value: 480, color: '#10B981' },
    { name: 'Rejected', value: 340, color: '#EF4444' },
    { name: 'Withdrawn', value: 180, color: '#6B7280' },
  ]);

  const [recentActivities, setRecentActivities] = useState<
    Array<{ id: number; action: string; target: string; timestamp: string; type: string }>
  >([
    { id: 1, action: 'Approved Corporate Recruiter', target: 'Pooja V. (Infosys)', timestamp: '10 mins ago', type: 'recruiter' },
    { id: 2, action: 'Published Campus Drive', target: 'Microsoft Season 2025', timestamp: '1 hour ago', type: 'drive' },
    { id: 3, action: 'New Job Position Posted', target: 'SDE-1 at Amazon AWS', timestamp: '3 hours ago', type: 'job' },
    { id: 4, action: 'Verified Student Profiles', target: '42 B.Tech CSE Candidates', timestamp: '5 hours ago', type: 'student' },
  ]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getAdminDashboardApi();
      if (res.data) {
        if (res.data.stats) setStats(res.data.stats);
        if (res.data.branchStats) setBranchStats(res.data.branchStats);
        if (res.data.statusDistribution) setStatusDistribution(res.data.statusDistribution);
        if (res.data.recentActivities) setRecentActivities(res.data.recentActivities);
      }
    } catch (err) {
      console.error('Error loading admin dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Aggregating campus placement metrics..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 via-primary-950/60 to-violet-950/60 border border-navy-700 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="badge badge-violet mb-2">University TPO Command Center</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Placement Cell Administration
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Real-time monitoring of campus drives, corporate approvals, student eligibility compliance, and hiring analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/analytics"
              className="btn-primary text-sm flex items-center gap-2 shadow-lg shadow-primary-600/30 whitespace-nowrap"
            >
              <span>Full Analytics Suite</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Top Stats: 6 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Students</span>
            <GraduationCap className="w-4 h-4 text-primary-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.totalStudents}</span>
          <p className="text-[11px] text-slate-400 mt-1">Enrolled candidates</p>
        </div>

        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Recruiters</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.totalRecruiters}</span>
          <p className="text-[11px] text-slate-400 mt-1">Active talent leads</p>
        </div>

        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Companies</span>
            <Building className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.totalCompanies}</span>
          <p className="text-[11px] text-slate-400 mt-1">Partner enterprises</p>
        </div>

        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Jobs</span>
            <Briefcase className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.totalJobs}</span>
          <p className="text-[11px] text-slate-400 mt-1">Active openings</p>
        </div>

        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Applications</span>
            <FileCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl font-bold text-white">{stats.totalApplications}</span>
          <p className="text-[11px] text-slate-400 mt-1">Total submitted</p>
        </div>

        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Placement Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-bold text-emerald-400">{stats.placementRate}%</span>
          <p className="text-[11px] text-slate-400 mt-1">Campus-wide</p>
        </div>
      </div>

      {/* Visual Analytics Row: BarChart & PieChart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch-wise Placements Bar Chart */}
        <div className="lg:col-span-2 card p-6 bg-navy-800/80 border-navy-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Branch-wise Placement Statistics</h3>
              <p className="text-xs text-slate-400">Total Enrolled vs Placed Students by Department</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="branch" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="total" fill="#334155" name="Total Students" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" fill="#3B82F6" name="Placed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Status Donut Pie Chart */}
        <div className="card p-6 bg-navy-800/80 border-navy-700">
          <h3 className="text-base font-bold text-white mb-1">Application Pipeline</h3>
          <p className="text-xs text-slate-400 mb-4">Status distribution across active drives</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend
                  formatter={(value) => <span className="text-xs text-slate-300">{value}</span>}
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card p-6 bg-navy-800/80 border-navy-700">
        <h3 className="text-base font-bold text-white mb-4">Audit Log & Recent Operations</h3>
        <div className="divide-y divide-navy-700/60">
          {recentActivities.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-primary-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{act.action}</p>
                  <p className="text-[11px] text-slate-400">{act.target}</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" />
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
