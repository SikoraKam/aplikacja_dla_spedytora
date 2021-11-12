import * as React from "react";
import { List } from "react-native-paper";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

type ModalContentItemProps = {
  title: string;
  description: string;
  onPress?(): void;
  isSelected?: boolean;
  leftComponent?: any;
  leftIconName?: string;
};

export const ModalContentItem: React.FC<ModalContentItemProps> = ({
  title,
  description,
  onPress = () => {},
  isSelected = false,
  leftComponent,
  leftIconName = "home-city-outline",
}) => {
  const backgroundColorStyle = isSelected
    ? styles.listItemBackgroundColorSelected
    : styles.listItemBackgroundColorUnselected;

  const handleOnPressItem = () => {
    onPress();
  };

  const renderLeftComponent = (defaultProps: any) =>
    leftComponent ?? (
      <List.Icon
        {...defaultProps}
        icon={leftIconName}
        color={theme.colors.darkGreen}
      />
    );

  return (
    <TouchableOpacity onPress={handleOnPressItem}>
      <List.Item
        style={[styles.listItemStyle, backgroundColorStyle]}
        title={title}
        description={description}
        left={(props) => renderLeftComponent(props)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemStyle: {},
  listItemBackgroundColorSelected: {
    backgroundColor: theme.colors.secondaryGreen,
    borderWidth: 1,
    borderColor: theme.colors.primaryGreen,
  },
  listItemBackgroundColorUnselected: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
});
