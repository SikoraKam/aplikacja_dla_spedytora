import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import { useProfileStore } from "../../store/useProfileStore";
import { useOrders } from "../../hooks/orders/useOrders";
import { OrdersListItem } from "../../components/orders/OrdersListItem";
import { OrderObject } from "../../types/orders/OrderObject";
import SelectDropdown from "react-native-select-dropdown";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

type OrdersScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "OrdersScreen"
>;

const filterOption = [
  null,
  OrderStatusEnum.REJECTED,
  OrderStatusEnum.WAITING,
  OrderStatusEnum.IN_PROGRESS,
  OrderStatusEnum.ACCEPTED,
  OrderStatusEnum.COMPLETED,
];

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const profileType = useProfileStore((state) => state.profileType);
  const [ordersArray, setOrdersArray] = useState<OrderObject[]>([]); // copy to reverse array without reflecting array from backend
  const [filterQuery, setFilterQuery] = useState<OrderStatusEnum | null>(null);

  const {
    orders: ordersData,
    isLoading: isOrdersDataLoading,
    isError: isOrdersDataError,
    mutate: mutateOrders,
  } = useOrders(profileType);

  useFocusEffect(
    useCallback(() => {
      mutateOrders();
    }, [])
  );

  useEffect(() => {
    if (!ordersData) return;
    const newOrdersArray = [...ordersData];
    newOrdersArray.reverse();

    if (filterQuery) {
      const filtered = newOrdersArray.filter(
        (order) => order.orderStatus === filterQuery
      );
      setOrdersArray(filtered);
      return;
    }

    setOrdersArray(newOrdersArray);
  }, [ordersData, filterQuery]);

  const onPressItem = (item: OrderObject) => {
    navigation.push("OrderDetailsScreen", { order: item });
  };

  const renderListItem = ({ item, index }: ListRenderItemInfo<OrderObject>) => (
    <OrdersListItem
      profileType={profileType}
      key={`${item?._id}${index}`}
      orderItem={item}
      onPress={() => onPressItem(item)}
    />
  );
  const selectText = (orderStatusValue: OrderStatusEnum | null) => {
    switch (orderStatusValue) {
      case OrderStatusEnum.ACCEPTED:
        return "Zaakceptowano";
      case OrderStatusEnum.COMPLETED:
        return "Zakończono";
      case OrderStatusEnum.IN_PROGRESS:
        return "W trakcie";
      case OrderStatusEnum.WAITING:
        return "Oczekiwanie na akceptacje";
      case OrderStatusEnum.REJECTED:
        return "Odrzucono";
      case null:
        return "Brak";
    }
  };

  const renderDropDownIcon = () => (
    <MaterialCommunityIcons name="chevron-down" size={20} />
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={filterOption}
          onSelect={(selectedItem: OrderStatusEnum | null) => {
            setFilterQuery(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem: OrderStatusEnum | null) => {
            return selectText(selectedItem);
          }}
          rowTextForSelection={(item: OrderStatusEnum | null) => {
            return selectText(item);
          }}
          defaultButtonText="Brak"
          buttonStyle={styles.titleDropdownButtonStyle}
          buttonTextStyle={styles.titleButtonTextStyle}
          dropdownIconPosition={"right"}
          renderDropdownIcon={renderDropDownIcon}
          rowStyle={styles.dropdownRowStyle}
          dropdownStyle={{ borderWidth: 0, borderRadius: 8 }}
        />
      </View>

      <View style={styles.ordersList}>
        {!isOrdersDataLoading ? (
          <FlatList
            keyExtractor={(item) => item._id}
            data={ordersArray}
            renderItem={renderListItem}
          />
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
  dropdownContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  titleDropdownButtonStyle: {
    backgroundColor: theme.colors.secondaryGreen,
    borderRadius: 8,
    width: "90%",
  },
  titleButtonTextStyle: {
    textAlign: "left",
    fontSize: 16,
    color: theme.colors.darkBlackGreen,
  },
  dropdownRowStyle: {
    backgroundColor: theme.colors.greenyWhite,
  },
});
