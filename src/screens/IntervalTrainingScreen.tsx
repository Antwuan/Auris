import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';

interface Interval {
  name: string;
  shortName: string;
  semitones: number;
  description: string;
}

interface Note {
  name: string;
  frequency: number;
}

const IntervalsComingSoonScreen = () => {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);
  const [rootNote, setRootNote] = useState<Note | null>(null);
  const [direction, setDirection] = useState<'ascending' | 'descending' | 'both'>('ascending');
  const [selectedInterval, setSelectedInterval] = useState<string>('');
  const [selectedIntervals, setSelectedIntervals] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Available intervals with short names
  const intervals: Interval[] = [
    { name: 'Perfect Unison', shortName: 'Unison', semitones: 0, description: 'Same note' },
    { name: 'Minor Second', shortName: 'Min 2nd', semitones: 1, description: 'Half step' },
    { name: 'Major Second', shortName: 'Maj 2nd', semitones: 2, description: 'Whole step' },
    { name: 'Minor Third', shortName: 'Min 3rd', semitones: 3, description: 'Three half steps' },
    { name: 'Major Third', shortName: 'Maj 3rd', semitones: 4, description: 'Four half steps' },
    { name: 'Perfect Fourth', shortName: 'Perf 4th', semitones: 5, description: 'Five half steps' },
    { name: 'Perfect Fifth', shortName: 'Perf 5th', semitones: 7, description: 'Seven half steps' },
    { name: 'Minor Sixth', shortName: 'Min 6th', semitones: 8, description: 'Eight half steps' },
    { name: 'Major Sixth', shortName: 'Maj 6th', semitones: 9, description: 'Nine half steps' },
    { name: 'Minor Seventh', shortName: 'Min 7th', semitones: 10, description: 'Ten half steps' },
    { name: 'Major Seventh', shortName: 'Maj 7th', semitones: 11, description: 'Eleven half steps' },
    { name: 'Perfect Octave', shortName: 'Octave', semitones: 12, description: 'Twelve half steps' },
  ];

  // Available notes (C3 to C5 range)
  const notes: Note[] = [
    { name: 'C3', frequency: 130.81 },
    { name: 'C#3', frequency: 138.59 },
    { name: 'D3', frequency: 146.83 },
    { name: 'D#3', frequency: 155.56 },
    { name: 'E3', frequency: 164.81 },
    { name: 'F3', frequency: 174.61 },
    { name: 'F#3', frequency: 185.00 },
    { name: 'G3', frequency: 196.00 },
    { name: 'G#3', frequency: 207.65 },
    { name: 'A3', frequency: 220.00 },
    { name: 'A#3', frequency: 233.08 },
    { name: 'B3', frequency: 246.94 },
    { name: 'C4', frequency: 261.63 },
    { name: 'C#4', frequency: 277.18 },
    { name: 'D4', frequency: 293.66 },
    { name: 'D#4', frequency: 311.13 },
    { name: 'E4', frequency: 329.63 },
    { name: 'F4', frequency: 349.23 },
    { name: 'F#4', frequency: 369.99 },
    { name: 'G4', frequency: 392.00 },
    { name: 'G#4', frequency: 415.30 },
    { name: 'A4', frequency: 440.00 },
    { name: 'A#4', frequency: 466.16 },
    { name: 'B4', frequency: 493.88 },
    { name: 'C5', frequency: 523.25 },
  ];

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const handleIntervalToggle = (intervalName: string) => {
    setSelectedIntervals(prev => 
      prev.includes(intervalName) 
        ? prev.filter(name => name !== intervalName)
        : [...prev, intervalName]
    );
  };

  const handleStartQuiz = () => {
    if (selectedIntervals.length < 2) {
      Alert.alert('Not Enough Intervals', 'Please select at least 2 intervals to practice.');
      return;
    }
    setIsQuizMode(true);
    generateNewQuestion();
  };

  const handleBackToSettings = () => {
    setIsQuizMode(false);
    setSelectedInterval('');
    setScore({ correct: 0, total: 0 });
  };

  const generateNewQuestion = () => {
    const availableIntervals = intervals.filter(interval => selectedIntervals.includes(interval.name));
    const randomInterval = availableIntervals[Math.floor(Math.random() * availableIntervals.length)];
    const randomRootIndex = Math.floor(Math.random() * (notes.length - randomInterval.semitones));
    const rootNote = notes[randomRootIndex];
    
    setCurrentInterval(randomInterval);
    setRootNote(rootNote);
    setSelectedInterval('');
  };

  const playTone = async (frequency: number, duration: number = 1000) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `data:audio/wav;base64,${generateTone(frequency, duration)}` },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      setTimeout(() => {
        setIsPlaying(false);
      }, duration);
    } catch (error) {
      console.error('Error playing tone:', error);
    }
  };

  const generateTone = (frequency: number, duration: number): string => {
    // Simplified tone generation - in a real app, you'd use actual audio files
    // This is a placeholder for the audio generation
    return '';
  };

  const playInterval = async () => {
    if (!currentInterval || !rootNote) return;

    const rootFreq = rootNote.frequency;
    const intervalFreq = notes.find(note => 
      note.name === notes[notes.findIndex(n => n.name === rootNote.name) + currentInterval.semitones]?.name
    )?.frequency || rootFreq;

    if (direction === 'ascending' || (direction === 'both' && Math.random() > 0.5)) {
      await playTone(rootFreq, 800);
      setTimeout(() => playTone(intervalFreq, 800), 900);
    } else {
      await playTone(intervalFreq, 800);
      setTimeout(() => playTone(rootFreq, 800), 900);
    }
  };

  const playGuessedInterval = async (guessedInterval: Interval) => {
    if (!rootNote) return;

    const rootFreq = rootNote.frequency;
    const guessedFreq = notes.find(note => 
      note.name === notes[notes.findIndex(n => n.name === rootNote.name) + guessedInterval.semitones]?.name
    )?.frequency || rootFreq;

    await playTone(rootFreq, 600);
    setTimeout(() => playTone(guessedFreq, 600), 700);
  };

  const handleIntervalSelect = (intervalName: string) => {
    setSelectedInterval(intervalName);
  };

  const handleSubmit = async () => {
    if (!selectedInterval || !currentInterval) return;

    const isCorrect = selectedInterval === currentInterval.name;
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);

    if (isCorrect) {
      const rootInfo = rootNote ? `\nRoot: ${rootNote.name} → ${currentInterval.semitones > 0 ? 
        notes[notes.findIndex(n => n.name === rootNote.name) + currentInterval.semitones]?.name : 
        rootNote.name
      }` : '';
      
      Alert.alert(
        'Correct!', 
        `Great job! That was a ${currentInterval.name}.${rootInfo}`, 
        [
          { text: 'Next', onPress: generateNewQuestion }
        ]
      );
    } else {
      const guessedInterval = intervals.find(i => i.name === selectedInterval);
      const rootInfo = rootNote ? `\nRoot: ${rootNote.name} → ${currentInterval.semitones > 0 ? 
        notes[notes.findIndex(n => n.name === rootNote.name) + currentInterval.semitones]?.name : 
        rootNote.name
      }` : '';
      
      Alert.alert(
        'Incorrect',
        `You guessed ${selectedInterval}, but it was ${currentInterval.name}.${rootInfo}`,
        [
          { 
            text: 'Hear Difference', 
            onPress: async () => {
              if (guessedInterval) {
                await playGuessedInterval(guessedInterval);
                setTimeout(() => playInterval(), 1500);
              }
            }
          },
          { text: 'Next', onPress: generateNewQuestion }
        ]
      );
    }
  };

  const handleDirectionChange = (newDirection: 'ascending' | 'descending' | 'both') => {
    setDirection(newDirection);
  };

  const renderIntervalGrid = (intervalsToShow: Interval[], onPress: (name: string) => void, selectedValue?: string, isSelectionMode: boolean = false) => {
    const rows = [];
    for (let i = 0; i < intervalsToShow.length; i += 2) {
      const row = (
        <View key={i} style={styles.intervalRow}>
          <TouchableOpacity
            style={[
              styles.intervalButton, 
              isSelectionMode 
                ? selectedIntervals.includes(intervalsToShow[i].name) && styles.selectedInterval
                : selectedValue === intervalsToShow[i].name && styles.selectedInterval
            ]}
            onPress={() => onPress(intervalsToShow[i].name)}
          >
            <Text style={[
              styles.intervalText, 
              isSelectionMode 
                ? selectedIntervals.includes(intervalsToShow[i].name) && styles.selectedIntervalText
                : selectedValue === intervalsToShow[i].name && styles.selectedIntervalText
            ]}>
              {intervalsToShow[i].shortName}
            </Text>
          </TouchableOpacity>
          {intervalsToShow[i + 1] && (
            <TouchableOpacity
              style={[
                styles.intervalButton, 
                isSelectionMode 
                  ? selectedIntervals.includes(intervalsToShow[i + 1].name) && styles.selectedInterval
                  : selectedValue === intervalsToShow[i + 1].name && styles.selectedInterval
              ]}
              onPress={() => onPress(intervalsToShow[i + 1].name)}
            >
              <Text style={[
                styles.intervalText, 
                isSelectionMode 
                  ? selectedIntervals.includes(intervalsToShow[i + 1].name) && styles.selectedIntervalText
                  : selectedValue === intervalsToShow[i + 1].name && styles.selectedIntervalText
              ]}>
                {intervalsToShow[i + 1].shortName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  // Settings Page
  if (!isQuizMode) {
    return (
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.backgroundBlur} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Interval Training</Text>
            <Text style={styles.subtitle}>Configure your practice session</Text>
            
            {/* Direction Selection */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Direction</Text>
              <View style={styles.directionButtons}>
                <TouchableOpacity 
                  style={[styles.directionButton, direction === 'ascending' && styles.activeDirection]}
                  onPress={() => handleDirectionChange('ascending')}
                >
                  <Text style={[styles.directionText, direction === 'ascending' && styles.activeDirectionText]}>
                    Ascending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.directionButton, direction === 'descending' && styles.activeDirection]}
                  onPress={() => handleDirectionChange('descending')}
                >
                  <Text style={[styles.directionText, direction === 'descending' && styles.activeDirectionText]}>
                    Descending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.directionButton, direction === 'both' && styles.activeDirection]}
                  onPress={() => handleDirectionChange('both')}
                >
                  <Text style={[styles.directionText, direction === 'both' && styles.activeDirectionText]}>
                    Both
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Interval Selection */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Select Intervals to Practice</Text>
              <Text style={styles.sectionDescription}>
                Choose at least 2 intervals to practice
              </Text>
              <View style={styles.intervalGrid}>
                {renderIntervalGrid(intervals, handleIntervalToggle, undefined, true)}
              </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity 
              style={[styles.startButton, selectedIntervals.length < 2 && styles.disabledButton]}
              onPress={handleStartQuiz}
              disabled={selectedIntervals.length < 2}
            >
              <Text style={styles.startButtonText}>
                Start Quiz ({selectedIntervals.length} intervals selected)
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Quiz Mode
  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.backgroundBlur} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Interval Quiz</Text>
          
          {/* Score Display */}
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>
              Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
            </Text>
          </View>

          {/* Current Question */}
          {currentInterval && rootNote && (
            <View style={styles.questionCard}>
              <Text style={styles.sectionTitle}>Listen to the interval</Text>
              <TouchableOpacity 
                style={[styles.playButton, isPlaying && styles.playingButton]}
                onPress={playInterval}
                disabled={isPlaying}
              >
                <Text style={styles.playButtonText}>
                  {isPlaying ? 'Playing...' : 'Play Interval'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Interval Selection */}
          <View style={styles.selectionCard}>
            <Text style={styles.sectionTitle}>What interval did you hear?</Text>
            <View style={styles.intervalGrid}>
              {renderIntervalGrid(
                intervals.filter(interval => selectedIntervals.includes(interval.name)),
                handleIntervalSelect,
                selectedInterval
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, !selectedInterval && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!selectedInterval}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>

          {/* New Question Button */}
          <TouchableOpacity 
            style={styles.newQuestionButton}
            onPress={generateNewQuestion}
          >
            <Text style={styles.newQuestionText}>New Question</Text>
          </TouchableOpacity>

          {/* Back to Settings Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToSettings}
          >
            <Text style={styles.backButtonText}>Back to Settings</Text>
          </TouchableOpacity>
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
    fontSize: 18,
    color: '#a855f7',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 15,
  },
  directionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  directionButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 10,
    padding: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  activeDirection: {
    backgroundColor: '#a855f7',
  },
  directionText: {
    color: '#cbd5e1',
    fontWeight: '500',
  },
  activeDirectionText: {
    color: '#ffffff',
  },
  intervalGrid: {
    gap: 10,
  },
  intervalRow: {
    flexDirection: 'row',
    gap: 10,
  },
  intervalButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  selectedInterval: {
    borderColor: '#a855f7',
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  intervalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
    textAlign: 'center',
  },
  selectedIntervalText: {
    color: '#a855f7',
  },
  startButton: {
    backgroundColor: '#a855f7',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#475569',
  },
  startButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  scoreCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    color: '#a855f7',
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 15,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#a855f7',
    borderRadius: 10,
    padding: 15,
    minWidth: 150,
    alignItems: 'center',
  },
  playingButton: {
    backgroundColor: '#7c3aed',
  },
  playButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  selectionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#a855f7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  newQuestionButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a855f7',
  },
  newQuestionText: {
    color: '#a855f7',
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#64748b',
  },
  backButtonText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default IntervalsComingSoonScreen; 