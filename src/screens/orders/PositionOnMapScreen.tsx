import React from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ActiveTourMap } from "../../components/orders/ActiveTourMap";
import { useProviderPosition } from "../../hooks/position/useProviderPosition";
import { theme } from "../../theme";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";

type PositionOnMapScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "PositionOnMapScreen"
>;

export const PositionOnMapScreen: React.FC<PositionOnMapScreenProps> = ({
  navigation,
  route,
}) => {
  const { order } = route.params;
  const {
    position: positionData,
    isLoading,
    isError: positionDataError,
  } = useProviderPosition(order.provider._id);

  const initialRegion = {
    latitude: order.placeStart.latitude,
    longitude: order.placeStart.longitude,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const renderMapForOrderInProgress = () => (
    <ActiveTourMap
      initialRegion={initialRegion}
      destinations={order.destinations}
      placeStart={order.placeStart}
      providerPosition={positionData}
      providerLastName={order.provider.lastName}
    />
  );

  const renderMapForOrderNotInProgress = () => (
    <ActiveTourMap
      initialRegion={initialRegion}
      destinations={order.destinations}
      placeStart={order.placeStart}
    />
  );

  if (isLoading) return <ActivityIndicator color={theme.colors.primaryGreen} />;
  return (
    <View style={styles.screenContainer}>
      {order.orderStatus === OrderStatusEnum.IN_PROGRESS
        ? renderMapForOrderInProgress()
        : renderMapForOrderNotInProgress()}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
