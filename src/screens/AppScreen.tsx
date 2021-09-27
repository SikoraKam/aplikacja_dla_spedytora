import React, { useEffect, useState } from "react";
import { AppScreenStack } from "./AppScreenStack";
import { AuthScreenStack } from "./auth/AuthScreenStack";
import { useAuthStore } from "../store/useAuthStore";
import AppLoading from "expo-app-loading";
import { useProfile } from "../hooks/user/useProfile";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Text } from "react-native";

export const AppScreen: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = token !== null;

  const [isReady, setIsReady] = useState(false);

  const {
    user: userProfileData,
    isLoading: userProfileDataIsLoading,
    isError: userProfileDataError,
  } = useProfile();

  const { data: userData, error: userDataError } = useSWR(
    () => "users/" + userProfileData.userId,
    fetcher
  );

  useEffect(() => {
    if (userData && !userDataError) {
      setIsReady(true);
    }
  }, [userData, userDataError]);

  if (isAuthenticated) {
    if (!isReady) {
      return <AppLoading />;
    }
    if (userDataError || userProfileDataError) {
      return <Text>ERROR</Text>;
    }
    return <AppScreenStack />;
  } else {
    return <AuthScreenStack />;
  }
};
