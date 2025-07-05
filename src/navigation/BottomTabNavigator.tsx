import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import EarTrainingScreen from '../screens/EarTrainingScreen';
import ScalesScreen from '../screens/ScalesScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ear Training') {
            iconName = focused ? 'ear' : 'ear-outline';
          } else if (route.name === 'Scales') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#a855f7', // Purple for dark mode
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 40,
          right: 40,
          elevation: 0,
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          borderRadius: 25,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
        },
        tabBarBackground: () => (
          <BlurView
          intensity={20}
          tint="dark"
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 25,
            }}
          />
        ),
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
        headerBackground: () => (
          <BlurView
            intensity={30}
            tint="dark"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Ear Training" 
        component={EarTrainingScreen}
        options={{
          title: 'Ear Training',
        }}
      />
      <Tab.Screen 
        name="Scales" 
        component={ScalesScreen}
        options={{
          title: 'Scales',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
