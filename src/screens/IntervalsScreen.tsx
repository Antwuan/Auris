import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const IntervalsScreen = () => {
  const intervalExercises = [
    { name: 'Perfect Unison', description: 'Same note played together' },
    { name: 'Minor Second', description: 'Half step interval (C to C#)' },
    { name: 'Major Second', description: 'Whole step interval (C to D)' },
    { name: 'Minor Third', description: 'Three half steps (C to Eb)' },
    { name: 'Major Third', description: 'Four half steps (C to E)' },
    { name: 'Perfect Fourth', description: 'Five half steps (C to F)' },
    { name: 'Perfect Fifth', description: 'Seven half steps (C to G)' },
    { name: 'Minor Sixth', description: 'Eight half steps (C to Ab)' },
    { name: 'Major Sixth', description: 'Nine half steps (C to A)' },
    { name: 'Minor Seventh', description: 'Ten half steps (C to Bb)' },
    { name: 'Major Seventh', description: 'Eleven half steps (C to B)' },
    { name: 'Perfect Octave', description: 'Twelve half steps (C to C)' },
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
          <Text style={styles.title}>Intervals</Text>
          <Text style={styles.subtitle}>Learn to recognize intervals by ear</Text>
          
          <View style={styles.cardsContainer}>
            {intervalExercises.map((exercise, index) => (
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

export default IntervalsScreen; 