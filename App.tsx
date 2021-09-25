import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { AppScreen } from "./src/screens/AppScreen";
import { theme } from "./src/theme";
import { useAuthStore } from "./src/store/useAuthStore";
import { getToken } from "./src/utils/tokenUtils";

export default function App() {
  if (__DEV__) {
    import("./ReactotronConfig");
  }
  const setAuthToken = useAuthStore(useCallback((state) => state.setToken, []));

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const tokenFromStorage = await getToken();

      if (tokenFromStorage) setAuthToken(tokenFromStorage);
    };

    getTokenFromStorage();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <AppScreen />
      </NavigationContainer>
    </PaperProvider>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
