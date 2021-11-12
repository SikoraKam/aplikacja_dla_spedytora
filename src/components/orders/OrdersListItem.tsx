import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OrderObject } from "../../types/orders/OrderObject";
import { format } from "date-fns";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";

type OrdersListItemProps = {
  orderItem: OrderObject;
  onPress?(): void;
};

export const OrdersListItem: React.FC<OrdersListItemProps> = ({
  orderItem,
  onPress,
}) => {
  const addComa = (index: number) => {
    if (index === orderItem?.destinations.length - 1) return "";
    else return ", ";
  };

  const translateOrderStatus = (orderStatus: OrderStatusEnum) => {
    switch (orderStatus) {
      case OrderStatusEnum.ACCEPTED:
        return "Zaakceptowano";
      case OrderStatusEnum.IN_PROGRESS:
        return "W trakcie";
      case OrderStatusEnum.WAITING:
        return "Oczekujący";
      case OrderStatusEnum.COMPLETED:
        return "Zakończono";
      default:
        return "Status nieznany";
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.firstColumnText]}
          >
            {orderItem?.placeStart.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.secondColumnText]}
          >
            {orderItem?.destinations.map(
              (element, index) => `${element.name}${addComa(index)}`
            )}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.thirdColumnText]}
          >
            {translateOrderStatus(orderItem?.orderStatus)}
          </Text>
        </View>
        <View style={styles.iconsRowContainer}>
          <MaterialCommunityIcons
            style={[styles.firstColumnText, styles.textStyle]}
            name={"package-up"}
            size={20}
          />
          <MaterialCommunityIcons
            style={[styles.secondColumnText, styles.textStyle]}
            name={"package-down"}
            size={20}
          />
          <View style={[styles.textStyle, styles.thirdColumnText]} />
        </View>
        <View style={styles.rowContainer}>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.firstColumnText]}
          >
            {format(new Date(orderItem?.dateStart), "dd/MM/yyyy")}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textStyle, styles.secondColumnText]}
          >
            {format(new Date(orderItem?.dateEnd), "dd/MM/yyyy")}
          </Text>
          <View style={{ flexDirection: "column", marginBottom: 4 }}>
            <Text
              numberOfLines={1}
              style={[styles.textStyle, styles.thirdColumnText]}
            >
              {orderItem?.provider?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.textStyle, styles.thirdColumnText]}
            >
              {orderItem?.provider?.lastName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 105,
    backgroundColor: theme.colors.greenyWhite,
    marginVertical: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  textStyle: {
    textAlign: "center",
    width: 110,
    color: theme.colors.greenyBlack,
  },
  firstColumnText: {
    left: 4,
  },
  secondColumnText: {},
  thirdColumnText: {
    right: 4,
  },
});
