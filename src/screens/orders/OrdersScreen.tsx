import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import { useProfileStore } from "../../store/useProfileStore";
import { useOrders } from "../../hooks/orders/useOrders";
import { OrdersListItem } from "../../components/home/OrdersListItem";
import { OrderObject } from "../../types/orders/OrderObject";

type OrdersScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "OrdersScreen"
>;

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const profileType = useProfileStore((state) => state.profileType);
  const [ordersArray, setOrdersArray] = useState([]); // copy to reverse array without reflecting array from backend

  const {
    orders: ordersData,
    isLoading: isOrdersDataLoading,
    isError: isOrdersDataError,
  } = useOrders(profileType);

  useEffect(() => {
    setOrdersArray(ordersData);
  }, [ordersData]);

  const renderListItem = ({ item, index }: ListRenderItemInfo<OrderObject>) => (
    <OrdersListItem key={`${item?._id}${index}`} orderItem={item} />
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.ordersList}>
        {!isOrdersDataLoading ? (
          <FlatList data={ordersArray.reverse()} renderItem={renderListItem} />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  ordersList: {
    flex: 1,
  },
});
