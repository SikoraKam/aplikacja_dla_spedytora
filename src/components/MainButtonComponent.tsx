import { StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { theme } from "../theme";
import { Button } from "react-native-paper";

type MainButtonComponentProps = {
  text: string;
  onPress(): void;
  buttonStyle?: ViewStyle;
} & Omit<React.ComponentProps<typeof Button>, "children">;

export const MainButtonComponent: React.FC<MainButtonComponentProps> = ({
  text,
  onPress,
  buttonStyle,
  ...props
}) => {
  return (
    <Button
      mode={"contained"}
      onPress={onPress}
      style={[styles.buttonStyle, buttonStyle]}
      contentStyle={styles.buttonContentStyle}
      labelStyle={styles.labelStyle}
      {...props}
    >
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.lightGreen,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  labelStyle: {
    color: theme.colors.darkBlackGreen,
  },
  buttonContentStyle: {
    paddingVertical: 8,
  },
});
