export interface User {
  id: string;
  displayName: string;
  specialty: string;
  avatarUrl?: string;
  mutualConnections?: number;
  bio?: string;
  isConnected?: boolean;
}

export interface Connection extends User {
  mutualConnections: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
}

// AOUAD ABDELKARIM
