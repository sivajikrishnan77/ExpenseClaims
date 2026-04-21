import React from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

type Item = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  setValue: (val: string) => void;
  list: Item[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
  icon?: string;
};

export default function DropDown({
  value,
  setValue,
  list,
  open,
  setOpen,
  placeholder,
  icon,
}: Props) {
  return (
    <View
      style={[
        styles.wrapper,
        {
          zIndex: open ? 1000 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            borderColor: open ? "#4F46E5" : "#D0D5DD",
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#4F46E5"
            style={styles.icon}
          />
        )}

        <DropDownPicker
          open={open}
          value={value || null}
          items={list}
          setOpen={setOpen}

          placeholder={placeholder || "Select an item"}

          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          maxHeight={180}

          closeAfterSelecting

          setValue={(callback) => {
            const val = callback(value);
            setValue(val);
          }}

          ArrowDownIconComponent={() => (
            <Ionicons name="chevron-down" size={20} color="#667085" />
          )}

          ArrowUpIconComponent={() => (
            <Ionicons name="chevron-up" size={20} color="#667085" />
          )}

          TickIconComponent={() => (
            <Ionicons name="checkmark" size={18} color="#4F46E5" />
          )}

          arrowIconContainerStyle={{
            marginRight: 2,
          }}

          style={styles.dropdown}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.placeholder}

          dropDownContainerStyle={styles.dropdownContainer}

          listItemContainerStyle={styles.listItemContainer}
          listItemLabelStyle={styles.listItemLabel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    marginHorizontal: 15,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 48,
    position: "relative",
  },

  icon: {
    marginRight: 8,
  },

  dropdown: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "transparent",
    minHeight: 50,
  },

  dropdownText: {
    fontSize: 16,
    color: "#101828",
  },

  placeholder: {
    color: "#98A2B3",
    fontSize: 16,
  },

  dropdownContainer: {
    position: "absolute",
    top: 55,
    right: 0,
    width: 170,

    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",

    elevation: 6,
  },

  listItemContainer: {
    height: 44,
    justifyContent: "center",
  },

  listItemLabel: {
    fontSize: 14,
    color: "#344054",
  },
});