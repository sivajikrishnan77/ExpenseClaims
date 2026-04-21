/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  value: string;
  onChange: (date: string) => void;
};

export default function DatePickerField({ value, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>

        {/* Manual Input */}
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#cccccc"
          value={value}
          onChangeText={onChange}
        />

        {/* Calendar Icon */}
        <TouchableOpacity onPress={() => setShow(true)}>
          <Ionicons name="calendar-outline" size={22} color="#ca1d1d" />
        </TouchableOpacity>

      </View>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShow(false);

            if (selectedDate) {
              const formatted = selectedDate
                .toISOString()
                .split('T')[0]; // YYYY-MM-DD

              onChange(formatted);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 15,
  },

  inputContainer: {
   flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000000"
  },
});