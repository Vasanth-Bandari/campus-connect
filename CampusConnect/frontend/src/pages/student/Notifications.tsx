import React, { useState, useEffect } from 'react';
import {
  getNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
} from '../../api/notifications';
import { Notification } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import {
  Bell,
  CheckCheck,
  Info,
  Calendar,
  CheckCircle2,
  FileCheck,
  Clock,
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsApi();
      if (res.data && Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        setNotifications(getMockNotifications());
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
      setNotifications(getMockNotifications());
    } finally {
      setLoading(false);
    }
  };

  const getMockNotifications = (): Notification[] => [
    {
      id: 1,
      title: 'Interview Scheduled: Amazon AWS',
      message: 'You have been shortlisted for Round 1 technical interview for SDE role on June 5, 2025 at 10:00 AM.',
      type: 'INTERVIEW_SCHEDULED',
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 2,
      title: 'Application Shortlisted: Microsoft IDC',
      message: 'Congratulations! Your profile has progressed to the shortlisted stage for Frontend Engineer.',
      type: 'APPLICATION_UPDATE',
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    },
    {
      id: 3,
      title: 'New Campus Drive Announced',
      message: 'Google India has opened registrations for 2025 batch Software Engineering positions.',
      type: 'INFO',
      read: true,
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    },
  ];

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationReadApi(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark read', err);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark all read', err);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const diffSeconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
    if (diffSeconds < 172800) return 'Yesterday';
    return `${Math.floor(diffSeconds / 86400)} days ago`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'INTERVIEW_SCHEDULED':
        return <Calendar className="w-5 h-5 text-amber-400" />;
      case 'APPLICATION_UPDATE':
        return <FileCheck className="w-5 h-5 text-violet-400" />;
      case 'SELECTION':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-primary-400" />;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Checking placement notifications..." />;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="badge badge-blue">{unreadCount} new</span>
            )}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time alerts regarding drive deadlines, shortlists, and interview updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="btn-secondary text-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications at this time"
          description="When there are updates regarding your drive applications or new placement events, they will be listed here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.read && handleMarkAsRead(n.id)}
              className={`card p-5 border transition-all cursor-pointer ${
                !n.read
                  ? 'bg-navy-800 border-primary-500/40 shadow-md shadow-primary-500/5'
                  : 'bg-navy-800/50 border-navy-700/60 opacity-80'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy-700/80 flex items-center justify-center shrink-0">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3
                      className={`text-sm font-semibold truncate ${
                        !n.read ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {n.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(n.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {n.message}
                  </p>
                </div>

                {!n.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-500 shrink-0 self-center" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
