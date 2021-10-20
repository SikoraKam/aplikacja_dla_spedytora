import React from "react";
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
import { updateOrder } from "../../services/PatchService";
import { displayOneButtonAlert } from "../../utils/displayAlert";

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

  const { order } = route.params;
  const displayButton =
    profileType === ProfileTypeEnum.Provider &&
    order.orderStatus !== OrderStatusEnum.COMPLETED;

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

  const handlePress = () => {
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

      {displayButton && (
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
          onPress={handlePress}
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
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
  },
});
