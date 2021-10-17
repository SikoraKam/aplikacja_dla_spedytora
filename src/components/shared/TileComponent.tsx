import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../theme";

type TileComponentProps = {
  name: string;
  customContainerStyle?: any;
};

export const TileComponent: React.FC<TileComponentProps> = ({
  name,
  customContainerStyle,
}) => (
  <View style={[tagContainerStyle, customContainerStyle]}>
    <Text style={tagTextStyle}>{name}</Text>
  </View>
);

const { tagContainerStyle, tagTextStyle } = StyleSheet.create({
  tagContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    margin: 2,
    borderRadius: 12,
    backgroundColor: theme.colors.greenBackgroundLight,
    borderColor: theme.colors.secondaryGreen,
    borderWidth: 1,
    height: 40,
  },
  tagTextStyle: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.colors.darkBlackGreen,
  },
});
