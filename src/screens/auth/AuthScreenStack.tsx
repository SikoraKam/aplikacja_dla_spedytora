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

export type AuthScreenStackParamList = {
  Welcome: undefined;
  Registration: undefined;
  Login: undefined;
  PasswordRecovery: undefined;
  ProfileSelection: ProfileSelectionRouteParameters;
};

const Stack = createStackNavigator<AuthScreenStackParamList>();

export const AuthScreenStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => (
          <AppLogo
            style={{ alignSelf: "center" }}
            size={32}
            color={theme.colors.darkGreen}
            {...props}
          />
        ),
        headerTitleAlign: "center",
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
    </Stack.Navigator>
  );
};
