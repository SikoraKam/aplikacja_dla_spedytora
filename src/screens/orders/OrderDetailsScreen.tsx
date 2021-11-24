import React, { useLayoutEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import * as Location from "expo-location";

import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StartPlaceSection } from "../../components/orders/StartPlaceSection";
import { NewOrderDestinationsSection } from "../../components/orders/NewOrderDestinationsSection";
import { ProviderSection } from "../../components/orders/ProviderSection";
import { theme } from "../../theme";
import { OrderStatusSection } from "../../components/orders/OrderStatusSection";
import { useProfileStore } from "../../store/useProfileStore";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { useOrders } from "../../hooks/orders/useOrders";
import { updateOrder, updateProviderRating } from "../../services/PatchService";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { RatingSection } from "../../components/orders/RatingSection";
import { ThreeHorizontalDots } from "../../components/icons/ThreeHorizontalDots";
import { OrderMenu } from "../../components/orders/OrderMenu";
import { TspSection } from "../../components/orders/TspSection";
import {
  hasLocationPermissionsGranted,
  registerLocationListener,
  stopLocationUpdate,
} from "../../services/LocationService";
import { useTempStore } from "../../store/useTempStore";
import shallow from "zustand/shallow";
import {
  createPositionRequest,
  deletePositionRequest,
} from "../../services/PostService";
import { checkIfTaskUpdateLocationIsRegistered } from "../../services/TasksService";
import { useSWRConfig } from "swr";
import {
  QUERY_POSITIONS_PROVIDER,
  QUERY_PROVIDERS,
} from "../../constants/queryConstants";
import { CategorySection } from "../../components/orders/CategorySection";
import { WeightSection } from "../../components/orders/WeightSection";
import { DescriptionSection } from "../../components/orders/DescriptionSection";
import { NotificationAlert } from "../../components/shared/NotificationAlert";
import { IncotermsSection } from "../../components/orders/IncotermsSection";
import { TruckTypeSection } from "../../components/orders/TruckTypeSection";

type OrderDetailsScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "OrderDetailsScreen"
>;

