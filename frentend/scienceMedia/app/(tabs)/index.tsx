import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { PostCard } from '../../components/feed/PostCard';
import { useFeed } from '../../hooks/use-posts';
import type { Post } from '../../types/post.types';

// ─── Composant principal App ──────────────────────────────────────────────────

export default function App(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { feed, isLoading, error, refresh, handleLike } = useFeed();

  const filteredFeed = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return feed;

    return feed.filter((post) => {
      return [
        post.title,
        post.excerpt,
        post.author.displayName,
        post.author.specialty,
        ...(post.tags ?? []),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [feed, searchQuery]);

  const showInitialLoader = isLoading && feed.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <FlatList
        data={filteredFeed}
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item }) => <PostCard post={item} onLike={handleLike} />}
        contentContainerStyle={styles.feedContent}
        ListHeaderComponent={
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
                  placeholder="Rechercher"
                  placeholderTextColor="#6B7280"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            <View style={styles.createCard}>
              <View style={styles.createTop}>
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                  style={styles.createAvatar}
                />
                <TouchableOpacity style={styles.createInput} activeOpacity={0.85}>
                  <Text style={styles.createPlaceholder}>Démarrer un post</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.createActions}>
                {[
                  { icon: '🖼️', label: 'Photo' },
                  { icon: '🎥', label: 'Vidéo' },
                  { icon: '📄', label: 'Document' },
                  { icon: '📅', label: 'Réunion' },
                ].map((btn) => (
                  <TouchableOpacity key={btn.label} style={styles.createBtn}>
                    <Text style={styles.createBtnIcon}>{btn.icon}</Text>
                    <Text style={styles.createBtnLabel}>{btn.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {error ? <Text style={styles.helperText}>{error}</Text> : null}
          </View>
        }
        ListEmptyComponent={
          showInitialLoader ? (
            <View style={styles.stateCard}>
              <ActivityIndicator color="#0a7ea4" />
              <Text style={styles.stateTitle}>Chargement du fil...</Text>
            </View>
          ) : (
            <View style={styles.stateCard}>
              <Text style={styles.stateTitle}>Aucun post trouvé</Text>
              <Text style={styles.stateSubtitle}>Essayez une autre recherche ou rafraîchissez le fil.</Text>
            </View>
          )
        }
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2ef',
  },
  feedContent: {
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
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
  createCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 12,
  },
  createTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  createAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  createInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createPlaceholder: {
    color: '#555',
    fontSize: 15,
  },
  createActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
  },
  createBtnIcon: {
    fontSize: 18,
  },
  createBtnLabel: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  helperText: {
    marginHorizontal: 12,
    marginBottom: 8,
    color: '#b42318',
    fontSize: 13,
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

// AOUAD ABDELKARIM