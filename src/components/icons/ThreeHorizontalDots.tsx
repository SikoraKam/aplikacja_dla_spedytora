import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

type IconProps = {
  onPress(): void;
};

export const ThreeHorizontalDots: React.FC<IconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={onPress}>
      <MaterialCommunityIcons
        name={"dots-horizontal"}
        size={theme.sizes.iconHeaderSize}
      />
    </TouchableOpacity>
  );
};
