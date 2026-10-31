import React from 'react';
import Navbar from '../components/Navbar';
import { Target, Award, Users, BookOpen, ShieldCheck, HeartHandshake } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-4">
            About CampusConnect
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Empowering Campus Recruitment through Intelligent Innovation
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            CampusConnect was born to solve the friction of traditional on-campus placements.
            We bring transparency, automation, and real-time coordination to university training & placement ecosystems.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="card p-8 bg-gradient-to-br from-navy-800 to-navy-800/80 border-navy-700">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To democratize access to career opportunities for students of all disciplines, while drastically reducing the operational overhead for corporate recruiters and college placement cells through automated eligibility filtering and intelligent scheduling.
            </p>
          </div>

          <div className="card p-8 bg-gradient-to-br from-navy-800 to-navy-800/80 border-navy-700">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To be the gold standard enterprise campus placement infrastructure, recognized nationally for fairness, transparency, and data-driven hiring outcomes that bridge academia and industry effortlessly.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">Our Core Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Absolute Integrity</h3>
              <p className="text-sm text-slate-400">
                Verified candidate credentials, tamper-proof GPA reporting, and authenticated recruiter corporate accounts.
              </p>
            </div>

            <div className="card text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Equal Opportunity</h3>
              <p className="text-sm text-slate-400">
                Objective criteria-based filtering guarantees that every eligible student gets their shot at the interview.
              </p>
            </div>

            <div className="card text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Collaborative Growth</h3>
              <p className="text-sm text-slate-400">
                Cultivating long-standing partnerships between university faculties and global recruiting teams.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Placement Leadership Team</h2>
          <p className="text-slate-400 text-center max-w-xl mx-auto mb-10 text-sm">
            Dedicated coordinators ensuring seamless recruitment drives across all university departments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Dr. Suresh Kumar',
                role: 'Dean of Corporate Relations',
                dept: 'Placement Cell Head',
                initial: 'S',
                color: 'from-blue-500 to-indigo-600',
              },
              {
                name: 'Prof. Ananya Nair',
                role: 'Head of Industry Alliances',
                dept: 'Corporate Partnerships',
                initial: 'A',
                color: 'from-violet-500 to-purple-600',
              },
              {
                name: 'Vikramaditya Rao',
                role: 'Lead Placement Officer',
                dept: 'Engineering & Technology',
                initial: 'V',
                color: 'from-cyan-500 to-blue-600',
              },
              {
                name: 'Meera Iyer',
                role: 'Student Relations Lead',
                dept: 'Career Guidance & Training',
                initial: 'M',
                color: 'from-emerald-500 to-teal-600',
              },
            ].map((member, idx) => (
              <div key={idx} className="card text-center p-6 flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-tr ${member.color} flex items-center justify-center text-xl font-bold text-white shadow-lg mb-4`}
                >
                  {member.initial}
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-xs text-primary-400 font-medium mt-0.5">{member.role}</p>
                <p className="text-xs text-slate-400 mt-1">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-800 py-6 text-center text-xs text-slate-500 bg-navy-950">
        CampusConnect Portal • Built for University Career Services
      </footer>
    </div>
  );
};

export default About;
