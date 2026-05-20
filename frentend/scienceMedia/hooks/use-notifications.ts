import { useCallback, useEffect, useRef } from 'react';
import { useNotificationsStore } from '../store/notifications.store';
import { notificationsService } from '../services/notifications.service';
import type { Notification } from '../types/notification.types';

const exampleNotifications: Notification[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    action: 'accepted your connection request',
    time: '5m ago',
    read: false,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    icon: '👤',
    iconColor: '#0A66C2',
  },
  {
    id: '2',
    name: 'Michael Chen',
    action: 'liked your post',
    time: '1h ago',
    read: false,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    icon: '👍',
    iconColor: '#0A66C2',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    action: 'commented on your post',
    time: '2h ago',
    read: false,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    icon: '💬',
    iconColor: '#0A66C2',
  },
  {
    id: '4',
    name: 'LinkedIn Jobs',
    action: '5 new jobs match your preferences',
    time: '4h ago',
    read: true,
    avatar: null,
    isSystem: true,
    systemIcon: '💼',
    iconColor: '#0A66C2',
  },
  {
    id: '5',
    name: 'LinkedIn',
    action: 'Your profile had 47 views this week',
    time: '1d ago',
    read: true,
    avatar: null,
    isSystem: true,
    systemIcon: '📈',
    iconColor: '#0A66C2',
  },
  {
    id: '6',
    name: 'David Kim',
    action: 'wants to connect',
    time: '1d ago',
    read: true,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    icon: '👤',
    iconColor: '#0A66C2',
  },
  {
    id: '7',
    name: 'Lisa Martinez',
    action: 'and 12 others liked your post',
    time: '2d ago',
    read: true,
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    icon: '👍',
    iconColor: '#0A66C2',
  },
  {
    id: '8',
    name: 'James Wilson',
    action: 'shared your post',
    time: '3d ago',
    read: true,
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    icon: '🔁',
    iconColor: '#0A66C2',
  },
];

export function useNotifications() {
  const {
    notifications,
    isLoading,
    error,
    nextCursor,
    hasMore,
    setNotifications,
    appendNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    setLoading,
    setError,
    setPagination,
  } = useNotificationsStore();

  const isFirstLoadRef = useRef(true);

  const loadNotifications = useCallback(
    async (refresh = false) => {
      if (isLoading) return;
      setLoading(true);
      setError(null);
      try {
        const cursor = refresh ? undefined : nextCursor;
        const res = await notificationsService.getNotifications(cursor);
        if (refresh) setNotifications(res.data);
        else appendNotifications(res.data);
        setPagination(res.nextCursor, res.hasMore);
        isFirstLoadRef.current = false;
      } catch {
        if (refresh || isFirstLoadRef.current) {
          setNotifications(exampleNotifications);
          setPagination(undefined, false);
        }
        setError(null);
      } finally {
        setLoading(false);
      }
    },
    [
      isLoading,
      nextCursor,
      setLoading,
      setError,
      setNotifications,
      appendNotifications,
      setPagination,
    ]
  );

  const refresh = useCallback(() => loadNotifications(true), [loadNotifications]);

  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      markNotificationRead(notificationId);
      try {
        await notificationsService.markAsRead(notificationId);
      } catch {
        setError('Impossible de marquer la notification comme lue.');
      }
    },
    [markNotificationRead, setError]
  );

  const handleMarkAllRead = useCallback(async () => {
    markAllNotificationsRead();
    try {
      await notificationsService.markAllAsRead();
    } catch {
      setError('Impossible de marquer toutes les notifications comme lues.');
    }
  }, [markAllNotificationsRead, setError]);

  useEffect(() => {
    loadNotifications(true);
  }, []);

  return {
    notifications,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore: () => {
      if (hasMore) loadNotifications(false);
    },
    handleMarkAsRead,
    handleMarkAllRead,
  };
}

// AOUAD ABDELKARIM
