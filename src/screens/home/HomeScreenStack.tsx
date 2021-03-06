import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import { HomeScreen } from "./HomeScreen";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NewOrderScreen } from "./NewOrderScreen";
import { ThreeHorizontalDots } from "../../components/icons/ThreeHorizontalDots";
import { useNotificationHandler } from "../../hooks/notifications/useNotificationHandler";
import { SelectPlaceFromMapScreen } from "../orders/SelectPlaceFromMapScreen";

type HomeScreenStackProps = DrawerScreenProps<DrawerScreensParamList, "Home">;

export type HomeScreenStackParamList = {
  HomeScreen: undefined;
  NewOrderScreen: undefined;
  SelectPlaceFromMapScreen: SelectPlaceFromMapRouteParams;
};

const Stack = createStackNavigator<HomeScreenStackParamList>();

export const HomeScreenStack: React.FC<HomeScreenStackProps> = ({
  navigation,
}) => {
  useNotificationHandler(navigation);
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={theme.mainHeader}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerLeft: DrawerIcon, title: "" }}
      />
      <Stack.Screen
        name="NewOrderScreen"
        component={NewOrderScreen}
        options={{ title: "Nowe zlecenie" }}
      />
      <Stack.Screen
        name="SelectPlaceFromMapScreen"
        component={SelectPlaceFromMapScreen}
        options={{ title: "Wybierz miejsce na mapie" }}
      />
    </Stack.Navigator>
  );
};

export const DrawerIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.drawerIconContainer}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Entypo name={"dots-three-vertical"} size={theme.sizes.iconHeaderSize} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerIconContainer: {
    paddingHorizontal: 16,
  },
  drawerIconStyle: {
    ...theme.defaultIconHeaderStyle,
  },
});
