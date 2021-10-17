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
};

export const ModalContentItem: React.FC<ModalContentItemProps> = ({
  title,
  description,
  onPress = () => {},
  isSelected = false,
}) => {
  const backgroundColorStyle = isSelected
    ? styles.listItemBackgroundColorSelected
    : styles.listItemBackgroundColorUnselected;

  const handleOnPressItem = () => {
    onPress();
  };

  return (
    <TouchableOpacity onPress={handleOnPressItem}>
      <List.Item
        style={[styles.listItemStyle, backgroundColorStyle]}
        title={title}
        description={description}
        left={(props) => <List.Icon {...props} icon="folder" />}
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
