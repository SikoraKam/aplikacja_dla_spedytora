import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export const DateInputComponent = ({
  dateInputValue,
  dateInputOnTextChange,
  dateEditingDisabled,
  disableAllEditing,
}) => {
  const renderDateSection = () => (
    <View style={inputContainerStyle}>
      <Text style={inputDateTextStyle}>{dateInputValue}</Text>
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
      {dateEditingDisabled || disableAllEditing
        ? renderDateSection()
        : renderDatePicker()}
    </View>
  );
};

const {
  inputDateTextStyle,
  dateSectionStyle,
  inputContainerStyle,
  iconsContainerStyle,
  tooltipStyle,
} = StyleSheet.create({
  dateSectionStyle: {
    paddingVertical: 3 * HEIGHT_COEFFICIENT,
    height: 50 * HEIGHT_COEFFICIENT,
    marginHorizontal: 12 * HEIGHT_COEFFICIENT,
    borderRadius: 10 * HEIGHT_COEFFICIENT,
    borderWidth: 1,
    borderColor: FADED_BLUE,
  },
  inputDateTextStyle: {
    color: MEDIUM_GRAY,
    ...defaultEbookEntryFormFontStyle,
    paddingVertical: 14 * HEIGHT_COEFFICIENT,
    marginRight: 25 * HEIGHT_COEFFICIENT,
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44 * HEIGHT_COEFFICIENT,
    paddingHorizontal: 12 * HEIGHT_COEFFICIENT,
  },
  iconsContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  tooltipStyle: {
    paddingVertical: 10 * HEIGHT_COEFFICIENT,
    paddingHorizontal: 12 * HEIGHT_COEFFICIENT,
  },
});
