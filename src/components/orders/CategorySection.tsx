import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { TextInput } from "react-native-paper";

type CategorySectionProps = {
  categoryValue: string | undefined;
  setCategoryValue?(val: string): void;
  isEditable: boolean;
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryValue = "",
  setCategoryValue = () => {},
  isEditable,
}) => {
  return (
    <MainInputComponent
      label={"Kategoria"}
      text={categoryValue}
      setText={setCategoryValue}
      editable={isEditable}
      maxLength={14}
      style={[styles.inputStyle, !isEditable && styles.disabledInputStyle]}
      right={
        <TextInput.Icon
          name="truck-trailer"
          color={theme.colors.darkGreen}
          disabled={true}
        />
      }
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
