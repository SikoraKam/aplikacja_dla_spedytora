import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

type CategorySectionProps = {
  categoryValue: string;
  setCategoryValue(val: string): void;
  isEditable: boolean;
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryValue,
  setCategoryValue,
  isEditable,
}) => {
  return (
    <MainInputComponent
      label={"Kategoria"}
      text={categoryValue}
      setText={setCategoryValue}
      editable={isEditable}
      maxLength={12}
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
