import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type Props = TextInputProps;

export default function TextInputField(props: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#8d8d8d"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#ffffff",
    width: "90%",
      alignSelf: "center",
  },
});