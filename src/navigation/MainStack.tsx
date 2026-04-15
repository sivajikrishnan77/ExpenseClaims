import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClaimsScreen from '../screens/ClaimsScreen'
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
    Splash: undefined;
    Claims: undefined;
}

export default function MainStack() {
return(
    <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Claims" component={ClaimsScreen} />
    </Stack.Navigator>
)
}