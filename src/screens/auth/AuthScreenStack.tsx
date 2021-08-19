import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "./WelcomeScreen";
import { RegistrationScreen } from "./RegistrationScreen";
import { LoginScreen } from "./LoginScreen";
import { PasswordRecoveryScreen } from "./PasswordRecoveryScreen";

export type AuthScreenStackParamList = {
  Welcome: undefined;
  Registration: undefined;
  Login: undefined;
  PasswordRecovery: undefined;
};

const Stack = createStackNavigator<AuthScreenStackParamList>();

export const AuthScreenStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
      <Stack.Screen name={"Registration"} component={RegistrationScreen} />
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen
        name={"PasswordRecovery"}
        component={PasswordRecoveryScreen}
      />
    </Stack.Navigator>
  );
};
