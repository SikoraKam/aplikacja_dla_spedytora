import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HistoryItemProps {}

export const HistoryItem: React.FC<HistoryItemProps> = ({}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.firstColumnText]}
          >
            Skąd
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.secondColumnText]}
          >
            Dokąd
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.thirdColumnText]}
          />
        </View>
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons
            style={[styles.firstColumnText, styles.textStyle]}
            name={"package-up"}
            size={20}
          />
          <MaterialCommunityIcons
            style={[styles.secondColumnText, styles.textStyle]}
            name={"package-down"}
            size={20}
          />
          <View style={[styles.textStyle, styles.thirdColumnText]} />
        </View>
        <View style={styles.iconsRowContainer}>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.firstColumnText]}
          >
            12.04.2021
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.secondColumnText]}
          >
            12.04.2021
          </Text>
          <View style={{ flexDirection: "column" }}>
            <Text
              numberOfLines={1}
              style={[styles.textStyle, styles.thirdColumnText]}
            >
              Mirosław
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.textStyle, styles.thirdColumnText]}
            >
              Adamowicz
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 105,
    backgroundColor: theme.colors.greenyWhite,
    marginVertical: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    textAlign: "center",
    width: 90,
  },
  firstColumnText: {
    left: 4,
  },
  secondColumnText: {},
  thirdColumnText: {
    right: 4,
  },
});
