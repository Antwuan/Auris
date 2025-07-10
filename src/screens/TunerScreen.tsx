import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import PitchDetector, { guitarStrings } from '../utils/tuner/pitchDetector';
import DeviationMeter from '../components/DeviationMeter';

interface DetectedPitch {
  frequency: number;
  note: keyof typeof guitarStrings | '';
  deviation: number;
  volume?: number;
  rawMetering?: number;
  isRecording?: boolean;
  durationMillis?: number;
  error?: string;
  confidence?: number;
}

const DEBOUNCE_MS = 350;

const TunerScreen = () => {
  const [detected, setDetected] = useState<DetectedPitch>({
    frequency: 0,
    note: '',
    deviation: 0,
    volume: 0,
  });
  const [activePitch, setActivePitch] = useState<DetectedPitch>(detected);
  const [listening, setListening] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const detectorRef = useRef<PitchDetector | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    detectorRef.current = new PitchDetector((result: DetectedPitch) => {
      setDetected(result);
      // The pitch detector now handles volume threshold internally
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        setActivePitch(result);
      }, DEBOUNCE_MS);
    });
    
    const startDetector = async () => {
      try {
        await detectorRef.current!.start();
        setListening(true);
        setDebugInfo('Pitch detector started successfully');
      } catch (error) {
        setDebugInfo(`Error starting detector: ${error}`);
        console.error('Error starting pitch detector:', error);
      }
    };
    
    startDetector();
    
    return () => {
      if (detectorRef.current) detectorRef.current.stop();
      setListening(false);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  const { note, deviation, volume, rawMetering, isRecording, durationMillis, error, frequency, confidence } = activePitch;
  const stringFreq = note && guitarStrings[note as keyof typeof guitarStrings] ? guitarStrings[note as keyof typeof guitarStrings] : 0;
  const stringLetter = note ? note[0] : '--';
  const isTooQuiet = (detected.volume || 0) <= 0.1; // Much lower threshold for testing

  // Volume meter as 10 circles
  const volumeLevel = Math.round(((detected.volume || 0) * 10));
  const circles = Array.from({ length: 10 }).map((_, i) => (
    <View
      key={i}
      style={[styles.volumeDot, i < volumeLevel ? styles.volumeDotFilled : styles.volumeDotEmpty]}
    />
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Guitar Tuner</Text>
      
      {/* Note Display */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          {note || '--'}
        </Text>
        <Text style={styles.frequencyText}>
          {frequency > 0 ? `${frequency.toFixed(1)} Hz` : 'No signal'}
        </Text>
      </View>
      
      <DeviationMeter deviation={deviation} stringFreq={stringFreq || 110} stringName={stringLetter} />
      <Text style={styles.stringLabel}>
        {note ? `${note} String` : 'Play an open string'}
      </Text>
      <Text style={styles.status}>
        {listening ? (isTooQuiet ? 'Too quiet...' : 'Listening...') : 'Stopped'}
      </Text>
      
      {/* Debug Information */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>Debug Info:</Text>
        <Text style={styles.debugText}>{debugInfo}</Text>
        <Text style={styles.debugText}>Raw Metering: {(detected.rawMetering || 0).toFixed(1)}</Text>
        <Text style={styles.debugText}>Volume: {(detected.volume || 0).toFixed(3)}</Text>
        <Text style={styles.debugText}>Recording: {detected.isRecording ? 'Yes' : 'No'}</Text>
        <Text style={styles.debugText}>Duration: {detected.durationMillis || 0}ms</Text>
        <Text style={styles.debugText}>Confidence: {(detected.confidence || 0).toFixed(3)}</Text>
        <Text style={styles.debugText}>Threshold: 0.1</Text>
        {detected.error && (
          <Text style={[styles.debugText, styles.errorText]}>Error: {detected.error}</Text>
        )}
      </View>
      
      {/* Volume Meter Circles */}
      <View style={styles.volumeDotsRow}>{circles}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#a855f7',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  noteText: {
    fontSize: 48,
    color: '#f59e42',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  frequencyText: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  stringLabel: {
    fontSize: 20,
    color: '#f59e42',
    marginTop: 18,
    fontWeight: '600',
  },
  status: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 10,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    width: '100%',
  },
  debugText: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  errorText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  volumeDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 10,
    gap: 8,
  },
  volumeDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 2,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
  },
  volumeDotFilled: {
    backgroundColor: '#fff',
    opacity: 1,
  },
  volumeDotEmpty: {
    backgroundColor: '#fff',
    opacity: 0.18,
  },
});

export default TunerScreen; 