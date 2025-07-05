import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScalesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scales</Text>
      <Text style={styles.subtitle}>Learn and practice scales</Text>
      <Text style={styles.description}>
        Master major, minor, and other scale patterns to improve your playing.
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

export default ScalesScreen;
