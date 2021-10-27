import React, { useLayoutEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
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

type OrderDetailsScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "OrderDetailsScreen"
>;

export const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const profileType = useProfileStore((state) => state.profileType);
  const { mutate } = useOrders(profileType);

  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const [mark, setMark] = useState<number>(5);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { order } = route.params;
  const displayStatusButton =
    profileType === ProfileTypeEnum.Provider &&
    order.orderStatus !== OrderStatusEnum.COMPLETED;

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

  const renderMenu = () => (
    <OrderMenu
      isMenuVisible={isMenuVisible}
      setIsMenuVisible={setIsMenuVisible}
      solveTSP={() => {}}
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
      case OrderStatusEnum.WAITING:
        return requestUpdateOrder(OrderStatusEnum.ACCEPTED);
      default:
        return requestUpdateOrder(OrderStatusEnum.ACCEPTED);
    }
  };

  const requestUpdateOrder = async (newOrderStatus: OrderStatusEnum) => {
    const newOrderBody = {
      orderStatus: newOrderStatus,
    };

    try {
      await mutate(updateOrder(order._id, newOrderBody));
      navigation.pop();
    } catch (error) {
      displayOneButtonAlert();
      console.log("ERROR", error);
    }
  };

  const requestUpdateProviderRating = async () => {
    const ratingBody = {
      mark,
    };
    try {
      await updateProviderRating(order.provider._id, ratingBody);
      navigation.pop();
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
            disabled
            initialPlaceStartValue={order.placeStart.name}
          />
          <Text style={styles.subTitleStyle}>Cele podróży</Text>
          <NewOrderDestinationsSection
            disabled
            initialDestinationsArray={order.destinations}
          />
          <Text style={styles.subTitleStyle}>Dostawca</Text>
          <ProviderSection
            disabled
            initialProviderValue={`${order.provider?.name} ${order.provider?.lastName}`}
          />
          <Text style={styles.subTitleStyle}>Status zlecenia</Text>
          <OrderStatusSection orderStatusValue={order.orderStatus} />
        </View>
      </ScrollView>

      {displayStatusButton && (
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
      )}

      {displayRatingButton && (
        <MainButtonComponent
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
    marginTop: 8,
  },
  subTitleStyle: {
    ...theme.defaultTextStyle,
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
  },
});
