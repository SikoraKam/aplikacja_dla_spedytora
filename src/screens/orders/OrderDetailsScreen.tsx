import React from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import { DateInputComponent } from "../../components/shared/DateInputComponent";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StartPlaceSection } from "../../components/orders/StartPlaceSection";
import { NewOrderDestinationsSection } from "../../components/orders/NewOrderDestinationsSection";
import { ProviderSection } from "../../components/orders/ProviderSection";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { theme } from "../../theme";

type OrderDetailsScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "OrderDetailsScreen"
>;

export const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { order } = route.params;

  const renderDateStartInput = () => (
    <DateInputComponent
      dateInputValue={order.dateStart}
      dateEditingDisabled={true}
    />
  );

  const renderDateEndInput = () => (
    <DateInputComponent
      dateInputValue={order.dateEnd}
      dateEditingDisabled={true}
    />
  );

  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        <Text style={styles.subTitleStyle}>Data rozpoczęcia i zakończenia</Text>
        <View style={styles.dateInputsContainer}>
          {renderDateStartInput()}
          {renderDateEndInput()}
        </View>

        <Text style={styles.subTitleStyle}>Miejsce startu</Text>
        <StartPlaceSection
          disabled
          initialPlaceStartValue={order.placeStart.name}
        />
        <Text style={styles.subTitleStyle}>Cele podróży</Text>
        <NewOrderDestinationsSection
          disabled
          initialDestinationsArray={order.destinations}
        />
        <Text style={styles.subTitleStyle}>Dostawca</Text>
        <ProviderSection
          disabled
          initialProviderValue={`${order.provider?.name} ${order.provider?.lastName}`}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginBottom: 80,
  },
  dateInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subTitleStyle: {
    ...theme.defaultTextStyle,
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 12,
    marginTop: 12,
  },
});
