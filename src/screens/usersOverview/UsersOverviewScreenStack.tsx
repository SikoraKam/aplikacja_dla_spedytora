import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { ProfileEditRouteParams } from "../../types/routeParameters/ProfileEditRouteParams";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useNotificationHandler } from "../../hooks/notifications/useNotificationHandler";
import { DrawerIcon } from "../home/HomeScreenStack";
import { theme } from "../../theme";
import { UsersOverviewScreen } from "./UsersOverviewScreen";
import { ProfileOverviewRouteParams } from "../../types/routeParameters/ProfileOverviewRouteParams";
import { ProfileOverviewScreen } from "./ProfileOverviewScreen";

type UsersOverviewScreenStackProps = DrawerScreenProps<
  DrawerScreensParamList,
  "UsersOverview"
>;

export type UsersOverviewScreenStackParamList = {
  UsersOverviewScreen: undefined;
  ProfileOverviewScreen: ProfileOverviewRouteParams;
};

const Stack = createStackNavigator<UsersOverviewScreenStackParamList>();

export const UsersOverviewScreenStack: React.FC<UsersOverviewScreenStackProps> = ({
  navigation,
}) => {
  useNotificationHandler(navigation);

  return (
    <Stack.Navigator
      screenOptions={theme.mainHeader}
      initialRouteName={"UsersOverviewScreen"}
    >
      <Stack.Screen
        name="UsersOverviewScreen"
        component={UsersOverviewScreen}
        options={{
          headerLeft: DrawerIcon,
        }}
      />
      <Stack.Screen
        name="ProfileOverviewScreen"
        component={ProfileOverviewScreen}
        options={theme.highHeader}
      />
    </Stack.Navigator>
  );
};
