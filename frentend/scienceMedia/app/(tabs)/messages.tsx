import MessageModal from '@/components/ui/model';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MessagesScreen() {
    const messages = [
        { id: '1', name: 'Alice', lastMessage: 'Hey, how are you?', numberNewMessages: 2, image: 'https://i.pravatar.cc/150?u=1' },
        { id: '2', name: 'Bob', lastMessage: 'See you later!', numberNewMessages: 1, image: 'https://i.pravatar.cc/150?u=2' },
        { id: '3', name: 'Charlie', lastMessage: 'Projet terminé ?', numberNewMessages: 0, image: 'https://i.pravatar.cc/150?u=3' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Barre de recherche */}
            <View style={styles.topBar}>
                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher"
                        placeholderTextColor="#888"
                    />
                </View>
            </View>

            {/* Liste des messages */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.messageWrapper}>
                        <MessageModal 
                            profileImage={item.image} 
                            senderName={item.name} 
                            lastMessage={item.lastMessage} 
                            numbrNewMessage={item.numberNewMessages} 
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    topBar: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f2f5', // Couleur plus douce type mobile
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 45,
    },
    searchIcon: { 
        fontSize: 16,
        marginRight: 8 
    },
    searchInput: { 
        flex: 1, 
        fontSize: 16,
        color: '#000' 
    },
    listContent: {
        paddingVertical: 5,
    },
    messageWrapper: {
        width: '100%', // Prend toute la largeur
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f0f0', // Ligne de séparation entre messages
    },
});