import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const GuitarScalesScreen = () => {
  const guitarScales = [
    { name: 'Major Scale', description: 'The foundation of Western music' },
    { name: 'Minor Scale', description: 'Natural, harmonic, and melodic variations' },
    { name: 'Pentatonic Scale', description: 'Five-note scale for blues and rock' },
    { name: 'Blues Scale', description: 'Minor pentatonic with blue note' },
    { name: 'Dorian Mode', description: 'Jazz and fusion favorite' },
    { name: 'Mixolydian Mode', description: 'Dominant 7th sound' },
  ];

  const handleScalePress = (scaleName: string) => {
    // TODO: Navigate to scale detail screen
    console.log(`Selected scale: ${scaleName}`);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.backgroundBlur} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Guitar Scales</Text>
          <Text style={styles.subtitle}>Master essential scale patterns</Text>
          
          <View style={styles.cardsContainer}>
            {guitarScales.map((scale, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.card}
                onPress={() => handleScalePress(scale.name)}
                activeOpacity={0.8}
              >
                <Text style={styles.cardTitle}>{scale.name}</Text>
                <Text style={styles.cardDescription}>
                  {scale.description}
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

export default GuitarScalesScreen; 