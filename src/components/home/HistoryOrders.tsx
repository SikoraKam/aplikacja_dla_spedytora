import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { OrderObject } from "../../types/orders/OrderObject";
import { useNavigation } from "@react-navigation/native";
import { OrdersListItem } from "../orders/OrdersListItem";

type HistoryOrdersProps = {
  slicedCompletedOrders: OrderObject[];
};

export const HistoryOrders: React.FC<HistoryOrdersProps> = ({
  slicedCompletedOrders,
}) => {
  const navigation = useNavigation();

  if (slicedCompletedOrders.length === 0) {
    return <View />;
  }
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.subtitleStyle}>Zakończone zlecenia</Text>

      <View>
        {slicedCompletedOrders?.map((element) => (
          <OrdersListItem
            key={element._id}
            orderItem={element}
            onPress={() =>
              // @ts-ignore
              navigation.navigate("OrderDetailsScreen", { order: element })
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    marginVertical: 4,
  },
  subtitleStyle: {
    ...theme.defaultTextStyle,
    fontSize: 18,
    marginVertical: 4,
    marginHorizontal: 8,
  },
});
