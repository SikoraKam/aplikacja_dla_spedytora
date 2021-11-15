import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OrderObject } from "../../types/orders/OrderObject";
import { format } from "date-fns";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";

type OrdersListItemProps = {
  orderItem: OrderObject;
  onPress?(): void;
  profileType: ProfileTypeEnum | null;
};

export const OrdersListItem: React.FC<OrdersListItemProps> = ({
  orderItem,
  onPress,
  profileType,
}) => {
  const addComa = (index: number) => {
    if (index === orderItem?.destinations.length - 1) return "";
    else return ", ";
  };

  const getContainerBackgroundColorStyle = () => {
    if (orderItem?.orderStatus === OrderStatusEnum.REJECTED) {
      return { backgroundColor: theme.colors.lightError };
    }
    if (orderItem?.orderStatus === OrderStatusEnum.COMPLETED) {
      return { backgroundColor: theme.colors.mediumGreen };
    }
    return { backgroundColor: theme.colors.greenyWhite };
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
      case OrderStatusEnum.REJECTED:
        return "Odrzucono";
      default:
        return "Status nieznany";
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, getContainerBackgroundColorStyle()]}>
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
              {profileType === ProfileTypeEnum.Forwarder
                ? orderItem?.provider?.name
                : orderItem?.forwarder.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.textStyle, styles.thirdColumnText]}
            >
              {profileType === ProfileTypeEnum.Forwarder
                ? orderItem?.provider?.lastName
                : orderItem?.forwarder.lastName}
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
    // backgroundColor: theme.colors.greenyWhite,
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
