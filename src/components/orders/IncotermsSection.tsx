import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type IncotermsSectionProps = {
  setIncotermValue(value: string): void;
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
  setIncotermValue,
}) => {
  const renderDropDownIcon = () => (
    <MaterialCommunityIcons
      name="chevron-down"
      size={20}
      color={theme.colors.darkGreen}
    />
  );

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
      defaultButtonText="Incoterm"
      buttonStyle={styles.titleDropdownButtonStyle}
      buttonTextStyle={styles.titleButtonTextStyle}
      dropdownIconPosition={"right"}
      renderDropdownIcon={renderDropDownIcon}
      rowStyle={styles.dropdownRowStyle}
      dropdownStyle={{ borderWidth: 0, borderRadius: 8 }}
      rowTextStyle={styles.dropdownRowTextStyle}
    />
  );
};

const styles = StyleSheet.create({
  titleDropdownButtonStyle: {
    backgroundColor: theme.colors.white,
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
