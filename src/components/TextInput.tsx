import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type Props = TextInputProps;

export default function TextInputField(props: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    width: "90%",
      alignSelf: "center",
  },
});