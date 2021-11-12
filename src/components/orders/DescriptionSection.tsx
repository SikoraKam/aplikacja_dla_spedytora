import React from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { TextInput } from "react-native-paper";

type DescriptionSectionProps = {
  value: string | undefined;
  setValue?(val: string): void;
  isEditable?: boolean;
};

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  value = "",
  setValue = () => {},
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
      right={
        <TextInput.Icon
          name="card-text"
          color={theme.colors.darkGreen}
          disabled={true}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    textAlignVertical: "top",
    marginHorizontal: 24,
    justifyContent: "flex-start",
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
});
