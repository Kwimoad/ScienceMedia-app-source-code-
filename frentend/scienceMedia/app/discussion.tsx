import { Ionicons } from '@expo/vector-icons'; // Import des icônes
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity // Pour rendre les icônes cliquables
  ,

  View
} from 'react-native';

export default function DiscussionScreen() {
  const { senderName, profileImage } = useLocalSearchParams();
  const auth_user_id = 1;
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const discussionData = [
    { id: '1', message: "Hey, comment ça va ?", senderId: 1, time: "12:30" },
    { id: '2', message: "Ça va super, et toi ?", senderId: 2, time: "12:31" },
    { id: '3', message: "Pas mal, juste un peu fatigué.", senderId: 1, time: "12:32" },
    { id: '4', message: "Ah, je comprends. Repose-toi bien !", senderId: 2, time: "12:33" },
    { id: '5', message: "Merci, je vais me reposer un peu.", senderId: 1, time: "12:34" },
    { id: '6', message: "De rien, à plus tard !", senderId: 2, time: "12:35" },
    { id: '7', message: "À plus tard !", senderId: 1, time: "12:36" },
    { id: '8', message: "N'oublie pas de boire de l'eau !", senderId: 2, time: "12:37" },

  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: '#fff' }}
      keyboardVerticalOffset={90}
    >
      {/* --- HEADER AVEC APPEL VOICE & VIDEO --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: profileImage as string }} style={styles.headerAvatar} />
          <Text style={styles.headerName} numberOfLines={1}>{senderName}</Text>
        </View>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Appel Vidéo")}>
            <Ionicons name="videocam-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Appel Vocal")}>
            <Ionicons name="call-outline" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTE DES MESSAGES */}
      <FlatList
        data={discussionData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isMine = item.senderId === auth_user_id;
          return (
            <View style={[styles.messageBubble, isMine ? styles.messageSent : styles.messageReceived]}>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          );
        }}
      />

      {/* --- BARRE D'INPUT AVEC AJOUT DE FICHIER --- */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton} onPress={() => console.log("Ajouter fichier")}>
          <Ionicons name="add-circle-outline" size={30} color="#007AFF" />
        </TouchableOpacity>

        <TextInput
          multiline
          onChangeText={setText}
          value={text}
          style={[styles.input, { height: Math.max(40, Math.min(100, inputHeight)) }]}
          placeholder="Message..."
          placeholderTextColor="#888"
        />

        {text.length > 0 ? (
          <TouchableOpacity onPress={() => setText('')}>
            <Ionicons name="send" size={26} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => console.log("Audio record")}>
            <Ionicons name="mic-outline" size={26} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  headerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    maxWidth: '70%',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
  listContent: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
  },
  messageSent: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  messageReceived: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  time: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  attachButton: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
    color: '#000',
  },
});