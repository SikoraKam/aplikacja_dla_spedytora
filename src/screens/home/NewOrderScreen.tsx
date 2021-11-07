import compareAsc from "date-fns/compareAsc";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { theme } from "../../theme";
import { NewOrderDestinationsSection } from "../../components/orders/NewOrderDestinationsSection";
import { StartPlaceSection } from "../../components/orders/StartPlaceSection";
import { ProviderSection } from "../../components/orders/ProviderSection";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { usePlaces } from "../../hooks/places/usePlaces";
import { useProviders } from "../../hooks/user/useProviders";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { createOrder } from "../../services/PostService";
import { useProfileStore } from "../../store/useProfileStore";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { useOrders } from "../../hooks/orders/useOrders";
import { ThreeHorizontalDots } from "../../components/icons/ThreeHorizontalDots";
import { OrderMenu } from "../../components/orders/OrderMenu";
import { TspSection } from "../../components/orders/TspSection";
import { PlaceObject } from "../../types/places/PlaceObject";
import { CategorySection } from "../../components/orders/CategorySection";
import { DescriptionSection } from "../../components/orders/DescriptionSection";
import { WeightSection } from "../../components/orders/WeightSection";

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
  const { mutate: mutateOrders } = useOrders(profileType);

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
  const [placeStart, setPlaceStart] = useState<PlaceObject | null>(null);
  const [destinationsArray, setDestinationsArray] = useState<PlaceObject[]>([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isTspSectionVisible, setIsTspSectionVisible] = useState(false);
  const tspArray = [placeStart, ...destinationsArray];
  const availableDestinations = placesData?.filter(
    (element: PlaceObject) => element !== placeStart
  );
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState<string>("0");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThreeHorizontalDots onPress={() => setIsMenuVisible(true)} />
      ),
    });
  }, [navigation]);

  const handleOnPressTspMenuItem = () => {
    if (!placeStart) {
      return displayOneButtonAlert(
        "NIe wybrano miejsca startowego",
        "Wybierz punkt z którego powinieneś wyruszyć"
      );
    }

    if (tspArray.length < 3) {
      return displayOneButtonAlert(
        "Za mało obranych celów podróży",
        "Aby wyliczyć trasę potrzebujesz przynajmniej dwóch celów"
      );
    }
    if (tspArray.length > 11) {
      return displayOneButtonAlert(
        "Za dużo obranych celów",
        "Zbyt duża złożoność obliczeniowa"
      );
    }

    setIsTspSectionVisible(true);
  };

  const renderMenu = () => (
    <OrderMenu
      isMenuVisible={isMenuVisible}
      setIsMenuVisible={setIsMenuVisible}
      onPressTspItem={handleOnPressTspMenuItem}
    />
  );

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
    const formattedDateEnd = dateEndInputValue.setHours(0, 0, 0, 0);
    const comparison = compareAsc(formattedDateStart, formattedDateEnd);

    if (comparison >= 0) {
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
      const destinationsArrayId = destinationsArray.map(
        (element) => element?._id
      );

      const orderBody = {
        dateStart: dateStartInputValue,
        dateEnd: dateEndInputValue,
        forwarder: userId,
        provider: providerId,
        destinations: destinationsArrayId,
        placeStart: placeStart!._id,
        orderStatus: createOrderInitialStatus,
      };

      // here we simply revalidate as we dont have ordersData fetched on that screen
      await createOrder(orderBody);
      await mutateOrders();

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
            pressedItem={placeStart}
            setPressedItem={setPlaceStart}
            places={placesData}
            isLoading={placesDataIsLoading}
          />
          <Text style={styles.subTitleStyle}>Cele podróży</Text>
          <NewOrderDestinationsSection
            approvedArray={destinationsArray}
            setApprovedArray={setDestinationsArray}
            places={availableDestinations}
          />
          <Text style={styles.subTitleStyle}>Dostawca</Text>
          <ProviderSection
            providers={providersData}
            setSelectedProviderId={setProviderId}
          />

          <View style={styles.orderParamsSection}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <CategorySection
                categoryValue={category}
                setCategoryValue={setCategory}
                isEditable={true}
              />
              <WeightSection value={weight} setValue={setWeight} />
            </View>

            <DescriptionSection
              value={description}
              setValue={setDescription}
              isEditable={true}
            />
          </View>
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

      {placeStart && isTspSectionVisible && (
        <TspSection
          visible={isTspSectionVisible}
          hideModal={() => setIsTspSectionVisible(false)}
          places={[placeStart, ...destinationsArray]}
        />
      )}
      {renderMenu()}
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
    marginTop: 12,
  },
  orderParamsSection: {
    marginTop: 8,
    backgroundColor: theme.colors.greenyWhite,
  },
});
