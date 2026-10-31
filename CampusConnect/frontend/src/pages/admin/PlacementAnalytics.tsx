import React, { useState, useEffect } from 'react';
import { getPlacementAnalyticsApi } from '../../api/admin';
import {
  BranchPlacementStat,
  MonthlyPlacementStat,
  StatusDistributionStat,
} from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Download,
  Calendar,
  Building2,
  Sparkles,
} from 'lucide-react';

export const PlacementAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalEligible: 1200,
    placedCount: 1032,
    placementRate: 86,
    avgPackageLpa: 11.4,
    highestPackageLpa: 44.0,
    totalOffers: 1280,
  });

  const [branchWise, setBranchWise] = useState<BranchPlacementStat[]>([
    { branch: 'CSE', placed: 280, total: 300, percentage: 93 },
    { branch: 'IT', placed: 180, total: 200, percentage: 90 },
    { branch: 'ECE', placed: 210, total: 250, percentage: 84 },
    { branch: 'EEE', placed: 130, total: 170, percentage: 76 },
    { branch: 'MECH', placed: 110, total: 160, percentage: 68 },
    { branch: 'CIVIL', placed: 85, total: 140, percentage: 60 },
  ]);

  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyPlacementStat[]>([
    { month: 'Nov', count: 120 },
    { month: 'Dec', count: 240 },
    { month: 'Jan', count: 410 },
    { month: 'Feb', count: 680 },
    { month: 'Mar', count: 890 },
    { month: 'Apr', count: 1032 },
  ]);

  const [statusDistribution, setStatusDistribution] = useState<StatusDistributionStat[]>([
    { name: 'Applied', value: 1200, color: '#3B82F6' },
    { name: 'Shortlisted', value: 650, color: '#8B5CF6' },
    { name: 'Selected', value: 480, color: '#10B981' },
    { name: 'Rejected', value: 340, color: '#EF4444' },
    { name: 'Withdrawn', value: 180, color: '#6B7280' },
  ]);

  const [topCompanies, setTopCompanies] = useState<Array<{ name: string; hires: number }>>([
    { name: 'Amazon', hires: 64 },
    { name: 'Microsoft', hires: 42 },
    { name: 'TCS Digital', hires: 120 },
    { name: 'Infosys', hires: 145 },
    { name: 'Qualcomm', hires: 28 },
    { name: 'Cisco', hires: 35 },
  ]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await getPlacementAnalyticsApi();
      if (res.data) {
        if (res.data.summary) setSummary(res.data.summary);
        if (res.data.branchWise) setBranchWise(res.data.branchWise);
        if (res.data.monthlyTrend) setMonthlyTrend(res.data.monthlyTrend);
        if (res.data.statusDistribution) setStatusDistribution(res.data.statusDistribution);
        if (res.data.topCompanies) setTopCompanies(res.data.topCompanies);
      }
    } catch (err) {
      console.error('Error fetching analytics', err);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const reportData = {
      institution: 'CampusConnect Placement Board',
      exportTimestamp: new Date().toISOString(),
      summary,
      branchWise,
      monthlyTrend,
      topCompanies,
      statusDistribution,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `CampusPlacement_Audit_${new Date().getFullYear()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (loading) {
    return <LoadingSpinner message="Calculating university placement analytics..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Institutional Placement Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Data insights, compensation distributions, and university annual placement performance.
          </p>
        </div>

        <button
          type="button"
          onClick={exportReport}
          className="btn-primary text-xs flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-primary-600/30"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Report (.JSON)</span>
        </button>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Eligible Pool
          </span>
          <span className="text-2xl font-extrabold text-white">{summary.totalEligible}</span>
          <p className="text-[11px] text-slate-400 mt-1">Final year pool</p>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Placed Students
          </span>
          <span className="text-2xl font-extrabold text-primary-400">{summary.placedCount}</span>
          <p className="text-[11px] text-slate-400 mt-1">Unique candidates</p>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Overall Placement
          </span>
          <span className="text-2xl font-extrabold text-emerald-400">{summary.placementRate}%</span>
          <p className="text-[11px] text-slate-400 mt-1">Success percentage</p>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Average Package
          </span>
          <span className="text-2xl font-extrabold text-white">₹{summary.avgPackageLpa}</span>
          <p className="text-[11px] text-slate-400 mt-1">LPA across batch</p>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Highest Offer
          </span>
          <span className="text-2xl font-extrabold text-violet-400">₹{summary.highestPackageLpa}</span>
          <p className="text-[11px] text-slate-400 mt-1">LPA top package</p>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Offers Made
          </span>
          <span className="text-2xl font-extrabold text-cyan-400">{summary.totalOffers}</span>
          <p className="text-[11px] text-slate-400 mt-1">Includes dual-offers</p>
        </div>
      </div>

      {/* Row 1: Branch BarChart & Monthly LineChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Placement */}
        <div className="card p-6 bg-navy-800/80 border-navy-700">
          <h3 className="text-base font-bold text-white mb-1">Departmental Success Rate</h3>
          <p className="text-xs text-slate-400 mb-4">Placement percentage by academic branch</p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchWise} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="branch" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="percentage" fill="#3B82F6" name="Placed %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend LineChart */}
        <div className="card p-6 bg-navy-800/80 border-navy-700">
          <h3 className="text-base font-bold text-white mb-1">Cumulative Placement Velocity</h3>
          <p className="text-xs text-slate-400 mb-4">Monthly placed candidates progression</p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 5 }}
                  name="Total Placed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Top Recruiters & Pipeline Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hiring Companies */}
        <div className="card p-6 bg-navy-800/80 border-navy-700">
          <h3 className="text-base font-bold text-white mb-1">Top Corporate Recruiters</h3>
          <p className="text-xs text-slate-400 mb-4">Organizations with highest number of student offers</p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topCompanies}
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Bar dataKey="hires" fill="#8B5CF6" name="Total Hires" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Donut */}
        <div className="card p-6 bg-navy-800/80 border-navy-700">
          <h3 className="text-base font-bold text-white mb-1">Funnel Status Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Total stage progression across all published drives</p>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-analytics-${index}`} fill={entry.color} />
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
    </div>
  );
};

export default PlacementAnalytics;
