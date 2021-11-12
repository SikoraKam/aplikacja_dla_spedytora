import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { TextInput } from "react-native-paper";

type TruckTypeSectionProps = {
  value: string | undefined;
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
      right={
        <TextInput.Icon
          name="truck"
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
    left: 10,
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
});
