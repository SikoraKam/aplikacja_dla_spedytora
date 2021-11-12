import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../../theme";
import { DrawerIcon } from "../home/HomeScreenStack";
import { OrdersScreen } from "./OrdersScreen";
import { OrderDetailsRouteParams } from "../../types/routeParameters/OrderDetailsRouteParams";
import { OrderDetailsScreen } from "./OrderDetailsScreen";
import { PositionOnMapRouteParams } from "../../types/routeParameters/PositionOnMapRouteParams";
import { PositionOnMapScreen } from "./PositionOnMapScreen";
import { useNotificationHandler } from "../../hooks/notifications/useNotificationHandler";
import { SendNotificationRouteParams } from "../../types/routeParameters/SendNotificationRouteParams";
import { SendNotificationScreen } from "./SendNotificationScreen";

type OrdersScreenStackProps = DrawerScreenProps<
  DrawerScreensParamList,
  "Orders"
>;

export type OrdersScreenStackParamList = {
  OrdersScreen: undefined;
  OrderDetailsScreen: OrderDetailsRouteParams;
  PositionOnMapScreen: PositionOnMapRouteParams;
  SendNotificationScreen: SendNotificationRouteParams;
};

const Stack = createStackNavigator<OrdersScreenStackParamList>();

export const OrdersScreenStack: React.FC<OrdersScreenStackProps> = ({
  navigation,
}) => {
  useNotificationHandler(navigation);
  return (
    <Stack.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={theme.mainHeader}
    >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ headerLeft: DrawerIcon, title: "Twoje zlecenia" }}
      />
      <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{ title: "Twoje zlecenia" }}
      />
      <Stack.Screen
        name="PositionOnMapScreen"
        component={PositionOnMapScreen}
        options={{ title: "Widok mapy" }}
      />
      <Stack.Screen
        name={"SendNotificationScreen"}
        component={SendNotificationScreen}
        options={{ title: "Twoje zlecenia" }}
      />
    </Stack.Navigator>
  );
};
