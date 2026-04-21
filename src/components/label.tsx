import React from 'react';
import {Text} from 'react-native-paper';


export default function Label({text}: {text: string}) 
{
    // eslint-disable-next-line react-native/no-inline-styles
    return<Text style={{fontSize:13,
  fontWeight:"bold",
  color:"#444",
  marginBottom:6,
  fontFamily:"sans-serif",

}}>{text}</Text>;
}