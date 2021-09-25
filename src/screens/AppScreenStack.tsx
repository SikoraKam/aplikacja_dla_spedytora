import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import React from "react";
import {
  HomeScreenStack,
  HomeScreenStackParamList,
} from "./home/HomeScreenStack";
import { DrawerComponent } from "../components/drawer/DrawerComponent";

export type DrawerScreensParamList = {
  Home: NavigatorScreenParams<HomeScreenStackParamList>;
};
const Drawer = createDrawerNavigator(); // TODO types

export const AppScreenStack: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerComponent}>
      <Drawer.Screen
        name="Home"
        component={HomeScreenStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Deliverers"
        component={HomeScreenStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
