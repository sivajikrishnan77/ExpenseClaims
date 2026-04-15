/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput} from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';


type Props = {
  // label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secure?: boolean;
  keyboardType?: 'default' | 'number-pad';
  icon?: string;
  label?:string;
};

export default function TextInputField({ value, onChangeText, 
    placeholder,secure = false,
     keyboardType = 'default',icon,label}: Props)
{
    return <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secure}
      keyboardType={keyboardType}
      left={icon ? <TextInput.Icon icon={icon} /> : undefined}
      mode='flat'
      style={{ marginVertical: 10 }}
    />

}