export const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const profileType = useProfileStore((state) => state.profileType);
  const [
    locationTaskFirstUpdateRequested,
    locationTaskOnStartApplicationDefined,
    setLocationTaskFirstUpdateRequested,
  ] = useTempStore(
    (state) => [
      state.locationTaskFirstUpdateRequested,
      state.locationTaskOnStartApplicationDefined,
      state.setLocationTaskFirstUpdateRequested,
    ],
    shallow
  );
  const { orders: ordersData, mutate: mutateOrders } = useOrders(profileType);
  const { mutate } = useSWRConfig();

  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const [mark, setMark] = useState<number>(5);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isTspSectionVisible, setIsTspSectionVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { order, notificationAlertData, showNotificationAlert } = route.params;
  const tspArray = [order.placeStart, ...order.destinations];

  const displayStatusButton =
    profileType === ProfileTypeEnum.Provider &&
    order.orderStatus !== OrderStatusEnum.COMPLETED &&
    order.orderStatus !== OrderStatusEnum.REJECTED;

  const displayRatingButton =
    profileType === ProfileTypeEnum.Forwarder &&
    order.orderStatus === OrderStatusEnum.COMPLETED;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThreeHorizontalDots onPress={() => setIsMenuVisible(true)} />
      ),
    });
  }, [navigation]);

  const handleOnPressTspMenuItem = () => {
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

  const handleOnPressMapMenuItem = () => {
    navigation.push("PositionOnMapScreen", { order });
  };

  const handleOnPressNotificationMenuItem = () => {
    navigation.push("SendNotificationScreen", { order });
  };

  const renderMenu = () => (
    <OrderMenu
      isMenuVisible={isMenuVisible}
      setIsMenuVisible={setIsMenuVisible}
      onPressTspItem={handleOnPressTspMenuItem}
      onPressMapItem={handleOnPressMapMenuItem}
      isSendNotificationVisible={profileType === ProfileTypeEnum.Provider}
      onSendNotificationPress={handleOnPressNotificationMenuItem}
    />
  );

  const renderDateStartInput = () => (
    <DateInputComponent
      dateInputValue={order.dateStart}
      dateEditingDisabled={true}
    />
  );

  const renderDateEndInput = () => (
    <DateInputComponent
      dateInputValue={order.dateEnd}
      dateEditingDisabled={true}
    />
  );

  const selectButtonText = () => {
    switch (order.orderStatus) {
      case OrderStatusEnum.ACCEPTED:
        return "Rozpocznij zlecenie";
      case OrderStatusEnum.IN_PROGRESS:
        return "Oznacz jako wykonane";
      case OrderStatusEnum.WAITING:
        return "Zaakceptuj zlecenie";
      default:
        return "Dalej";
    }
  };

  const handleStatusButtonPress = () => {
    switch (order.orderStatus) {
      case OrderStatusEnum.ACCEPTED:
        return requestUpdateOrder(OrderStatusEnum.IN_PROGRESS);
      case OrderStatusEnum.IN_PROGRESS:
        return requestUpdateOrder(OrderStatusEnum.COMPLETED);
      // case OrderStatusEnum.WAITING:
      // return requestUpdateOrder(OrderStatusEnum.ACCEPTED);
      default:
        return requestUpdateOrder(OrderStatusEnum.ACCEPTED);
    }
  };

  const renderNextStatusButtonForWaitingStatus = (
    buttonText: string,
    onPress: () => void,
    isReject: boolean
  ) => (
    <MainButtonComponent
      buttonStyle={{
        right: isReject ? 0 : "51%",
        position: "absolute",
        bottom: 0,
        width: "49%",
        marginHorizontal: 0,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        backgroundColor: isReject
          ? theme.colors.primaryDarkGreen
          : theme.colors.lightGreen,
      }}
      text={buttonText}
      onPress={onPress}
    />
  );

  // button should be rendered on for accepted and in progress, two for waiting
  const renderStatusButton = () => {
    if (
      order.orderStatus === OrderStatusEnum.ACCEPTED ||
      order.orderStatus === OrderStatusEnum.IN_PROGRESS
    ) {
      return (
        <MainButtonComponent
          buttonStyle={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            marginHorizontal: 0,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          }}
          text={selectButtonText()}
          onPress={handleStatusButtonPress}
        />
      );
    } else if (order.orderStatus === OrderStatusEnum.WAITING) {
      return (
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderNextStatusButtonForWaitingStatus(
            "Zaakceptuj",
            () => requestUpdateOrder(OrderStatusEnum.ACCEPTED),
            false
          )}
          {renderNextStatusButtonForWaitingStatus(
            "Odrzuć",
            () => requestUpdateOrder(OrderStatusEnum.REJECTED),
            true
          )}
        </View>
      );
    }
  };

  const setLocation = async () => {
    try {
      const canGetLocation = await hasLocationPermissionsGranted();
      if (!canGetLocation) {
        setIsLoading(false);
        return;
      }

      const position: {
        coords: { latitude: number; longitude: number };
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const latitude = position.coords?.latitude;
      const longitude = position.coords?.longitude;

      const res = await Location.enableNetworkProviderAsync();
      const positionResponse = await createPositionRequest({
        latitude,
        longitude,
      });
      await mutate(QUERY_POSITIONS_PROVIDER);
      console.log("positionResponse Latitude: ", positionResponse?.latitude);
      await registerLocationListener();
      setLocationTaskFirstUpdateRequested();
    } catch (e) {
      displayOneButtonAlert("Nie można pobrać lokalizacji");
    }
  };

  const stopUpdatingLocation = async () => {
    await deletePositionRequest(order.provider._id);
    await mutate(QUERY_POSITIONS_PROVIDER);
    const locationTaskIsActive = await checkIfTaskUpdateLocationIsRegistered();
    if (locationTaskIsActive) {
      await stopLocationUpdate();
    }
  };

  const sendUpdateRequestAndMutate = async (newOrderBody: {
    orderStatus: OrderStatusEnum;
  }) => {
    await mutateOrders(async (ordersData) => {
      const updatedOrder = await updateOrder(order._id, newOrderBody);
      const filteredOrders = ordersData!.filter(
        (item) => item._id !== order._id
      );
      return [...filteredOrders, updatedOrder];
    });
  };

  const requestUpdateOrder = async (newOrderStatus: OrderStatusEnum) => {
    setIsLoading(true);
    const locationListenerIsRegistered =
      locationTaskOnStartApplicationDefined || locationTaskFirstUpdateRequested;
    if (
      newOrderStatus === OrderStatusEnum.IN_PROGRESS &&
      !locationListenerIsRegistered
    ) {
      await setLocation();
    }

    if (newOrderStatus === OrderStatusEnum.COMPLETED) {
      await stopUpdatingLocation();
    }

    const newOrderBody = {
      orderStatus: newOrderStatus,
    };

    try {
      if (!ordersData) {
        setIsLoading(false);
        return;
      }

      await sendUpdateRequestAndMutate(newOrderBody);
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      displayOneButtonAlert();
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const requestUpdateProviderRating = async () => {
    const ratingBody = {
      mark,
    };
    try {
      await updateProviderRating(order.provider._id, ratingBody);
      mutate(QUERY_PROVIDERS);
      navigation.pop();
    } catch (error) {
      displayOneButtonAlert();
      console.log("ERROR", error);
    }
  };

  const initialProviderValue =
    profileType === ProfileTypeEnum.Forwarder
      ? `${order.provider?.name} ${order.provider?.lastName}`
      : `${order.forwarder?.name} ${order.forwarder?.lastName}`;

  const personType =
    profileType === ProfileTypeEnum.Provider ? "Zleceniodawca" : "Dostawca";

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
            pressedItem={order.placeStart}
            disabled
            initialPlaceStartValue={order.placeStart.name}
          />
          <Text style={styles.subTitleStyle}>Cele podróży</Text>
          <NewOrderDestinationsSection
            approvedArray={order.destinations}
            disabled
            initialDestinationsArray={order.destinations}
          />
          <Text style={styles.subTitleStyle}>{personType}</Text>
          <ProviderSection
            disabled
            initialProviderValue={initialProviderValue}
          />
          <Text style={styles.subTitleStyle}>Status zlecenia</Text>
          <OrderStatusSection orderStatusValue={order.orderStatus} />

          <View style={styles.orderParamsSection}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <CategorySection
                categoryValue={order?.category}
                isEditable={false}
              />
              <WeightSection
                value={order?.weightInKg?.toString()}
                isEditable={false}
              />
            </View>
            <DescriptionSection value={order?.description} isEditable={false} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IncotermsSection value={order?.incoterm} isEditable={false} />
              <TruckTypeSection value={order?.truckType} isEditable={false} />
            </View>
          </View>
        </View>
      </ScrollView>

      {displayStatusButton && renderStatusButton()}

      {displayRatingButton && (
        <MainButtonComponent
          loading={isLoading}
          disabled={isLoading}
          buttonStyle={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            marginHorizontal: 0,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          }}
          text={"Oceń dostawce"}
          onPress={() => setIsRatingModalVisible(true)}
        />
      )}

      <RatingSection
        visible={isRatingModalVisible}
        hideModal={() => setIsRatingModalVisible(false)}
        setMark={setMark}
        mark={mark}
        requestUpdateProviderRating={requestUpdateProviderRating}
      />

      {isTspSectionVisible && (
        <TspSection
          visible={isTspSectionVisible}
          hideModal={() => setIsTspSectionVisible(false)}
          places={tspArray}
        />
      )}

      {renderMenu()}

      {showNotificationAlert && (
        <NotificationAlert
          showAlert={showNotificationAlert}
          title={notificationAlertData?.title}
          message={notificationAlertData?.announcement}
          sender={order.provider}
          sentDate={notificationAlertData?.sentDate}
        />
      )}
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
    marginTop: 8,
  },
  subTitleStyle: {
    ...theme.defaultTextStyle,
    fontSize: 18,
    marginTop: 12,
  },
  orderParamsSection: {
    marginTop: 8,
    backgroundColor: theme.colors.greenyWhite,
  },
});
