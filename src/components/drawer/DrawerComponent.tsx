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
    <DrawerContentScrollView style={styles.container} {...props}>
      <View style={styles.profileSection}>
        <Avatar.Text size={80} label="XD" style={styles.avatarStyle} />
        <Text style={styles.profileTextStyle}>IMIE I NAZWISKO</Text>
      </View>
      <View style={{ backgroundColor: theme.colors.primaryGreen, flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  profileTextStyle: {
    ...theme.defaultTextStyle,
    fontSize: 12,
  },
  avatarStyle: {
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
});
