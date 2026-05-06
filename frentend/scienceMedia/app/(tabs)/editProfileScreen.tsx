import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function EditProfileScreen() {
  const router = useRouter();

  // États pour les champs du formulaire
  const [name, setName] = useState('Alexandre');
  const [email, setEmail] = useState('alex@example.com');
  const [bio, setBio] = useState('Développeur passionné par React Native et le design.');
  const [image, setImage] = useState('https://i.pravatar.cc/150?u=9');

  // Fonction pour changer l'image
  const pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ['images'],
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const handleSave = () => {
    console.log("Sauvegarde des données :", { name, email, bio, image });
    // Ici, ajoute ton appel API pour mettre à jour le profil
    router.back(); // Retourne à l'écran précédent après sauvegarde
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier Profil</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Terminé</Text>
          </TouchableOpacity>
        </View>

        {/* --- PHOTO DE PROFIL --- */}
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changePhotoText}>Modifier la photo de profil</Text>
          </TouchableOpacity>
        </View>

        {/* --- FORMULAIRE --- */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput 
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ton nom"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="ton-email@exemple.com"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput 
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              placeholder="Raconte quelque chose sur toi..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <Text style={styles.footerNote}>
          Ces informations seront visibles par les autres utilisateurs sur votre profil public.
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelText: {
    fontSize: 16,
    color: '#FF3B30',
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  imageSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#f0f0f0',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: '#007AFF',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoText: {
    marginTop: 15,
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top', // Important pour Android
  },
  footerNote: {
    paddingHorizontal: 30,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },
});