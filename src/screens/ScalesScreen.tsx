import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const ScalesScreen = () => {
  const navigation = useNavigation();

  const handleInstrumentPress = (instrument: string) => {
    if (instrument === 'guitar') {
      navigation.navigate('GuitarScales' as never);
    } else if (instrument === 'piano') {
      navigation.navigate('PianoScales' as never);
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.backgroundBlur} />
      <View style={styles.content}>
        <Text style={styles.title}>Scales</Text>
        <Text style={styles.subtitle}>Choose your instrument</Text>
        
        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handleInstrumentPress('guitar')}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>Guitar Scales</Text>
            <Text style={styles.cardDescription}>
              Master guitar scale patterns and fingerings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => handleInstrumentPress('piano')}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>Piano Scales</Text>
            <Text style={styles.cardDescription}>
              Learn piano scales and hand positions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark slate background
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    width: '100%',
    gap: 20,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ScalesScreen;
