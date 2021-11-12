import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

type WeightSectionProps = {
  value: string | undefined;
  setValue?(val: string): void;
  isEditable?: boolean;
};

export const WeightSection: React.FC<WeightSectionProps> = ({
  value = "",
  setValue = () => {},
  isEditable = true,
}) => {
  return (
    <MainInputComponent
      label={"Waga w kg"}
      text={value}
      setText={setValue}
      editable={isEditable}
      keyboardType="numeric"
      maxLength={7}
      style={[styles.inputStyle, !isEditable && styles.disabledInputStyle]}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "40%",
    textAlign: "center",
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
});
