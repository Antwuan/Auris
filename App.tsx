import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import GuitarScalesScreen from './src/screens/GuitarScalesScreen';
import PianoScalesScreen from './src/screens/PianoScalesScreen';
import NoteRecognitionScreen from './src/screens/NoteRecognitionScreen';
import IntervalsScreen from './src/screens/IntervalsScreen';
import TunerScreen from './src/screens/TunerScreen';
import TonusVivoScreen from './src/screens/TonusVivoScreen';
import IntervalTrainingScreen from './src/screens/IntervalTrainingScreen';
import LoadingScreen from './src/components/LoadingScreen';
import NoteRecognitionCard from './src/screens/NoteRecognitionCard';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - you can adjust this or remove it for instant loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#f8fafc',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GuitarScales" 
          component={GuitarScalesScreen}
          options={{ title: 'Guitar Scales' }}
        />
        <Stack.Screen 
          name="PianoScales" 
          component={PianoScalesScreen}
          options={{ title: 'Piano Scales' }}
        />
        <Stack.Screen 
          name="NoteRecognition" 
          component={NoteRecognitionScreen}
          options={{ title: 'Note Recognition' }}
        />
        <Stack.Screen 
          name="Intervals" 
          component={IntervalsScreen}
          options={{ title: 'Intervals' }}
        />
        <Stack.Screen 
          name="Tuner" 
          component={TunerScreen}
          options={{ title: 'Tuner' }}
        />
        <Stack.Screen 
          name="TonusVivo" 
          component={TonusVivoScreen}
          options={{ title: 'Tonus Vivo' }}
        />
        <Stack.Screen 
          name="NoteRecognitionComingSoon" 
          component={NoteRecognitionScreen}
          options={{ title: 'Note Recognition' }}
        />
        <Stack.Screen 
          name="IntervalsComingSoon" 
          component={IntervalTrainingScreen}
          options={{ title: 'Interval Training' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}