import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { theme } from "../../theme";
import { NewOrderDestinationsSection } from "../../components/home/NewOrderDestinationsSection";
import { StartPlaceSection } from "../../components/home/StartPlaceSection";

type NewOrderScreenProps = StackScreenProps<
  HomeScreenStackParamList,
  "NewOrderScreen"
>;

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const [dateStartInputValue, setDateStartInputValue] = useState(new Date());
  const [dateEndInputValue, setDateEndInputValue] = useState(new Date());

  const dateStartInputTextChange = (value: Date) =>
    !!value && setDateStartInputValue(value);

  const dateEndInputTextChange = (value: Date) =>
    !!value && setDateEndInputValue(value);

  const renderDateStartInput = () => (
    <DateInputComponent
      dateInputValue={dateStartInputValue}
      dateInputOnTextChange={dateStartInputTextChange}
      dateEditingDisabled={false}
    />
  );

  const renderDateEndInput = () => (
    <DateInputComponent
      dateInputValue={dateEndInputValue}
      dateInputOnTextChange={dateEndInputTextChange}
      dateEditingDisabled={false}
    />
  );

  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.subTitleStyle}>Data rozpoczęcia i zakończenia</Text>
        <View style={styles.dateInputsContainer}>
          {renderDateStartInput()}
          {renderDateEndInput()}
        </View>

        <StartPlaceSection />
        <NewOrderDestinationsSection />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  dateInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subTitleStyle: {
    ...theme.defaultTextStyle,
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 12,
  },
});
