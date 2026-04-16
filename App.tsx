import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Provider as PaperProvider } from 'react-native-paper';

enableScreens();

export default function App() {
  return (
    
   <PaperProvider>
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
   </PaperProvider>
   
  );
}