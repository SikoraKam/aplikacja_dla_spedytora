import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { theme } from "../../theme";
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
import { ActualOrders } from "../../components/home/ActualOrders";
import { HistoryOrders } from "../../components/home/HistoryOrders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSWRConfig } from "swr";

type HomeScreenProps = StackScreenProps<HomeScreenStackParamList, "HomeScreen">;

defineUpdateLocationTask();

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const profileType = useProfileStore((state) => state.profileType);
  console.log("PROFILE TYPE: ", profileType);
  const userNameAndLastName = useProfileStore((state) => state.nameAndLastName);
  console.log("name -> : ", userNameAndLastName);
  const { cache } = useSWRConfig();

  const [isLoading, setIsLoading] = useState(true);

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
  const [lastThreeActualOrders, setLastThreeActualOrders] = useState<
    OrderObject[]
  >([]);
  const [completedOrdersToDisplay, setCompletedOrdersToDisplay] = useState<
    OrderObject[]
  >([]);

  const {
    orders: ordersData,
    isLoading: isOrdersDataLoading,
    isError: isOrdersDataError,
  } = useOrders(profileType);

  useLayoutEffect(() => {
    if (!navigation || !profileType) return;
    navigation.setOptions({
      headerTitle: profileType,
    });
  }, [navigation, profileType]);

  useEffect(() => {
    if (!ordersData) return;
    divideOrdersIntoArrays(ordersData);
    setIsLoading(false);

    if (profileType === ProfileTypeEnum.Forwarder) return;
    requestLocationPermissionIfNotSet();
    startPositionUpdater().catch((error) => console.log(error));
  }, [ordersData]);

  const divideOrdersIntoArrays = (ordersArray: OrderObject[]) => {
    const newOrdersArray = [...ordersArray];
    newOrdersArray.reverse();
    const lastThreeActualOrders = newOrdersArray
      .filter((order) => order.orderStatus !== OrderStatusEnum.COMPLETED)
      .slice(0, 3);

    const completedArray = newOrdersArray
      .filter((order) => order.orderStatus === OrderStatusEnum.COMPLETED)
      .slice(0, 4 - lastThreeActualOrders.length);

    setLastThreeActualOrders(lastThreeActualOrders);
    setCompletedOrdersToDisplay(completedArray);
  };

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

  if (isLoading || isOrdersDataLoading)
    return <ActivityIndicator color={theme.colors.primaryGreen} />;
  return (
    <ScrollView style={{ flex: 1 }}>
      <ActualOrders lastThreeNotCompletedOrders={lastThreeActualOrders} />
      <HistoryOrders slicedCompletedOrders={completedOrdersToDisplay} />

      <TouchableOpacity
        style={styles.loadMoreIconContainer}
        onPress={() => navigation.navigate("OrdersScreen")}
      >
        <MaterialCommunityIcons
          name="arrow-down-circle-outline"
          size={30}
          style={{ color: theme.colors.lightGreen }}
        />
      </TouchableOpacity>

      <View style={styles.addButtonContainer}>
        <MainButtonComponent
          buttonStyle={styles.addButtonStyle}
          text="Zrealizuj nowe zlecenie"
          onPress={() => navigation.push("NewOrderScreen")}
        />
        <MainButtonComponent
          buttonStyle={styles.addButtonStyle}
          text="wyloguj"
          onPress={() => {
            logoutRequest();
            // @ts-ignore
            cache.clear();
          }}
        />
      </View>
    </ScrollView>
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
    marginBottom: 12,
  },
  addButtonStyle: {},
  loadMoreIconContainer: {
    alignSelf: "center",
  },
});
