import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MessagesScreen() {
    const resetPassword = ()=>{

    }

    const loginWithGoogle = ()=>{

    }
    const [password , setPassword  ] = useState('')

    const [email , setEmail  ] = useState('')


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
            <Image source={require('../../assets/images/icon.png')} style={styles.logo} />            
            <Text style={styles.title}>Please enter your email to reset your password</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <Pressable onPress={resetPassword}>
                <Text style={styles.loginButtonText}>Reset Password</Text>
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
   title:{
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