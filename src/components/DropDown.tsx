import React, { useState } from 'react';
import { View } from 'react-native';
// import { Text } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from "react-native-vector-icons/Ionicons";

type Item = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  setValue: (val: string) => void;
  list: Item[];
  label?: string;
  placeholder?: string;
  icon?: string;
};

export default function DropDown({
  value,
  setValue,
  list,
  // label,
  placeholder,
  icon,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginVertical: 10 }}>
      
      {/* Label */}
      {/* {label && <Text style={{ marginBottom: 5 }}>{label}</Text>} */}

      {/* Container with icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 30,
          height: 50,
        }}
      >
        {/* Left Icon */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#f00d0d"
            style={{ marginRight: 8 }}
          />
        )}

        {/* Dropdown */}
        <DropDownPicker
          open={open}
          value={value || null}
          items={list}
          placeholder={placeholder || 'Select an item'}
          setOpen={setOpen}
          setValue={(callback) => {
            const val = callback(value);
            setValue(val);
          }}
          style={{
            borderWidth: 0,
            flex: 1,
            backgroundColor: 'transparent',
          }}
          dropDownContainerStyle={{
            borderRadius: 8,
          }}
        />
      </View>

    </View>
  );
}