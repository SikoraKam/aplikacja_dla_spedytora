import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { theme } from "../../theme";
import { ModalComponent } from "../../components/shared/ModalComponent";
import { Button } from "react-native-paper";
import { MainInputComponent } from "../../components/MainInputComponent";
import { NewOrderDestinationsSection } from "../../components/home/NewOrderDestinationsSection";

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [placeStartValue, setPlaceStartValue] = useState("");

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

  const renderModalContent = () => (
    <>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
      <Text>HEHEH</Text>
    </>
  );

  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.subTitleStyle}>Data rozpoczęcia i zakończenia</Text>
        <View style={styles.dateInputsContainer}>
          {renderDateStartInput()}
          {renderDateEndInput()}
        </View>

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <MainInputComponent
            text={placeStartValue}
            setText={setPlaceStartValue}
            editable={false}
            label="Miejsce startu"
            style={{ marginHorizontal: 24 }}
          />
        </TouchableOpacity>

        <NewOrderDestinationsSection />
      </View>

      <ModalComponent
        title={"Miejsce rozpoczęcia"}
        renderContent={renderModalContent}
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
      />
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
