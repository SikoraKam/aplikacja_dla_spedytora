import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { theme } from "../../theme";
import { NewOrderDestinationsSection } from "../../components/home/NewOrderDestinationsSection";
import { StartPlaceSection } from "../../components/home/StartPlaceSection";
import { ProviderSection } from "../../components/home/ProviderSection";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { useUser } from "../../hooks/user/useUser";
import { usePlaces } from "../../hooks/places/usePlaces";
import AppLoading from "expo-app-loading";

type NewOrderScreenProps = StackScreenProps<
  HomeScreenStackParamList,
  "NewOrderScreen"
>;

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    places: placesData,
    isLoading: placesDataIsLoading,
    isError: placesDataError,
  } = usePlaces();

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

  console.log("placesDataIsLoading: ", placesDataIsLoading);
  console.log("DATA: ", placesData);

  return (
    <>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Text style={styles.subTitleStyle}>
            Data rozpoczęcia i zakończenia
          </Text>
          <View style={styles.dateInputsContainer}>
            {renderDateStartInput()}
            {renderDateEndInput()}
          </View>

          <Text style={styles.subTitleStyle}>Miejsce startu</Text>
          <StartPlaceSection
            places={placesData}
            isLoading={placesDataIsLoading}
          />
          <Text style={styles.subTitleStyle}>Cele podróży</Text>
          <NewOrderDestinationsSection places={placesData} />
          <Text style={styles.subTitleStyle}>Dostawca</Text>
          <ProviderSection />
        </View>
      </ScrollView>
      <MainButtonComponent
        buttonStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          marginHorizontal: 0,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}
        text={"Dalej"}
        onPress={() => null}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginBottom: 80,
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
    marginTop: 12,
  },
});
