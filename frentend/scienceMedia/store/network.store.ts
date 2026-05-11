// store/network.store.ts
import { create } from 'zustand';
import type { Connection } from '../types/user.types';

interface NetworkState {
  suggestions: Connection[];
  isLoading: boolean;
  error: string | null;
  nextCursor?: string;
  hasMore: boolean;

  setSuggestions: (users: Connection[]) => void;
  appendSuggestions: (users: Connection[]) => void;
  removeSuggestion: (userId: string) => void;
  toggleConnect: (userId: string) => void;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  setPagination: (cursor?: string, hasMore?: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  suggestions: [],
  isLoading: false,
  error: null,
  hasMore: true,

  setSuggestions: (users) => set({ suggestions: users }),
  appendSuggestions: (users) => set((s) => ({ suggestions: [...s.suggestions, ...users] })),

  removeSuggestion: (userId) =>
    set((s) => ({
      suggestions: s.suggestions.filter((u) => u.id !== userId),
    })),

  toggleConnect: (userId) =>
    set((s) => ({
      suggestions: s.suggestions.map((u) =>
        u.id === userId ? { ...u, isConnected: !u.isConnected } : u
      ),
    })),

  setLoading: (v) => set({ isLoading: v }),
  setError: (msg) => set({ error: msg }),
  setPagination: (cursor, hasMore = true) =>
    set({ nextCursor: cursor, hasMore }),
}));

// AOUAD ABDELKARIM
