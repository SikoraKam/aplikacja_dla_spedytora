import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { theme } from "../theme";

type MainInputComponentProps = {
  text?: string;
  setText(value: string): void;
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
} & React.ComponentProps<typeof TextInput>;

export const MainInputComponent: React.FC<MainInputComponentProps> = ({
  text,
  setText,
  label,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TextInput
      label={label}
      value={text}
      mode={"outlined"}
      outlineColor={theme.colors.darkGreen}
      onChangeText={setText}
      style={[styles.inputStyle, style, textStyle]}
      placeholderTextColor={theme.colors.mediumGreenInactive}
      theme={{
        colors: {
          primary: theme.colors.darkGreen,
          placeholder: theme.colors.darkGreen,
          background: theme.colors.background,
          text: theme.colors.inputTextColor,
        },
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
});
