import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type IncotermsSectionProps = {
  value?: string;
  setIncotermValue?(value: string): void;
  isEditable?: boolean;
};

const incotermsOptions = [
  "EXW",
  "FCA",
  "FAS",
  "FOB",
  "CFR",
  "CIF",
  "CPT",
  "CIP",
  "DAT",
  "DAP",
  "DDP",
];
export const IncotermsSection: React.FC<IncotermsSectionProps> = ({
  setIncotermValue = () => {},
  value = "",
  isEditable = true,
}) => {
  const renderDropDownIcon = () => {
    return isEditable ? (
      <MaterialCommunityIcons
        name="chevron-down"
        size={20}
        color={theme.colors.darkGreen}
      />
    ) : (
      <View />
    );
  };

  return (
    <SelectDropdown
      data={incotermsOptions}
      onSelect={(selectedItem: string) => {
        setIncotermValue(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem: string) => {
        return selectedItem;
      }}
      rowTextForSelection={(item: string) => {
        return item;
      }}
      defaultButtonText={value ? value : "Incoterm"}
      defaultValue={value}
      buttonStyle={[
        styles.titleDropdownButtonStyle,
        {
          backgroundColor: isEditable
            ? theme.colors.white
            : theme.colors.disabled,
        },
      ]}
      buttonTextStyle={styles.titleButtonTextStyle}
      dropdownIconPosition={"right"}
      renderDropdownIcon={renderDropDownIcon}
      rowStyle={styles.dropdownRowStyle}
      dropdownStyle={{ borderWidth: 0, borderRadius: 8 }}
      rowTextStyle={styles.dropdownRowTextStyle}
      disabled={!isEditable}
    />
  );
};

const styles = StyleSheet.create({
  titleDropdownButtonStyle: {
    borderRadius: 4,
    paddingVertical: 28,
    marginTop: 6,
    borderWidth: 1,
    borderColor: theme.colors.darkGreen,
    width: 150,
  },
  titleButtonTextStyle: {
    textAlign: "left",
    fontSize: 16,
    color: theme.colors.darkGreen,
  },
  dropdownRowStyle: {
    backgroundColor: theme.colors.greenyWhite,
  },
  dropdownRowTextStyle: {
    color: theme.colors.darkGreen,
  },
});
