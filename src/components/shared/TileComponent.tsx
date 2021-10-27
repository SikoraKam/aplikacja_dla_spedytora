import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../theme";

type TileComponentProps = {
  name: string;
  description?: string;
  customContainerStyle?: any;
};

export const TileComponent: React.FC<TileComponentProps> = ({
  name,
  customContainerStyle,
  description,
}) => {
  const containerHeight = description ? 60 : 40;

  return (
    <View
      style={[
        tagContainerStyle,
        customContainerStyle,
        { height: containerHeight },
      ]}
    >
      <Text style={tagTextStyle}>{name}</Text>
      <Text numberOfLines={1} style={descriptionTextStyle}>
        {description}
      </Text>
    </View>
  );
};

const {
  tagContainerStyle,
  tagTextStyle,
  descriptionTextStyle,
} = StyleSheet.create({
  tagContainerStyle: {
    alignItems: "center",
    margin: 2,
    borderRadius: 12,
    backgroundColor: theme.colors.greenBackgroundLight,
    borderColor: theme.colors.secondaryGreen,
    borderWidth: 1,
  },
  tagTextStyle: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.colors.darkBlackGreen,
  },
  descriptionTextStyle: {
    paddingHorizontal: 16,
    fontSize: 12,
    color: theme.colors.darkBlackGreen,
  },
});
