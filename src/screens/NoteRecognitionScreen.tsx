import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const NoteRecognitionScreen = () => {
  const noteExercises = [
    { name: 'Natural Notes', description: 'C, D, E, F, G, A, B' },
    { name: 'Sharp Notes', description: 'C#, D#, F#, G#, A#' },
    { name: 'Flat Notes', description: 'Db, Eb, Gb, Ab, Bb' },
    { name: 'Octave Recognition', description: 'Same note, different octaves' },
    { name: 'Random Notes', description: 'Mixed difficulty levels' },
    { name: 'Note Sequences', description: 'Multiple notes in sequence' },
  ];

  const handleExercisePress = (exerciseName: string) => {
    // TODO: Navigate to exercise detail screen
    console.log(`Selected exercise: ${exerciseName}`);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.backgroundBlur} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Note Recognition</Text>
          <Text style={styles.subtitle}>Train your ear to identify notes</Text>
          
          <View style={styles.cardsContainer}>
            {noteExercises.map((exercise, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.card}
                onPress={() => handleExercisePress(exercise.name)}
                activeOpacity={0.8}
              >
                <Text style={styles.cardTitle}>{exercise.name}</Text>
                <Text style={styles.cardDescription}>
                  {exercise.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#a855f7',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  cardsContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 22,
  },
});

export default NoteRecognitionScreen; 