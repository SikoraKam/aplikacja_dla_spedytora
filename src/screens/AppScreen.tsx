import React, { useCallback, useEffect } from "react";
import { AppScreenStack } from "./AppScreenStack";
import { AuthScreenStack } from "./auth/AuthScreenStack";
import { useAuthStore } from "../store/useAuthStore";
import { getToken } from "../utils/tokenUtils";

export const AppScreen: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = token !== null;

  if (isAuthenticated) {
    return <AppScreenStack />;
  } else {
    return <AuthScreenStack />;
  }
};
