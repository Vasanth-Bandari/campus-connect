import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobsApi } from '../../api/jobs';
import { getStudentProfileApi } from '../../api/student';
import { Job, Student } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import {
  Search,
  Filter,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const JobListings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [student, setStudent] = useState<Student | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPackage, setMinPackage] = useState<number | ''>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, profileRes] = await Promise.allSettled([
        getJobsApi(),
        getStudentProfileApi(),
      ]);

      if (profileRes.status === 'fulfilled' && profileRes.value.data) {
        setStudent(profileRes.value.data);
      }

      if (jobsRes.status === 'fulfilled' && Array.isArray(jobsRes.value.data)) {
        setJobs(jobsRes.value.data);
      } else {
        // Mock fallback jobs
        setJobs(getFallbackJobs());
      }
    } catch (err) {
      console.error('Failed to load jobs', err);
      setJobs(getFallbackJobs());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackJobs = (): Job[] => [
    {
      id: 1,
      title: 'Graduate Software Engineer',
      company: { id: 1, name: 'Google India', approved: true },
      jobType: 'FULL_TIME',
      location: 'Hyderabad / Bangalore',
      packageLpa: 24.0,
      minCgpa: 8.0,
      graduationYear: 2025,
      applicationDeadline: '2025-06-30',
      status: 'OPEN',
      eligibleBranches: ['CSE', 'IT'],
      requiredSkills: ['Data Structures', 'Algorithms', 'Go', 'Python'],
      description: 'Design robust distributed web systems and microservices for Google Cloud.',
    },
    {
      id: 2,
      title: 'Frontend Developer (React)',
      company: { id: 2, name: 'Razorpay', approved: true },
      jobType: 'FULL_TIME',
      location: 'Bangalore, India',
      packageLpa: 16.5,
      minCgpa: 7.0,
      graduationYear: 2025,
      applicationDeadline: '2025-07-10',
      status: 'OPEN',
      eligibleBranches: ['CSE', 'IT', 'ECE'],
      requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
      description: 'Build fast, accessible checkout experiences powering millions of transactions daily.',
    },
    {
      id: 3,
      title: 'DevOps / Cloud Intern',
      company: { id: 3, name: 'Cisco Systems', approved: true },
      jobType: 'INTERNSHIP',
      location: 'Chennai / Remote',
      packageLpa: 8.0,
      minCgpa: 6.5,
      graduationYear: 2025,
      applicationDeadline: '2025-05-31',
      status: 'OPEN',
      eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE'],
      requiredSkills: ['Docker', 'Kubernetes', 'Linux', 'AWS'],
      description: 'Collaborate with SRE teams managing core networking microservice clusters.',
    },
    {
      id: 4,
      title: 'Hardware & Embedded Firmware Engineer',
      company: { id: 4, name: 'Qualcomm', approved: true },
      jobType: 'FULL_TIME',
      location: 'Bangalore, India',
      packageLpa: 19.0,
      minCgpa: 7.5,
      graduationYear: 2025,
      applicationDeadline: '2025-06-15',
      status: 'OPEN',
      eligibleBranches: ['ECE', 'EEE'],
      requiredSkills: ['C++', 'Verilog', 'ARM', 'RTOS'],
      description: 'Low-level driver and firmware development for 5G Snapdragon modem chipsets.',
    },
  ];

  // Helper to check student eligibility against job
  const checkEligibility = (job: Job) => {
    if (!student) return { eligible: true, reason: 'Profile verification pending' };

    const meetsCgpa = (student.cgpa || 0) >= (job.minCgpa || 0);
    const meetsBranch =
      !job.eligibleBranches?.length ||
      job.eligibleBranches.includes(student.branch);
    const meetsYear =
      !job.graduationYear || student.graduationYear === job.graduationYear;

    const isEligible = meetsCgpa && meetsBranch && meetsYear;
    return {
      eligible: isEligible,
      reason: !meetsCgpa
        ? `CGPA ${(job.minCgpa || 0)} required`
        : !meetsBranch
        ? `Branches: ${job.eligibleBranches.join(', ')}`
        : !meetsYear
        ? `Batch ${job.graduationYear} only`
        : 'Eligible to Apply',
    };
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(search.toLowerCase()) ||
      job.description?.toLowerCase().includes(search.toLowerCase());

    const matchesBranch =
      !selectedBranch ||
      job.eligibleBranches?.includes(selectedBranch);

    const matchesType = !selectedType || job.jobType === selectedType;

    const matchesPackage =
      !minPackage ||
      (job.packageLpa !== undefined && job.packageLpa >= Number(minPackage));

    return matchesSearch && matchesBranch && matchesType && matchesPackage;
  });

  if (loading) {
    return <LoadingSpinner message="Searching current recruitment drives..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Campus Job Listings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse and apply to verified opportunities authorized by the campus placement board.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-4 sm:p-6 bg-navy-800/80 border-navy-700 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, company name, or skills..."
              className="input-field pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="input-field max-w-[140px] cursor-pointer"
            >
              <option value="">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field max-w-[140px] cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="PART_TIME">Part Time</option>
            </select>

            <input
              type="number"
              placeholder="Min LPA"
              value={minPackage}
              onChange={(e) => setMinPackage(e.target.value ? Number(e.target.value) : '')}
              className="input-field w-28"
            />
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          title="No jobs match your filter criteria"
          description="Try broadening your search keywords or resetting branch and package filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setSelectedBranch('');
            setSelectedType('');
            setMinPackage('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const eligibility = checkEligibility(job);

            return (
              <div
                key={job.id}
                className="card card-hover flex flex-col justify-between p-6 bg-navy-800/80 border-navy-700"
              >
                <div>
                  {/* Top Bar: Company + Eligibility Pill */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600/30 to-violet-600/30 border border-primary-500/20 flex items-center justify-center font-bold text-primary-400">
                        {job.company?.name ? job.company.name.charAt(0) : 'C'}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-300">
                          {job.company?.name || 'Verified Recruiter'}
                        </h4>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`badge text-[11px] ${
                        eligibility.eligible ? 'badge-green' : 'badge-yellow'
                      }`}
                    >
                      {eligibility.eligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-300 my-3">
                    {job.location && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    )}

                    {job.packageLpa && (
                      <span className="text-emerald-400 font-semibold">
                        ₹{job.packageLpa} LPA
                      </span>
                    )}

                    <span className="badge badge-blue">
                      {job.jobType.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Required Skills tags */}
                  {job.requiredSkills && job.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.requiredSkills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-navy-700 text-[10px] text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-navy-700/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Deadline: {job.applicationDeadline || 'Open until filled'}
                    </span>
                  </div>

                  <Link
                    to={`/student/jobs/${job.id}`}
                    className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5 shadow-md"
                  >
                    <span>View & Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobListings;
