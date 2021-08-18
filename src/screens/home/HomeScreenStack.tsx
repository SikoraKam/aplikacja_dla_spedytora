import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import { HomeScreen } from "./HomeScreen";
import { HomeScreen2 } from "./HomeScreen2";

type HomeScreenStackProps = DrawerScreenProps<DrawerScreensParamList, "Home">;

export type HomeScreenStackParamList = {
  HomeScreen: undefined;
  HomeScreen2: undefined;
};

const Stack = createStackNavigator<HomeScreenStackParamList>();

export const HomeScreenStack: React.FC<HomeScreenStackProps> = ({
  navigation,
}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerLeft: undefined }} // TODO drawer icon
      />
      <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
    </Stack.Navigator>
  );
};
