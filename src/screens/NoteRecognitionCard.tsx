import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NoteRecognitionCard: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('NoteRecognition')}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="musical-notes" size={32} color="#a855f7" />
      </View>
      <Text style={styles.title}>Note Recognition</Text>
      <Text style={styles.description}>
        Train your ear to identify notes by sound
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30,41,59,0.95)',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  iconContainer: {
    marginBottom: 10,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a855f7',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#f8fafc',
    textAlign: 'center',
    opacity: 0.85,
  },
});

export default NoteRecognitionCard; 