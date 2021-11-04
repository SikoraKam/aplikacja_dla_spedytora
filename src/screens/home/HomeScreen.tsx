import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { theme } from "../../theme";
import { OrdersListItem } from "../../components/orders/OrdersListItem";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { logoutRequest } from "../../services/AuthService";
import { useOrders } from "../../hooks/orders/useOrders";
import { useProfileStore } from "../../store/useProfileStore";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { OrderObject } from "../../types/orders/OrderObject";
import { defineUpdateLocationTask } from "../../services/TasksService";
import { registerLocationListener } from "../../services/LocationService";
import { requestLocationPermissionIfNotSet } from "../../services/PermissionService";
import { useTempStore } from "../../store/useTempStore";
import shallow from "zustand/shallow";

type HomeScreenProps = StackScreenProps<HomeScreenStackParamList, "HomeScreen">;

defineUpdateLocationTask();

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const profileType = useProfileStore((state) => state.profileType);
  const [
    locationTaskFirstUpdateRequested,
    locationTaskOnStartApplicationDefined,
    setLocationTaskOnStartApplicationDefined,
  ] = useTempStore(
    (state) => [
      state.locationTaskFirstUpdateRequested,
      state.locationTaskOnStartApplicationDefined,
      state.setLocationTaskOnStartApplicationDefined,
    ],
    shallow
  );
  const [lastThreeElements, setLastThreeElements] = useState<OrderObject[]>([]);

  const {
    orders: ordersData,
    isLoading: isOrdersDataLoading,
    isError: isOrdersDataError,
  } = useOrders(profileType);

  useEffect(() => {
    if (!ordersData) return;
    const newOrdersArray = [...ordersData?.slice(-3)];
    newOrdersArray.reverse();
    setLastThreeElements(newOrdersArray);

    if (profileType === ProfileTypeEnum.Forwarder) return;
    requestLocationPermissionIfNotSet();
    startPositionUpdater().catch((error) => console.log(error));
  }, [ordersData]);

  const startPositionUpdater = async () => {
    const locationListenerIsRegistered =
      locationTaskFirstUpdateRequested || locationTaskOnStartApplicationDefined;
    if (locationListenerIsRegistered) return;

    const hasOrderInProgress = ordersData?.find(
      (order) => order.orderStatus === OrderStatusEnum.IN_PROGRESS
    );
    if (!hasOrderInProgress) return;

    try {
      await registerLocationListener();
      setLocationTaskOnStartApplicationDefined();
    } catch (error) {
      console.log(error);
      displayOneButtonAlert("Nie mogliśmy zaktualizować twojej lokalizacji");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.historyButtonStyle}>
        <Text style={styles.historyButtonHeadlineTextStyle}>{profileType}</Text>
        <Text style={styles.historyButtonSeeMoreTextStyle}>Zobacz więcej</Text>
      </TouchableOpacity>

      <View>
        {lastThreeElements?.map((element) => (
          <OrdersListItem key={element._id} orderItem={element} />
        ))}
      </View>

      <View style={styles.addButtonContainer}>
        <MainButtonComponent
          buttonStyle={styles.addButtonStyle}
          text="Zrealizuj nowe zlecenie"
          onPress={() => navigation.push("NewOrderScreen")}
        />
        <MainButtonComponent
          buttonStyle={styles.addButtonStyle}
          text="wyloguj"
          onPress={() => logoutRequest()}
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
