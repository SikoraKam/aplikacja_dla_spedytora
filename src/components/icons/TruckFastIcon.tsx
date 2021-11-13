import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

export const TruckFastIcon = () => {
  return (
    <MaterialCommunityIcons
      name="truck-fast"
      color={theme.colors.darkBlackGreen}
      size={30}
    />
  );
};
