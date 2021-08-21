import React from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Headline } from "react-native-paper";
import { theme } from "../../theme";
import { RegistrationForm } from "../../components/auth/RegistrationForm";

type RegisterScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  "Registration"
>;

export const RegistrationScreen: React.FC<RegisterScreenProps> = () => {
  return (
    <KeyboardAvoidingView style={styles.screenContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <Headline style={styles.headlineStyle}>Tytuł Aplikacji</Headline>
          <Text style={styles.subheader}>
            Zarejestruj się aby korzystać z aplikacji
          </Text>
        </View>
        <RegistrationForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  headlineStyle: {
    ...theme.defaultTextStyle,
    fontWeight: "bold",
    color: theme.colors.darkBlackGreen,
    fontSize: 36,
    lineHeight: 36,
    marginBottom: 12,
    marginTop: 24,
  },
  subheader: {
    ...theme.defaultTextStyle,
    color: theme.colors.darkBlackGreen,
    fontSize: 14,
  },
});
