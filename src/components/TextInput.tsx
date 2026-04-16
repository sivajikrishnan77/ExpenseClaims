import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type Props = TextInputProps;

export default function TextInputField(props: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#f50707"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 8,
    padding: 12,
    fontSize: 20,
    backgroundColor: "#ffffff",
    width: "90%",
      alignSelf: "center",
  },
});