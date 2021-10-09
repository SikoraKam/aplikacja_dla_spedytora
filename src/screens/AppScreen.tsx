import React, { useEffect, useState } from "react";
import { AppScreenStack } from "./AppScreenStack";
import { AuthScreenStack } from "./auth/AuthScreenStack";
import { useAuthStore } from "../store/useAuthStore";
import AppLoading from "expo-app-loading";
import { useProfile } from "../hooks/user/useProfile";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Text } from "react-native";
import { useUser } from "../hooks/user/useUser";

export const AppScreen: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = token !== null;
  console.log(token);

  const [isReady, setIsReady] = useState(false);

  const {
    user: userData,
    isLoading: userDataIsLoading,
    isError: userDataError,
  } = useUser();

  useEffect(() => {
    if (userData && !userDataError) {
      setIsReady(true);
    }
  }, [userData, userDataError]);

  if (isAuthenticated) {
    if (!isReady) {
      console.log("IS LOADING ====>");
      return <AppLoading />;
    }
    if (userDataError) {
      return <Text>ERROR</Text>;
    }
    return <AppScreenStack />;
  } else {
    return <AuthScreenStack />;
  }
};
