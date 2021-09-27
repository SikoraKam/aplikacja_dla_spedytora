import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { AppScreen } from "./src/screens/AppScreen";
import { theme } from "./src/theme";
import AppLoading from "expo-app-loading";
import { useProfile } from "./src/hooks/user/useProfile";
import useSWR from "swr";
import { fetcher } from "./src/utils/fetcher";

export default function App() {
  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchData}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
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
