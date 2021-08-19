import React from "react";
import { AppScreenStack } from "./AppScreenStack";
import { AuthScreenStack } from "./auth/AuthScreenStack";

export const AppScreen: React.FC = () => {
  // const { isLoading, isAuthenticated } = useAuth();
  // const [fontsLoaded] = useFonts({
  //   Inter_100Thin,
  //   Inter_300Light,
  //   Inter_400Regular,
  //   Inter_500Medium,
  // });

  // if (isLoading || !fontsLoaded) {
  //   return <AppLoading />;
  // }

  const x = 1;
  if (x < 2) {
    return <AppScreenStack />;
  } else {
    return <AuthScreenStack />;
  }
};
