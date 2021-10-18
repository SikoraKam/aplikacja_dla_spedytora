import { Alert } from "react-native";

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
