import { StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { theme } from "../theme";
import { Button } from "react-native-paper";

type MainButtonComponentProps = {
  text: string;
  onPress(): void;
  buttonStyle?: ViewStyle;
} & React.ComponentProps<typeof Button>;

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
    paddingVertical: 8,
    borderRadius: 8,
  },
  labelStyle: {
    color: theme.colors.darkBlackGreen,
  },
});
