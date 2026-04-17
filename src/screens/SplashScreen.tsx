/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React , {useEffect, useRef} from 'react';
import {  View, Text, Image, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Claims: undefined;
};

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;



export default function SplashScreen({ navigation }: SplashScreenProps) {
  
      useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('Claims'); // or BottomTab
  }, 1200);
  return () => clearTimeout(timer);
}, [navigation]);

const scale = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(scale, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: true,
  }).start();
},[] );

    return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Animated.View style={{ 
           backgroundColor:"#1888c0",
           position:'absolute',
           width:1000,
           height:1000,
           borderRadius:500,
           transform: [{ scale: scale }],
          
           }}></Animated.View>

        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 120,borderRadius:60,borderColor:'#fff',borderWidth:2,marginBottom:20 }} />
           
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f3f1f1', marginBottom: 10, }}>Expense Manager</Text>

    </View>
  );
}