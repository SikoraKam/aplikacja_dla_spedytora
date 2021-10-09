import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { string } from "yup";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";

type ProfileTypeComponentProps = {
  iconComponent: any;
  text: string;
  onPress(): void;
};

export const ProfileTypeComponent: React.FC<ProfileTypeComponentProps> = ({
  iconComponent,
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {iconComponent}
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.colors.primaryGreen,
    height: 133,
    width: 133,
    borderWidth: 1,
    borderColor: theme.colors.darkGreen,
    borderRadius: 25,
  },
});
