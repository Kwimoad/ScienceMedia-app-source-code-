import { apiClient } from './api.client';
import type { Notification, PaginatedResponse } from '../types/notification.types';

export const notificationsService = {
  getNotifications: (cursor?: string) =>
    apiClient.get<PaginatedResponse<Notification>>(
      `/notifications${cursor ? `?cursor=${cursor}` : ''}`
    ),

  markAsRead: (notificationId: string) =>
    apiClient.patch<{ success: boolean }>(`/notifications/${notificationId}/read`),

  markAllAsRead: () =>
    apiClient.patch<{ success: boolean }>(`/notifications/read-all`),
};

// AOUAD ABDELKARIM
