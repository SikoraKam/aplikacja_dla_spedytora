import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { AppScreen } from "./src/screens/AppScreen";
import { theme } from "./src/theme";
import { useAuthStore } from "./src/store/useAuthStore";
import { getToken } from "./src/utils/tokenUtils";
import { NotificationProvider } from "./src/hooks/notifications/useNotification";

export default function App() {
  const setAuthToken = useAuthStore(useCallback((state) => state.setToken, []));

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const tokenFromStorage = await getToken();

      if (tokenFromStorage) setAuthToken(tokenFromStorage);
    };

    getTokenFromStorage();
  }, []);
  return (
    <NotificationProvider>
      <PaperProvider>
        <NavigationContainer theme={MyTheme}>
          {/*<SWRConfig value={{ provider: () => new Map() }}>*/}
          <AppScreen />
          {/*</SWRConfig>*/}
        </NavigationContainer>
      </PaperProvider>
    </NotificationProvider>
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
