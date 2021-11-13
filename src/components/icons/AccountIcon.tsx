import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import React from "react";

export const AccountIcon = () => {
  return (
    <MaterialCommunityIcons
      name="account-tie"
      size={30}
      color={theme.colors.darkBlackGreen}
    />
  );
};
