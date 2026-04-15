/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export default function Loader() {
  return <ActivityIndicator animating={true} style={{ marginVertical: 10 }} />;
}