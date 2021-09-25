import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { HistoryItem } from "../../components/home/HistoryItem";
import { MainButtonComponent } from "../../components/MainButtonComponent";

type HomeScreenProps = StackScreenProps<HomeScreenStackParamList, "HomeScreen">;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.historyButtonStyle}>
        <Text style={styles.historyButtonHeadlineTextStyle}>
          Historia Zleceń
        </Text>
        <Text style={styles.historyButtonSeeMoreTextStyle}>Zobacz więcej</Text>
      </TouchableOpacity>

      <View>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
      </View>

      <View style={styles.addButtonContainer}>
        <MainButtonComponent
          buttonStyle={styles.addButtonStyle}
          text="Zrealizuj nowe zlecenie"
          onPress={() => null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historyButtonStyle: {
    height: 72,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  historyButtonHeadlineTextStyle: {
    textAlign: "center",
    fontSize: 18,
  },
  historyButtonSeeMoreTextStyle: {
    textAlign: "center",
    fontSize: 14,
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  addButtonStyle: {},
});
