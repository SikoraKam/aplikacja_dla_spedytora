import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useNotificationHandler } from "../../hooks/notifications/useNotificationHandler";
import { theme } from "../../theme";
import { MyProfileScreen } from "./MyProfileScreen";
import { DrawerIcon } from "../home/HomeScreenStack";
import { ProfileEditRouteParams } from "../../types/routeParameters/ProfileEditRouteParams";
import { ProfileEditScreen } from "../ProfileEditScreen";

type ProfileScreenStackProps = DrawerScreenProps<
  DrawerScreensParamList,
  "Profile"
>;

export type ProfileScreenStackParamList = {
  MyProfileScreen: undefined;
  ProfileEditScreen: ProfileEditRouteParams;
};

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC<ProfileScreenStackProps> = ({
  navigation,
}) => {
  useNotificationHandler(navigation);

  return (
    <Stack.Navigator
      initialRouteName="MyProfileScreen"
      screenOptions={theme.highHeader}
    >
      <Stack.Screen
        name={"MyProfileScreen"}
        component={MyProfileScreen}
        options={{
          headerLeft: DrawerIcon,
          headerTitle: "Profil",
        }}
      />
      <Stack.Screen
        name={"ProfileEditScreen"}
        component={ProfileEditScreen}
        options={{
          headerTitle: "Edytuj Profil",
        }}
      />
    </Stack.Navigator>
  );
};
