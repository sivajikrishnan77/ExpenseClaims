import React from 'react';
import {Text} from 'react-native-paper';


export default function Label({text}: {text: string}) 
{
    // eslint-disable-next-line react-native/no-inline-styles
    return<Text style={{marginVertical:5, fontSize:20, color:'#1e2bdb', fontWeight:'bold'}}>{text}</Text>;
}