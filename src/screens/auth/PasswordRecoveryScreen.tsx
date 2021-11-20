import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Headline } from "react-native-paper";
import { theme } from "../../theme";
import { PasswordRecoveryForm } from "../../components/auth/PasswordRecoveryForm";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";

type PasswordRecoveryScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  "PasswordRecovery"
>;

export const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.screenContainer}>
      <Headline style={styles.headlineStyle}>Odzyskiwanie hasła</Headline>
      <Text style={styles.subheader}>
        Podaj adres email, na który otrzymasz kod potrzebny do wygenerowania
        nowego hasła
      </Text>
      <PasswordRecoveryForm />
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
  subheader: {
    ...theme.defaultTextStyle,
    color: theme.colors.darkBlackGreen,
    fontSize: 14,
    marginHorizontal: 8,
  },
});
