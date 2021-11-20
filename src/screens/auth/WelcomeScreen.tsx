import React from "react";
import { StyleSheet, View } from "react-native";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";
import { theme } from "../../theme";
import { Headline, Text } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";

type WelcomeScreenProps = StackScreenProps<AuthScreenStackParamList, "Welcome">;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <View>
        <Headline style={styles.headlineStyle}>
          Mobilna Platforma Logistyczna
        </Headline>
      </View>

      <Octicons
        name="package"
        size={150}
        style={{ alignSelf: "center", marginTop: 40 }}
        color={theme.colors.blackGreen}
      />

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
