import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type AppLogoProps = {
  size?: number;
  style?: any;
  color?: string;
};

export const AppLogo: React.FC<AppLogoProps> = (props) => {
  return (
    <Ionicons
      name="md-checkmark-circle"
      size={props.size}
      color={props.color}
      style={props.style}
    />
  );
};
