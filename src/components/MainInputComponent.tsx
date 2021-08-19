import React from "react";
import { TextInput } from "react-native-paper";
import { TextStyle, ViewStyle } from "react-native";

type MainInputComponentProps = {
  text: string;
  setText(): void;
  label: string;
  style: ViewStyle;
  textStyle: TextStyle;
};

export const MainInputComponent: React.FC<MainInputComponentProps> = ({
  text,
  setText,
  label,
  style,
  textStyle,
}) => {
  return <TextInput label={label} value={text} />;
};
