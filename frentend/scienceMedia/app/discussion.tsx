import MessageModal from '@/components/ui/model';
import { Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button } from '@react-navigation/elements';

export default function MessagesScreen() {


const {senderName , profileImage} = useLocalSearchParams();
const auth_user_id = 1
  const discussionData = [
    {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
{
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
{
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
{
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
{
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: 1,
    time: "12:30",
  },
  {
    message: "Hey, how are you?",
    senderId: senderName,
    time: "12:30",
  },
];
const [text, setText] = useState('');
const [inputHeight, setInputHeight] = useState(10); // Hauteur initiale
  return (
    <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 , backgroundColor: 'green', padding: 10, borderRadius: 10  }}>
            <Image source={{ uri: profileImage as string}} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{senderName}</Text>
        </View>
        <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            {discussionData.map((message, index) => (
                <View key={index} style={message.senderId === auth_user_id ? styles.messageSent : styles.messageReceived}>
                    <Text>{message.message}</Text>
                    <Text style={styles.time}>{message.time}</Text>
                </View>
            ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput

            onContentSizeChange={(event) => {
            // On vérifie si la donnée existe avant d'essayer de lire 'height'
            if (event.nativeEvent && event.nativeEvent.contentSize) {
              setInputHeight(event.nativeEvent.contentSize.height);
            }
          }}
          // On retire le onChange pour la hauteur s'il fait crash le projet
          onChangeText={(text) => {
            setText(text);
            if (text === '') setInputHeight(40); // Reset manuel si vide
          }}
            multiline={true}
            style={[styles.input ,{ height: Math.max(40, inputHeight) } ]}
            placeholder="Écrivez ici..."
            // onChangeText={(value) => setText(value)} // Met à jour l'état
            value={text} // Affiche la valeur de l'état
          />
          <Button style={[styles.button , { height: Math.max(40, inputHeight) } ]} onPress={() => {
            // Logique pour envoyer le message
            console.log("Message envoyé:", text);
            setText(''); // Réinitialise le champ de texte après l'envoi
          }}>
            Envoyer
          </Button>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  button:{
    width: '24%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    // alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Arial',
    backgroundColor: 'blue',
  },
  input:{
    height: 40,
    width: '75%',
    borderColor: 'gray',
    borderWidth: 0.,
    borderRadius: 20,
    paddingHorizontal: 10,
    // alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Arial',
    fontSize: 16,
    backgroundColor: 'orange',

  },
    messageSent: {
        marginTop: 10,
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    messageReceived: {
        marginTop: 10,
        backgroundColor: '#E5E5EA',
        alignSelf: 'flex-start',
    },
    time: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
});