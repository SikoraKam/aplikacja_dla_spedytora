import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { OrderObject } from "../../types/orders/OrderObject";
import { useNavigation } from "@react-navigation/native";
import { OrdersListItem } from "../orders/OrdersListItem";

type ActualOrdersProps = {
  lastThreeNotCompletedOrders: OrderObject[];
};

export const ActualOrders: React.FC<ActualOrdersProps> = ({
  lastThreeNotCompletedOrders,
}) => {
  const navigation = useNavigation();

  if (lastThreeNotCompletedOrders.length === 0)
    return (
      <Text style={styles.subtitleStyle}>
        Nie masz aktualnych zleceń. Zrealizuj nowe zlecenie.
      </Text>
    );
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.subtitleStyle}>Aktualne zlecenia</Text>

      <View>
        {lastThreeNotCompletedOrders?.map((element) => (
          <OrdersListItem
            key={element._id}
            orderItem={element}
            onPress={async () => {
              // @ts-ignore
              await navigation.navigate("Deliverers", {
                screen: "OrdersScreen",
                params: { order: element },
              });
              // @ts-ignore
              await navigation.navigate("Deliverers", {
                screen: "OrderDetailsScreen",
                params: { order: element },
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    marginBottom: 4,
  },
  subtitleStyle: {
    ...theme.defaultTextStyle,
    fontSize: 18,
    marginVertical: 4,
    marginHorizontal: 8,
    fontWeight: "bold",
  },
});
