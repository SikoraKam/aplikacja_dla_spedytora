import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

type DescriptionSectionProps = {
  value: string;
  setValue(val: string): void;
  isEditable?: boolean;
};

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  value,
  setValue,
  isEditable = true,
}) => {
  return (
    <MainInputComponent
      label={"Opis"}
      text={value}
      setText={setValue}
      editable={isEditable}
      multiline
      style={[styles.inputStyle, !isEditable && styles.disabledInputStyle]}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginHorizontal: 24,
    height: 70,
    textAlign: "center",
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
});
