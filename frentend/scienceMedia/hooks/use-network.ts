// hooks/use-network.ts
import { useCallback, useEffect, useRef } from 'react';
import { useNetworkStore } from '../store/network.store';
import { usersService } from '../services/users.service';
import type { Connection } from '../types/user.types';

const exampleSuggestions: Connection[] = [
  {
    id: '1',
    displayName: 'David Kim',
    specialty: 'Full Stack Developer at Stripe',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    mutualConnections: 15,
    isConnected: false,
  },
  {
    id: '2',
    displayName: 'Lisa Martinez',
    specialty: 'Marketing Director at Shopify',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    mutualConnections: 8,
    isConnected: false,
  },
  {
    id: '3',
    displayName: 'James Okafor',
    specialty: 'Product Manager at Notion',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    mutualConnections: 21,
    isConnected: false,
  },
];

export function useNetwork() {
  const {
    suggestions,
    isLoading,
    error,
    nextCursor,
    hasMore,
    setSuggestions,
    appendSuggestions,
    removeSuggestion,
    toggleConnect,
    setLoading,
    setError,
    setPagination,
  } = useNetworkStore();

  const isFirstLoadRef = useRef(true);

  const loadSuggestions = useCallback(async (refresh = false) => {
    if (isLoading) return;
    setLoading(true);
    setError(null);
    try {
      const cursor = refresh ? undefined : nextCursor;
      const res = await usersService.getSuggestions(cursor);
      if (refresh) setSuggestions(res.data);
      else appendSuggestions(res.data);
      setPagination(res.nextCursor, res.hasMore);
    } catch (err) {
      setError((err as Error).message);
      // Fallback to example data
      if (refresh) setSuggestions(exampleSuggestions);
      else appendSuggestions(exampleSuggestions);
    } finally {
      setLoading(false);
    }
  }, [isLoading, nextCursor, setLoading, setError, setSuggestions, appendSuggestions, setPagination]);

  const refresh = useCallback(() => loadSuggestions(true), [loadSuggestions]);

  const handleConnect = useCallback(
    async (userId: string) => {
      try {
        await usersService.connectUser(userId);
        toggleConnect(userId);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [toggleConnect, setError]
  );

  const handleDismiss = useCallback((userId: string) => {
    removeSuggestion(userId);
  }, [removeSuggestion]);

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      loadSuggestions();
    }
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    refresh,
    handleConnect,
    handleDismiss,
  };
}

// AOUAD ABDELKARIM
