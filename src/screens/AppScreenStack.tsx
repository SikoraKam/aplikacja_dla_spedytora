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
import {
  OrdersScreenStack,
  OrdersScreenStackParamList,
} from "./orders/OrdersScreenStack";

export type DrawerScreensParamList = {
  Home: NavigatorScreenParams<HomeScreenStackParamList>;
  Orders: NavigatorScreenParams<OrdersScreenStackParamList>;
};
const Drawer = createDrawerNavigator<DrawerScreensParamList>();

export const AppScreenStack: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreenStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Deliverers"
        component={OrdersScreenStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
