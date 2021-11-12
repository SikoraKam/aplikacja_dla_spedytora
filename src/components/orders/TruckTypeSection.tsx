import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

type TruckTypeSectionProps = {
  value: string;
  setValue?(val: string): void;
  isEditable?: boolean;
};

export const TruckTypeSection: React.FC<TruckTypeSectionProps> = ({
  value = "",
  setValue = () => {},
  isEditable = true,
}) => {
  return (
    <MainInputComponent
      label={"Rodzaj auta"}
      text={value}
      setText={setValue}
      editable={isEditable}
      style={[styles.inputStyle, !isEditable && styles.disabledInputStyle]}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "40%",
    textAlign: "center",
    left: 10,
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
});
