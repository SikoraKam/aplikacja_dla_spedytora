import { createDrawerNavigator } from "@react-navigation/drawer";
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
import { theme } from "../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeIcon } from "../components/icons/HomeIcon";
import { TruckFastIcon } from "../components/icons/TruckFastIcon";
import { ProfileScreenStack } from "./profile/ProfileScreenStack";
import { AccountIcon } from "../components/icons/AccountIcon";

export type DrawerScreensParamList = {
  Home: NavigatorScreenParams<HomeScreenStackParamList>;
  Orders: NavigatorScreenParams<OrdersScreenStackParamList>;
  Profile: NavigatorScreenParams<ProfileScreenStackParamList>;
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
      setHasPushedNotificationsToken(true);
      updateExpoPushTokenRequest({ expo_token: expoPushToken });
    }
  }, [expoPushToken, hasPushedNotificationsToken]);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: theme.colors.secondaryGreen,
        drawerActiveTintColor: theme.colors.darkBlackGreen,
        drawerType: "back",
        drawerStyle: { backgroundColor: theme.colors.greenyWhite },
        drawerLabelStyle: {
          letterSpacing: 0.47,
          fontWeight: "bold",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          headerShown: false,
          drawerLabel: "Start",
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreenStack}
        options={{
          headerShown: false,
          drawerLabel: "Zamówienia",
          drawerIcon: TruckFastIcon,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{
          headerShown: false,
          drawerLabel: "Profil",
          drawerIcon: AccountIcon,
        }}
      />
    </Drawer.Navigator>
  );
};
