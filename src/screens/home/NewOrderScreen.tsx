import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { DateInputComponent } from "../../components/shared/DateInputComponent";

type NewOrderScreenProps = StackScreenProps<
  HomeScreenStackParamList,
  "NewOrderScreen"
>;

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const [dateInputValue, setDateInputValue] = useState(new Date());
  const dateInputTextChange = (value: Date) =>
    !!value && setDateInputValue(value);

  const renderDateInput = () => (
    <DateInputComponent
      dateInputValue={dateInputValue}
      dateInputOnTextChange={dateInputTextChange}
      dateEditingDisabled={false}
    />
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.dateInputsContainer}>
        {renderDateInput()}
        {renderDateInput()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  dateInputsContainer: {
    flexDirection: "row",
  },
});
