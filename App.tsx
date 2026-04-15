import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}