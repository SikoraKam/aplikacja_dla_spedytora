import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { theme } from "../../theme";
import { LoginForm } from "../../components/auth/LoginForm";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";

type LoginScreenProps = StackScreenProps<AuthScreenStackParamList, "Login">;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <Headline style={styles.headlineStyle}>
        Zaloguj się na swoje konto
      </Headline>
      <LoginForm
        onPressRecoveryPasswordScreenButton={() =>
          navigation.push("PasswordRecovery")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headlineStyle: {
    ...theme.defaultTextStyle,
    fontWeight: "bold",
    color: theme.colors.darkBlackGreen,
    fontSize: 24,
    lineHeight: 24,
    marginBottom: 12,
    marginTop: 40,
  },
});
