import React from 'react';
import { NavLink } from 'react-router-dom';
import { Role } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  FileCheck,
  Calendar,
  Bell,
  Building2,
  PlusCircle,
  Users,
  ShieldCheck,
  Building,
  Target,
  BarChart3,
  X,
  GraduationCap,
} from 'lucide-react';

interface SidebarProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const { user } = useAuth();

  const studentLinks: NavItem[] = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Resume Upload', path: '/student/resume', icon: FileText },
    { name: 'Job Listings', path: '/student/jobs', icon: Briefcase },
    { name: 'My Applications', path: '/student/applications', icon: FileCheck },
    { name: 'Interviews', path: '/student/interviews', icon: Calendar },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
  ];

  const recruiterLinks: NavItem[] = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Company Profile', path: '/recruiter/company', icon: Building2 },
    { name: 'Post New Job', path: '/recruiter/jobs/create', icon: PlusCircle },
    { name: 'My Jobs', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Applicants', path: '/recruiter/applicants', icon: Users },
    { name: 'Interviews', path: '/recruiter/interviews', icon: Calendar },
  ];

  const adminLinks: NavItem[] = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: GraduationCap },
    { name: 'Recruiters', path: '/admin/recruiters', icon: Users },
    { name: 'Companies', path: '/admin/companies', icon: Building },
    { name: 'All Jobs', path: '/admin/jobs', icon: Briefcase },
    { name: 'Applications', path: '/admin/applications', icon: FileCheck },
    { name: 'Campus Drives', path: '/admin/drives', icon: Target },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const links =
    role === 'STUDENT'
      ? studentLinks
      : role === 'RECRUITER'
      ? recruiterLinks
      : adminLinks;

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return 'badge-violet';
      case 'RECRUITER':
        return 'badge-blue';
      case 'STUDENT':
        return 'badge-green';
      default:
        return 'badge-blue';
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-900 border-r border-navy-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Campus<span className="text-primary-500">Connect</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-4 bg-navy-800/70 border border-navy-700/80 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.fullName || user?.email.split('@')[0]}
            </p>
            <span className={getRoleBadge(role)}>
              {role}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-navy-800 text-center">
          <p className="text-xs text-slate-500 font-mono">v1.0.0 • CampusConnect</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
