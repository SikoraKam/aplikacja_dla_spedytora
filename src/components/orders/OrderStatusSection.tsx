import React from "react";
import { OrderStatusEnum } from "../../types/orders/OrderStatusEnum";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

type OrderStatusSectionProps = {
  orderStatusValue: OrderStatusEnum;
};

export const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
  orderStatusValue,
}) => {
  const selectText = () => {
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
    }
  };

  return (
    <MainInputComponent
      text={selectText()}
      setText={() => null}
      editable={false}
      style={styles.inputStyle}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginHorizontal: 24,
    backgroundColor: theme.colors.disabled,
    textAlign: "center",
  },
});
