import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { theme } from "../../theme";

export const DrawerComponent: React.FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps
) => {
  return (
    <View style={styles.container} {...props}>
      <View style={styles.profileSection}>
        <Avatar.Text size={80} label="XD" style={styles.avatarStyle} />
        <Text style={styles.profileTextStyle}>IMIE I NAZWISKO</Text>
      </View>
      <DrawerItemList {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  profileTextStyle: {
    ...theme.defaultTextStyle,
    fontSize: 12,
  },
  avatarStyle: {
    marginBottom: 8,
    backgroundColor: theme.colors.primaryGreen,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.greenBackgroundLight,
  },
});
