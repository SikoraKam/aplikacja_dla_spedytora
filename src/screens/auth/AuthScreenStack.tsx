import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "./WelcomeScreen";
import { RegistrationScreen } from "./RegistrationScreen";
import { LoginScreen } from "./LoginScreen";
import { PasswordRecoveryScreen } from "./PasswordRecoveryScreen";
import { theme } from "../../theme";
import { AppLogo } from "../../components/AppLogo";
import { ProfileSelectionScreen } from "./ProfileSelectionScreen";
import { ProfileSelectionRouteParameters } from "../../types/routeParameters/ProfileSelectionRouteParameters";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerScreensParamList } from "../AppScreenStack";
import { NewPasswordScreenRouteParams } from "../../types/routeParameters/NewPasswordScreenRouteParams";
import { NewPasswordScreen } from "./NewPasswordScreen";

export type AuthScreenStackParamList = {
  Welcome: undefined;
  Registration: undefined;
  Login: undefined;
  PasswordRecovery: undefined;
  ProfileSelection: ProfileSelectionRouteParameters;
  NewPasswordScreen: NewPasswordScreenRouteParams;
};

const Stack = createStackNavigator<AuthScreenStackParamList>();

type AuthScreenStackProps = DrawerScreenProps<DrawerScreensParamList>;

export const AuthScreenStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "",
        headerStyle: {
          elevation: 0,
          height: 80,
          backgroundColor: theme.colors.background,
          shadowColor: "transparent",
        },
      }}
    >
      <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
      <Stack.Screen name={"Registration"} component={RegistrationScreen} />
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen
        name={"PasswordRecovery"}
        component={PasswordRecoveryScreen}
      />
      <Stack.Screen
        name={"ProfileSelection"}
        component={ProfileSelectionScreen}
      />
      <Stack.Screen name={"NewPasswordScreen"} component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};
