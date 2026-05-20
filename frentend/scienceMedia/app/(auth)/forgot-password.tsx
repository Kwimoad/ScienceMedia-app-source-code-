import { useState } from 'react';
import {
     Image,
     KeyboardAvoidingView,
     Platform,
     Pressable,
     ScrollView,
     StyleSheet,
     Text,
     TextInput,
     View
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const resetPassword = () => {
    // Logique d'envoi du mail de récupération
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          
          {/* Logo */}
          <Image source={require('../../assets/images/icon.png')} style={styles.logo} />            
          
          {/* Header Texts */}
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address below and we'll send you instructions to reset your password.
          </Text>
          
          {/* Input */}
          <TextInput 
            style={styles.input} 
            placeholder="Email address" 
            placeholderTextColor="#999"
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          {/* Action Button */}
          <Pressable 
            style={({ pressed }) => [styles.resetButton, pressed && styles.buttonPressed]} 
            onPress={resetPassword}
          >
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Cohérence avec le reste de l'application
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    // Ombres élégantes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 20, // Plus d'espace entre les lignes de texte pour la lisibilité
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#212529',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.85,
  },
});