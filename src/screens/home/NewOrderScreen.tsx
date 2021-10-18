import compareAsc from "date-fns/compareAsc";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { theme } from "../../theme";
import { NewOrderDestinationsSection } from "../../components/home/NewOrderDestinationsSection";
import { StartPlaceSection } from "../../components/home/StartPlaceSection";
import { ProviderSection } from "../../components/home/ProviderSection";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { usePlaces } from "../../hooks/places/usePlaces";
import { useProviders } from "../../hooks/user/useProviders";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { createOrder } from "../../services/PostService";
import { useProfileStore } from "../../store/useProfileStore";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { useOrders } from "../../hooks/orders/useOrders";

type NewOrderScreenProps = StackScreenProps<
  HomeScreenStackParamList,
  "NewOrderScreen"
>;

const createOrderInitialStatus = OrderStatusEnum.WAITING;

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const userId = useProfileStore((state) => state._id);
  const profileType = useProfileStore((state) => state.profileType);
  const { mutate } = useOrders(profileType);

  const {
    places: placesData,
    isLoading: placesDataIsLoading,
    isError: placesDataError,
  } = usePlaces();

  const {
    providers: providersData,
    isLoading: providersDataIsLoading,
    isError: providersDataError,
  } = useProviders();

  const [dateStartInputValue, setDateStartInputValue] = useState(new Date());
  const [dateEndInputValue, setDateEndInputValue] = useState(new Date());
  const [providerId, setProviderId] = useState<string>("");
  const [placeStartId, setPlaceStartId] = useState("");
  const [destinationsIdArray, setDestinationsIdArray] = useState<string[]>([]);

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

  const validateDates = () => {
    const formattedDateStart = dateStartInputValue.setHours(0, 0, 0, 0);
    const formattedEndStart = dateEndInputValue.setHours(0, 0, 0, 0);
    const comparison = compareAsc(formattedDateStart, formattedEndStart);

    if (!comparison) {
      displayOneButtonAlert(
        "Nieprawidłowa data",
        "Początek zlecenia nie może być po dacie zakończenia",
        "Ok"
      );
      return false;
    }
    return true;
  };

  const handleCreateOrder = async () => {
    const datesAreValid = validateDates();
    if (!datesAreValid) return;

    if (!userId) {
      console.log("invalid userID", userId);
      return;
    }

    try {
      const orderBody = {
        dateStart: dateStartInputValue,
        dateEnd: dateEndInputValue,
        forwarder: userId,
        provider: providerId,
        destinations: destinationsIdArray,
        placeStart: placeStartId,
        orderStatus: createOrderInitialStatus,
      };

      await mutate(createOrder(orderBody));

      navigation.popToTop();
    } catch (error) {
      displayOneButtonAlert();
      console.log("ERROR", error);
    }
  };

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
            setSelectedPlaceId={setPlaceStartId}
          />
          <Text style={styles.subTitleStyle}>Cele podróży</Text>
          <NewOrderDestinationsSection
            places={placesData}
            setSelectedPlacesId={setDestinationsIdArray}
          />
          <Text style={styles.subTitleStyle}>Dostawca</Text>
          <ProviderSection
            providers={providersData}
            setSelectedProviderId={setProviderId}
          />
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
        onPress={handleCreateOrder}
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
