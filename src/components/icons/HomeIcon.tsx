import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

export const HomeIcon = ({}) => {
  return (
    <MaterialCommunityIcons
      name={"home"}
      color={theme.colors.darkBlackGreen}
      size={30}
    />
  );
};
