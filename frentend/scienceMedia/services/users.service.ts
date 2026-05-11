// services/users.service.ts
import { apiClient } from './api.client';
import type { Connection, PaginatedResponse, User } from '../types/user.types';

export const usersService = {
  getSuggestions: (cursor?: string) =>
    apiClient.get<PaginatedResponse<Connection>>(
      `/users/suggestions${cursor ? `?cursor=${cursor}` : ''}`
    ),

  connectUser: (userId: string) =>
    apiClient.post<{ isConnected: boolean }>(`/users/${userId}/connect`),

  disconnectUser: (userId: string) =>
    apiClient.delete<{ isConnected: boolean }>(`/users/${userId}/connect`),

  getConnections: (cursor?: string) =>
    apiClient.get<PaginatedResponse<User>>(
      `/users/connections${cursor ? `?cursor=${cursor}` : ''}`
    ),

  getUserById: (userId: string) =>
    apiClient.get<User>(`/users/${userId}`),
};

// AOUAD ABDELKARIM
