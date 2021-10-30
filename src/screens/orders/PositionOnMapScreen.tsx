import React from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import { StyleSheet, View } from "react-native";
import { ActiveTourMap } from "../../components/orders/ActiveTourMap";

type PositionOnMapScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "PositionOnMapScreen"
>;

export const PositionOnMapScreen: React.FC<PositionOnMapScreenProps> = ({
  navigation,
  route,
}) => {
  const { order } = route.params;

  const initialRegion = {
    latitude: order.placeStart.latitude,
    longitude: order.placeStart.longitude,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  return (
    <View style={styles.screenContainer}>
      <ActiveTourMap
        initialRegion={initialRegion}
        destinations={order.destinations}
        placeStart={order.placeStart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
