import api from './axios';
import { Notification } from '../types';

export const getNotificationsApi = () =>
  api.get<Notification[]>('/notifications');

export const markNotificationReadApi = (id: number | string) =>
  api.put<Notification>(`/notifications/${id}/read`);

export const markAllNotificationsReadApi = () =>
  api.put('/notifications/read-all');

export const getUnreadNotificationCountApi = () =>
  api.get<{ count: number }>('/notifications/unread-count');
