import React from "react";
import { AppScreenStack } from "./AppScreenStack";
import { AuthScreenStack } from "./auth/AuthScreenStack";
import { useAuthStore } from "../store/useAuthStore";

export const AppScreen: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = token !== null;

  if (isAuthenticated) {
    return <AppScreenStack />;
  } else {
    return <AuthScreenStack />;
  }
};
