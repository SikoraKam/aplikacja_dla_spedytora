import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../../theme";

type DatePickerProps = {
  onDateChange(date: any): void;
  input(arg: any): JSX.Element;
  date: any;
  onIosPickerClose?(): void;
  disabled?: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  onDateChange,
  input,
  date,
  onIosPickerClose,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayCalendar, setDisplayCalendar] = useState(false);

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setDisplayCalendar(open);
    if (!date) onDateChange(new Date());
    if (!open && !!onIosPickerClose && Platform.OS == "ios") {
      onIosPickerClose();
    }
  };

  const handleChange = (event: any, newDate: any) => {
    setDisplayCalendar(false);
    onDateChange(newDate);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleOpen(true)}
        style={style.inputContainer}
      >
        {input(date)}
      </TouchableOpacity>
      {Platform.OS === "android" && displayCalendar && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="spinner"
          onChange={handleChange}
          minimumDate={new Date()}
          {...props}
        />
      )}
      {Platform.OS === "ios" && (
        <Modal visible={isOpen} transparent={true}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleOpen(false)}
          >
            <View style={style.pickerContainer}>
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="spinner"
                onChange={handleChange}
                minimumDate={new Date()}
                {...props}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: theme.colors.white,
  },
});
