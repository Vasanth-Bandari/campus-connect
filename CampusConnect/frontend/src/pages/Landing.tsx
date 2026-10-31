import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  BarChart3,
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  Star,
  Layers,
} from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col selection:bg-primary-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-28 lg:pb-36">
        {/* Glow gradients behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/80 border border-navy-700 backdrop-blur text-primary-400 text-xs sm:text-sm font-semibold mb-8 animate-fade-in shadow-inner">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span>Next-Generation Campus Recruitment Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            <span className="text-white">Connect. Apply.</span>{' '}
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-violet-500 bg-clip-text text-transparent">
              Get Placed.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Bridging ambitious university talent with industry leading enterprises.
            Automate eligibility checks, streamline multi-round interviews, and accelerate your hiring cycle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <Link
              to="/register?type=student"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold flex items-center justify-center gap-2 shadow-xl shadow-primary-600/25 transition-all hover:scale-105"
            >
              <span>Student Registration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register?type=recruiter"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold border border-navy-700 hover:border-navy-600 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Building2 className="w-4 h-4 text-violet-400" />
              <span>Recruiter Registration</span>
            </Link>
          </div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card backdrop-blur-md bg-navy-800/60 border-navy-700/80 p-6 flex items-center gap-4 hover:border-primary-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-bold text-white">2,000+</h4>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Students Enrolled</p>
              </div>
            </div>

            <div className="card backdrop-blur-md bg-navy-800/60 border-navy-700/80 p-6 flex items-center gap-4 hover:border-violet-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-bold text-white">150+</h4>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Top Companies</p>
              </div>
            </div>

            <div className="card backdrop-blur-md bg-navy-800/60 border-navy-700/80 p-6 flex items-center gap-4 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-bold text-white">85%</h4>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Placement Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy-950/60 border-y border-navy-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-400 font-semibold tracking-wide uppercase text-sm mb-3">
              Comprehensive Platform
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Engineered for seamless campus placements
            </h3>
            <p className="text-slate-400 mt-4 text-base">
              Everything students, placement cells, and enterprise recruiters need in a single integrated ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card card-hover flex flex-col p-6">
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Student Portal</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                Maintain comprehensive academic profiles, upload verified resumes, track application milestones, and receive instant interview notifications.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover flex flex-col p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Recruiter Dashboard</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                Post full-time and internship openings with custom criteria, review filtered candidate pipelines, and coordinate interview stages effortlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover flex flex-col p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Admin Control Hub</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                Comprehensive supervision for university TPO cells. Approve recruiters, schedule drives, verify student credentials, and ensure compliance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card card-hover flex flex-col p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Smart Eligibility Engine</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                Real-time validation against CGPA thresholds, branch constraints, and graduation years eliminates unqualified submissions instantly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card card-hover flex flex-col p-6">
              <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Interview Management</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                Schedule multi-round interviews with physical venues or virtual meeting links, feedback notes, and outcome tracking in real time.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card card-hover flex flex-col p-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Placement Analytics</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                Interactive charts illustrating branch-wise placement metrics, salary distribution, recruiter engagement, and downloadable placement audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-navy-800/40 border border-navy-700/60">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                2,000+
              </span>
              <p className="mt-2 text-sm text-slate-300 font-medium">Students Registered</p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-800/40 border border-navy-700/60">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
                150+
              </span>
              <p className="mt-2 text-sm text-slate-300 font-medium">Partner Companies</p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-800/40 border border-navy-700/60">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                85%
              </span>
              <p className="mt-2 text-sm text-slate-300 font-medium">Placement Rate</p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-800/40 border border-navy-700/60">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                500+
              </span>
              <p className="mt-2 text-sm text-slate-300 font-medium">Interviews Conducted</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-navy-950/60 border-y border-navy-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-400 font-semibold tracking-wide uppercase text-sm mb-3">
              Streamlined Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">How CampusConnect Works</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Students */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-primary-400" />
                <h4 className="text-2xl font-bold text-white">For Students</h4>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600/20 text-primary-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Create & Verify Profile</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Register with your academic roll number, branch, CGPA, and upload your latest PDF resume.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600/20 text-primary-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Explore & Apply In 1-Click</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Browse job postings where you satisfy eligibility criteria and submit applications instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600/20 text-primary-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Attend Interviews & Get Hired</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Receive schedule invites, prepare for technical rounds, and receive your dream job offer letter.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Recruiters */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-violet-400" />
                <h4 className="text-2xl font-bold text-white">For Recruiters</h4>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Register Corporate Profile</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Submit company credentials and get approved by university administrators in minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Define Roles & Criteria</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Publish openings with packages, cut-off CGPAs, and target departments to automate candidate filtering.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Shortlist & Conduct Rounds</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Filter verified talent, schedule multi-stage interviews, and roll out selection results swiftly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-400 font-semibold tracking-wide uppercase text-sm mb-3">
              Success Stories
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Loved by students and employers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic mb-6">
                  "CampusConnect made finding eligible placements effortless. I got shortlisted for 4 companies and accepted my dream software engineer offer at Microsoft!"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-600/30 text-primary-400 font-bold flex items-center justify-center">
                  A
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Aarav Sharma</h5>
                  <p className="text-xs text-slate-400">B.Tech CSE, Batch of 2024</p>
                </div>
              </div>
            </div>

            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic mb-6">
                  "The automated CGPA validation and branch filtering saved our recruitment team over 40 hours of manual resume screening. Outstanding platform."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600/30 text-violet-400 font-bold flex items-center justify-center">
                  P
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Pooja Venkatesh</h5>
                  <p className="text-xs text-slate-400">Head of Talent, Infosys</p>
                </div>
              </div>
            </div>

            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic mb-6">
                  "Managing hundreds of student drives was a massive administrative headache before CampusConnect. The analytics and exportable reports are invaluable."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600/30 text-emerald-400 font-bold flex items-center justify-center">
                  R
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Dr. R. Ramanathan</h5>
                  <p className="text-xs text-slate-400">Placement Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-primary-900/80 via-navy-800 to-violet-900/80 border border-primary-500/30 shadow-2xl relative text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to transform your campus hiring?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base">
              Join thousands of students and hundreds of leading organizations on CampusConnect today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="btn-primary px-8 py-3.5 text-base shadow-lg shadow-primary-600/30"
              >
                Get Started Now
              </Link>
              <Link
                to="/contact"
                className="btn-secondary px-8 py-3.5 text-base"
              >
                Contact TPO Office
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-navy-800 py-12 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Campus<span className="text-primary-500">Connect</span>
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="hover:text-white transition-colors">Register</Link>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} CampusConnect Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
