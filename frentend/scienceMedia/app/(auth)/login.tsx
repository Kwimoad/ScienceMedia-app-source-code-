import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MessagesScreen() {
    const login = ()=>{

    }

    const loginWithGoogle = ()=>{

    }
    const [password , setPassword  ] = useState('')

    const [email , setEmail  ] = useState('')


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
            <Image source={require('../../assets/images/icon.png')} style={styles.logo} />            
            <Text style={styles.welcomeText}>Welcome in science media </Text>
            <Text style={styles.detailsText}>Please enter your details</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Link href="/(auth)/forgot-password" style={{ marginBottom: 20 }}>
                <Text style={{ color: 'blue' }}>Forgot Password?</Text>
            </Link>
            <Pressable onPress={login}>
                <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <Pressable  onPress={loginWithGoogle}>
                <Text style={styles.loginWithGoogleButtonText}>Login with Google</Text>
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
   container:{
        width: '85%',
        alignSelf: 'center',
        margin: 20,
        padding: 5,
        backgroundColor: '#fff',
   },
   logo:{
     width: 200,
     height: 200,
     alignSelf: 'center',
     marginBottom: 30,
     marginTop: 30,
   },
   welcomeText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
         textAlign: 'center',
         fontFamily: 'sans-serif',
   },
   detailsText:{
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
         textAlign: 'center',
          fontFamily: 'sans-serif',
   },
   input:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
   },
   loginButtonText:{
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
        color: '#fff',
   },
   loginWithGoogleButtonText:{
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
   }
});