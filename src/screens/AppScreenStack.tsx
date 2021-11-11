import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  HomeScreenStack,
  HomeScreenStackParamList,
} from "./home/HomeScreenStack";
import {
  OrdersScreenStack,
  OrdersScreenStackParamList,
} from "./orders/OrdersScreenStack";
import { useNotification } from "../hooks/notifications/useNotification";
import { updateExpoPushTokenRequest } from "../services/PatchService";
import { useNotificationHandler } from "../hooks/notifications/useNotificationHandler";

export type DrawerScreensParamList = {
  Home: NavigatorScreenParams<HomeScreenStackParamList>;
  Orders: NavigatorScreenParams<OrdersScreenStackParamList>;
};
const Drawer = createDrawerNavigator<DrawerScreensParamList>();

export const AppScreenStack: React.FC = () => {
  const { expoPushToken } = useNotification();

  const [
    hasPushedNotificationsToken,
    setHasPushedNotificationsToken,
  ] = useState(false);

  useEffect(() => {
    if (expoPushToken && !hasPushedNotificationsToken) {
      console.log("XDDDD: ", expoPushToken);
      setHasPushedNotificationsToken(true);
      updateExpoPushTokenRequest({ expo_token: expoPushToken });
    }
  }, [expoPushToken, hasPushedNotificationsToken]);

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
