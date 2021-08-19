import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { HomeScreen2 } from "./HomeScreen2";

type HomeScreenProps = StackScreenProps<HomeScreenStackParamList, "HomeScreen">;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>HOME SCREEN TEXT</Text>
      <Button onPress={() => navigation.push("HomeScreen2")}>Press me</Button>
    </View>
  );
};
