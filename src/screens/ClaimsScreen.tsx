
import { View, Text } from 'react-native'
import React ,{useState}from 'react'
import Label from '../components/label'
import TextInputField from '../components/TextInput'



export default function ClaimsScreen() {
  const [RequestedBy, SetRequestedBy] =useState('');
  return (
    
    
    <View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#9b9b9b' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>ClaimsScreen</Text>
    </View>
    <View>
        <Label text="Requested By" />
        <TextInputField 
            value={RequestedBy}
            onChangeText={SetRequestedBy}
        />
    </View>
</View>
  )
}