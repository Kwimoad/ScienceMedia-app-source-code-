import { Image, StyleSheet, Text, View } from 'react-native';

interface MessageModalProps {
  profileImage: string;
  senderName: string;
  lastMessage: string;
  numbrNewMessage?: number;
}

export default function MessageModal({ 
  profileImage, 
  senderName, 
  lastMessage, 
  numbrNewMessage 
}: MessageModalProps) {
  return (
    <View style={styles.container}>
      {/* Image de profil */}
      <Image source={{ uri: profileImage }} style={styles.avatar} />

      {/* Contenu textuel */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {senderName}
          </Text>
          {numbrNewMessage && numbrNewMessage > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{numbrNewMessage}</Text>
            </View>
          ) : null}
        </View>
        
        <Text style={styles.message} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000', // Forcer le noir pour éviter le problème du mode sombre
  },
  message: {
    fontSize: 14,
    color: '#666', // Gris foncé pour le message
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});