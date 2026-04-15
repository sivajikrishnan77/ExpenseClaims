/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
};

export default function CalendarField({
  value,
  onChange,
  placeholder = 'Select Date',
  minimumDate,
  maximumDate,
}: Props) {
  const [visible, setVisible] = useState(false);

  const formattedDate = value
    ? value.toLocaleDateString('en-GB')
    : placeholder;

  // Convert Date → YYYY-MM-DD
  const formatDateKey = (date: Date) =>
    date.toISOString().split('T')[0];

  return (
    <View style={styles.container}>

      {/* 🔹 Input Field */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={styles.input}>
          <Text style={{ color: value ? '#080808' : '#d70f0f' }}>
            {formattedDate}
          </Text>
        </View>
      </TouchableOpacity>

      {/* 🔹 Calendar Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalContainer}>

          <View style={styles.calendarBox}>
            <Calendar
              current={
                value ? formatDateKey(value) : undefined
              }

              minDate={
                minimumDate
                  ? formatDateKey(minimumDate)
                  : undefined
              }

              maxDate={
                maximumDate
                  ? formatDateKey(maximumDate)
                  : undefined
              }

              markedDates={
                value
                  ? {
                      [formatDateKey(value)]: {
                        selected: true,
                        selectedColor: '#0f0303',
                      },
                    }
                  : {}
              }

              onDayPress={(day) => {
                const [y, m, d] = day.dateString
                  .split('-')
                  .map(Number);

                const selectedDate = new Date(
                  y,
                  m - 1,
                  d
                );

                onChange(selectedDate);
                setVisible(false);
              }}
            />

            {/* Close */}
            <TouchableOpacity
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>
                Close
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000066',
  },
  calendarBox: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  closeText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});