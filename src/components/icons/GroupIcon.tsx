import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import React from "react";

export const GroupIcon = () => {
  return (
    <MaterialCommunityIcons
      name="account-group"
      size={30}
      color={theme.colors.darkBlackGreen}
    />
  );
};
