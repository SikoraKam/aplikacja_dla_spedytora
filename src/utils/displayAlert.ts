import { Alert } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";

export const displayOneButtonAlert = (
  title: string = "Wystąpił błąd",
  description: string = "Spróbuj ponownie później",
  buttonText: string = "Ok"
) =>
  Alert.alert(title, description, [
    {
      text: buttonText,
      onPress: () => {},
    },
  ]);
