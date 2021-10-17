import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../../theme";
import { DrawerIcon } from "../home/HomeScreenStack";
import { OrdersScreen } from "./OrdersScreen";

type OrdersScreenStackProps = DrawerScreenProps<
  DrawerScreensParamList,
  "Orders"
>;

export type OrdersScreenStackParamList = {
  OrdersScreen: undefined;
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
    </Stack.Navigator>
  );
};
