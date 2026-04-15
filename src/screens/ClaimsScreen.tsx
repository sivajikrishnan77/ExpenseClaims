
import { View, Text } from 'react-native'
import React from 'react'
import Label from '../components/label'
import TextInputField from '../components/TextInput'



export default function ClaimsScreen() {
  return (
    <View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ClaimsScreen</Text>
    </View>
    <View>
        <Label text="ClaimsScreen" />
        <TextInputField 
            value={''}
            onChangeText={(text) => console.log(text)}
        />
    </View>
</View>
  )
}