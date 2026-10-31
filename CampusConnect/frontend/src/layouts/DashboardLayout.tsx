import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, LogOut, ExternalLink } from 'lucide-react';
import { getUnreadNotificationCountApi } from '../api/notifications';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      getUnreadNotificationCountApi()
        .then((res) => {
          if (res.data?.count !== undefined) {
            setUnreadCount(res.data.count);
          }
        })
        .catch(() => {
          // silently handle if backend not running
        });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-navy-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        role={user.role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-navy-900/90 backdrop-blur-md border-b border-navy-800 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 focus:outline-none"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white hidden sm:block">
              {user.role === 'STUDENT'
                ? 'Student Portal'
                : user.role === 'RECRUITER'
                ? 'Recruiter Workspace'
                : 'Administration Hub'}
            </h1>
          </div>

          {/* Right Header items */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to="/"
              target="_blank"
              title="View Public Site"
              className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Portal Home</span>
            </Link>

            {user.role === 'STUDENT' && (
              <Link
                to="/student/notifications"
                className="relative p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500 ring-2 ring-navy-900 animate-pulse" />
                )}
              </Link>
            )}

            <div className="h-6 w-px bg-navy-800" />

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-white truncate max-w-[140px]">
                  {user.fullName || user.email.split('@')[0]}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {user.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
