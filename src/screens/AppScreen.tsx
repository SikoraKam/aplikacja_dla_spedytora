import React from "react";
import { AppScreenStack } from "./AppScreenStack";

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

  //   if (isAuthenticated) {
  //     return <AppScreenStack />;
  //   } else {
  //     return <AuthScreenStack />;
  //   }
  // };

  return <AppScreenStack />;
};
