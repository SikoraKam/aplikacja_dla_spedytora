import React from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";
import { LoginForm } from "../../components/auth/LoginForm";
import { theme } from "../../theme";
import { NewPasswordForm } from "../../components/auth/NewPasswordForm";

type NewPasswordScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  "NewPasswordScreen"
>;

export const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <View style={styles.screenContainer}>
      <Headline style={styles.headlineStyle}>Ustaw nowe hasło</Headline>
      <NewPasswordForm />
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
