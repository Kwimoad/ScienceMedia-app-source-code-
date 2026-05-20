import { create } from 'zustand';
import type { Notification } from '../types/notification.types';

interface NotificationsState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  nextCursor?: string;
  hasMore: boolean;

  setNotifications: (items: Notification[]) => void;
  appendNotifications: (items: Notification[]) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
  setPagination: (cursor?: string, hasMore?: boolean) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  isLoading: false,
  error: null,
  hasMore: true,

  setNotifications: (items) => set({ notifications: items }),
  appendNotifications: (items) =>
    set((state) => ({ notifications: [...state.notifications, ...items] })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item
      ),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true })),
    })),

  setLoading: (value) => set({ isLoading: value }),
  setError: (message) => set({ error: message }),
  setPagination: (cursor, hasMore = true) => set({ nextCursor: cursor, hasMore }),
}));

// AOUAD ABDELKARIM
