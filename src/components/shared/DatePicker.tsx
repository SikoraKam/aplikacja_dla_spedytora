import React, { useState } from "react";
import { Modal, Platform, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type DatePickerProps = {
  onDateChange(date: Date): void;
  input(arg: any): React.FC;
  date: any;
  onIosPickerClose(): void;
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
        onPress={() => this.handleOpen(true)}
        style={style.inputContainer}
      >
        {input({ formattedDate: this.props.getFormattedDate(date) })}
      </TouchableOpacity>
      {Platform.OS === "android" && this.state.displayCalendar && (
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
            onPress={() => this.handleOpen(false)}
          >
            <View style={style.pickerContainer}>
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="spinner"
                onChange={this.props.onDateChange}
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
