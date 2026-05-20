import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNotifications } from '../../hooks/use-notifications';
import type { Notification } from '../../types/notification.types';

function useDebounce(value: string, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}

const Avatar = ({ item }: { item: Notification }) => {
  if (item.isSystem) {
    return (
      <View style={[styles.avatarContainer, styles.systemAvatar]}>
        <Text style={styles.systemIcon}>{item.systemIcon}</Text>
      </View>
    );
  }

  return (
    <View style={styles.avatarWrapper}>
      <Image source={{ uri: item.avatar ?? undefined }} style={styles.avatarImage} />
      <View style={[styles.iconBadge, { backgroundColor: item.iconColor }]}>
        <Text style={styles.iconBadgeText}>{item.icon ?? '🔔'}</Text>
      </View>
    </View>
  );
};

const NotificationCard = ({
  item,
  onPress,
}: {
  item: Notification;
  onPress: (id: string) => void;
}) => (
  <TouchableOpacity
    style={[styles.notifItem, !item.read && styles.notifUnread]}
    onPress={() => onPress(item.id)}
    activeOpacity={0.7}
  >
    <Avatar item={item} />
    <View style={styles.notifContent}>
      <Text style={styles.notifText} numberOfLines={2}>
        <Text style={styles.notifName}>{item.name}</Text>{' '}
        <Text style={styles.notifAction}>{item.action}</Text>
      </Text>
      <Text style={styles.notifTime}>{item.time}</Text>
    </View>
    {!item.read && <View style={styles.unreadDot} />}
  </TouchableOpacity>
);

export default function NotificationsScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    notifications,
    isLoading,
    error,
    refresh,
    handleMarkAsRead,
    handleMarkAllRead,
  } = useNotifications();

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesFilter = activeFilter === 'all' || !notification.read;
      if (!matchesFilter) return false;

      if (!query) return true;

      return [notification.name, notification.action]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [notifications, activeFilter, debouncedSearchQuery]);

  const showInitialLoader = isLoading && notifications.length === 0;

  const renderNotification = useCallback(
    ({ item }: { item: Notification }) => (
      <NotificationCard item={item} onPress={handleMarkAsRead} />
    ),
    [handleMarkAsRead]
  );

  const renderListHeader = useCallback(
    () => (
      <View>
        <View style={styles.topBar}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
            style={styles.topAvatar}
          />
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une notification"
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Notifications</Text>

          {unreadCount > 0 ? (
            <TouchableOpacity onPress={handleMarkAllRead} style={styles.markAllBtn}>
              <Text style={styles.markAllText}>Tout marquer comme lu</Text>
            </TouchableOpacity>
          ) : null}

          {error ? <Text style={styles.helperText}>{error}</Text> : null}

          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === 'all' && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter('all')}
            >
              <Text
                style={[
                  styles.filterChipLabel,
                  activeFilter === 'all' && styles.filterChipLabelActive,
                ]}
              >
                Toutes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === 'unread' && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter('unread')}
            >
              <Text
                style={[
                  styles.filterChipLabel,
                  activeFilter === 'unread' && styles.filterChipLabelActive,
                ]}
              >
                Non lues ({unreadCount})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [searchQuery, unreadCount, handleMarkAllRead, activeFilter, error]
  );

  const renderListEmpty = useCallback(
    () =>
      showInitialLoader ? (
        <View style={styles.stateCard}>
          <ActivityIndicator color="#0A66C2" />
          <Text style={styles.stateTitle}>Chargement des notifications...</Text>
        </View>
      ) : (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>Aucune notification trouvée</Text>
          <Text style={styles.stateSubtitle}>
            Changez le filtre, la recherche, ou rafraîchissez la liste.
          </Text>
        </View>
      ),
    [showInitialLoader]
  );

  const keyExtractor = useCallback((item: Notification) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <FlatList
        data={filteredNotifications}
        keyExtractor={keyExtractor}
        renderItem={renderNotification}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={8}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
        windowSize={15}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2ef',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    backgroundColor: '#fff',
  },
  topAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f2ef',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    gap: 6,
  },
  searchIcon: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  headerCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  markAllBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: '#E8F1FB',
  },
  markAllText: {
    fontSize: 13,
    color: '#0A66C2',
    fontWeight: '600',
  },
  helperText: {
    color: '#b42318',
    fontSize: 13,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterChip: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#fff',
  },
  filterChipActive: {
    backgroundColor: '#0A66C2',
    borderColor: '#0A66C2',
  },
  filterChipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#344054',
  },
  filterChipLabelActive: {
    color: '#fff',
  },

  listContent: {
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 80,
  },

  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  notifUnread: {
    backgroundColor: '#EBF3FB',
  },
  notifContent: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  notifText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1A1A1A',
  },
  notifName: {
    fontWeight: '700',
    color: '#000',
  },
  notifAction: {
    fontWeight: '400',
    color: '#3D3D3D',
  },
  notifTime: {
    marginTop: 3,
    fontSize: 12,
    color: '#888',
    fontWeight: '400',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A66C2',
    marginLeft: 6,
    flexShrink: 0,
  },

  avatarWrapper: {
    width: 52,
    height: 52,
    position: 'relative',
    flexShrink: 0,
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  systemAvatar: {
    backgroundColor: '#E8F1FB',
    borderWidth: 1.5,
    borderColor: '#C5DCF5',
  },
  systemIcon: {
    fontSize: 22,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  iconBadgeText: {
    fontSize: 10,
  },

  stateCard: {
    marginHorizontal: 12,
    marginTop: 8,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 8,
  },
  stateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  stateSubtitle: {
    textAlign: 'center',
    fontSize: 13,
    color: '#667085',
  },
});
