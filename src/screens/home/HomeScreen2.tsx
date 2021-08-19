import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { CompositeNavigationProp } from "@react-navigation/native";

type HomeScreen2Props = CompositeNavigationProp<
  DrawerScreenProps<DrawerScreensParamList, "Home">,
  StackScreenProps<HomeScreenStackParamList, "HomeScreen2">
>;

export const HomeScreen2: React.FC<HomeScreen2Props> = ({ navigation }) => {
  return (
    <View>
      <Text>HOME SCREEN 222 TEXT</Text>
      <Button onPress={() => navigation.openDrawer()}>Press me</Button>
    </View>
  );
};
