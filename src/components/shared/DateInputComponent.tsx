import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DatePicker } from "./DatePicker";
import { theme } from "../../theme";
import { format } from "date-fns";

type DateInputComponentProps = {
  dateInputValue: Date;
  dateInputOnTextChange(value: Date): void;
  dateEditingDisabled: boolean;
};

export const DateInputComponent: React.FC<DateInputComponentProps> = ({
  dateInputValue,
  dateInputOnTextChange,
  dateEditingDisabled,
}) => {
  const renderDateSection = () => (
    <View style={inputContainerStyle}>
      <Text style={inputDateTextStyle}>
        {format(dateInputValue, "dd/MM/yyyy")}
      </Text>
    </View>
  );

  const renderDatePicker = () => (
    <DatePicker
      date={dateInputValue}
      onDateChange={dateInputOnTextChange}
      disabled={dateEditingDisabled}
      input={renderDateSection}
    />
  );

  return (
    <View style={dateSectionStyle}>
      {dateEditingDisabled ? renderDateSection() : renderDatePicker()}
    </View>
  );
};

const {
  inputDateTextStyle,
  dateSectionStyle,
  inputContainerStyle,
} = StyleSheet.create({
  dateSectionStyle: {
    paddingVertical: 3,
    height: 50,
    marginHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.primaryGreen,
  },
  inputDateTextStyle: {
    paddingVertical: 14,
    marginRight: 25,
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    paddingHorizontal: 12,
  },
});
