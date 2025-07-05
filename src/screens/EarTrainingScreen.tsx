import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EarTrainingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ear Training</Text>
      <Text style={styles.subtitle}>Develop your musical ear</Text>
      <Text style={styles.description}>
        Practice identifying intervals, chords, and melodies by ear.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6366f1',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EarTrainingScreen;
