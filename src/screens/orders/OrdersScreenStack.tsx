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

type OrdersScreenStackProps = DrawerScreenProps<
  DrawerScreensParamList,
  "Orders"
>;

export type OrdersScreenStackParamList = {
  OrdersScreen: undefined;
  OrderDetailsScreen: OrderDetailsRouteParams;
  PositionOnMapScreen: PositionOnMapRouteParams;
};

const Stack = createStackNavigator<OrdersScreenStackParamList>();

export const OrdersScreenStack: React.FC<OrdersScreenStackProps> = ({
  navigation,
}) => {
  return (
    <Stack.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={theme.mainHeader}
    >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ headerLeft: DrawerIcon }}
      />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen
        name="PositionOnMapScreen"
        component={PositionOnMapScreen}
      />
    </Stack.Navigator>
  );
};
