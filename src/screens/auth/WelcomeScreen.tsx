import React from "react";
import { StyleSheet, View } from "react-native";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";
import { theme } from "../../theme";
import { Headline, Text } from "react-native-paper";

type WelcomeScreenProps = StackScreenProps<AuthScreenStackParamList, "Welcome">;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <View>
        <Headline style={styles.headlineStyle}>Tytuł Aplikacji</Headline>
      </View>
      <View style={styles.buttonGroup}>
        <MainButtonComponent
          text="Zarejestruj się"
          onPress={() => navigation.push("Registration")}
          buttonStyle={styles.buttonStyle}
        />
        <MainButtonComponent
          text="Zaloguj się"
          onPress={() => navigation.push("Login")}
          buttonStyle={styles.buttonStyle}
        />
      </View>
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
    fontSize: 36,
    lineHeight: 36,
    marginBottom: 12,
    marginTop: 24,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "30%",
  },
  buttonStyle: {
    marginBottom: 12,
  },
});
