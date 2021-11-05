import React, { useCallback, useEffect, useState } from "react";
import { AppScreenStack } from "./AppScreenStack";
import { AuthScreenStack } from "./auth/AuthScreenStack";
import { useAuthStore } from "../store/useAuthStore";
import AppLoading from "expo-app-loading";
import { Text } from "react-native";
import { useUser } from "../hooks/user/useUser";
import { useProfileStore } from "../store/useProfileStore";
import { logoutRequest, resetStores } from "../services/AuthService";

export const AppScreen: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const setProfileType = useProfileStore(
    useCallback((state) => state.setProfileType, [])
  );
  const setUserId = useProfileStore(useCallback((state) => state.setId, []));
  const setNameAndLastName = useProfileStore(
    useCallback((state) => state.setNameAndLastName, [])
  );
  const isAuthenticated = token !== null;
  console.log(token);

  const [isReady, setIsReady] = useState(false);

  const {
    user: userData,
    isLoading: userDataIsLoading,
    isError: userDataError,
    mutate: mutateUser,
  } = useUser();

  useEffect(() => {
    if (token) {
      mutateUser();
    } else {
      // resetStores();
    }
  }, [token]);

  useEffect(() => {
    if (userData && !userDataError) {
      setUserProfileData();
      setIsReady(true);
    }
  }, [userData, userDataError, isAuthenticated]);

  const setUserProfileData = () => {
    setProfileType(userData?.profileType);
    setUserId(userData?._id);
    setNameAndLastName(`${userData.name} ${userData.lastName}`);
  };

  if (isAuthenticated) {
    if (userDataError) {
      console.log("=====> ", userDataError);
    }

    if (!isReady) {
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
