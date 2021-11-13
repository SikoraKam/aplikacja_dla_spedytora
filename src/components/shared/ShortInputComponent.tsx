import React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { theme } from "../../theme";

type ShortInputComponentProps = {
  placeholder: string;
  text?: string;
  setText?(value: string): void;
  label?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  isEditable?: boolean;
} & React.ComponentProps<typeof TextInput>;

export const ShortInputComponent: React.FC<ShortInputComponentProps> = ({
  text,
  setText,
  containerStyle,
  textStyle,
  isEditable,
  placeholder,
  ...props
}) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        style={[styles.textStyle, textStyle]}
        placeholderTextColor={theme.colors.mediumGreenInactive}
        editable={isEditable}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS === "ios" ? 8 : 4,
    backgroundColor: theme.colors.greenyWhite,
    borderBottomColor: theme.colors.primaryDarkGreen,
    borderBottomWidth: 1,
  },
  textStyle: {
    ...theme.defaultTextStyle,
    marginTop: 4,
    textAlign: "left",
    paddingHorizontal: 16,
    fontSize: 15,
    flex: 2,
  },
});
