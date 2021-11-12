import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { OrdersScreenStackParamList } from "./OrdersScreenStack";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { sendNotification } from "../../services/PostService";
import { format } from "date-fns";
import { displayOneButtonAlert } from "../../utils/displayAlert";

type SendNotificationScreenProps = StackScreenProps<
  OrdersScreenStackParamList,
  "SendNotificationScreen"
>;

const titleOptions = [
  "Wypadek na trasie",
  "Korek na trasie",
  "Przerwa od jazdy",
  "Możliwe opóźnienie",
  "Etap ukończony",
  "Wszystkie cele zaliczone",
  "Powrót do bazy",
  "Inne",
];

export const SendNotificationScreen: React.FC<SendNotificationScreenProps> = ({
  route,
  navigation,
}) => {
  const { order } = route.params;

  const [titleValue, setTitleValue] = useState("");
  const [announcementValue, setAnnouncementValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderDropDownIcon = () => (
    <MaterialCommunityIcons name="chevron-down" size={20} />
  );

  const onPressSend = async () => {
    setIsLoading(true);
    const now = format(new Date(), "dd-MM-yyyy HH:mm");

    if (titleValue === "") {
      displayOneButtonAlert("Tytuł jest wymagany", "Spróbuj ponownie");
      return;
    }

    const payload = {
      title: titleValue,
      announcement: announcementValue ?? "",
      orderObject: order,
      sentDate: now,
    };

    await sendNotification(order.forwarder._id, payload);
    setIsLoading(false);
    await navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.subtitleTextStyle}>Komunikat do:</Text>
        <Text
          style={[styles.subtitleTextStyle, { marginBottom: 8 }]}
        >{`${order.forwarder.name} ${order.forwarder.lastName}`}</Text>
        <Text style={styles.subtitleTextStyle}>Zlecenie z:</Text>
        <Text style={[styles.subtitleTextStyle, { marginBottom: 8 }]}>
          {order.placeStart.name}{" "}
        </Text>
        <Text style={styles.subtitleTextStyle}>
          {format(new Date(order.dateStart), "dd/MM/yyyy")}
          {" - "}
          {format(new Date(order.dateEnd), "dd/MM/yyyy")}
        </Text>
      </View>

      <SelectDropdown
        data={titleOptions}
        onSelect={(selectedItem: string) => {
          setTitleValue(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem: string) => {
          return selectedItem;
        }}
        rowTextForSelection={(item: string) => {
          return item;
        }}
        defaultButtonText="Wybierz tytuł komunikatu"
        buttonStyle={styles.titleDropdownButtonStyle}
        buttonTextStyle={styles.titleButtonTextStyle}
        dropdownIconPosition={"right"}
        renderDropdownIcon={renderDropDownIcon}
        rowStyle={styles.dropdownRowStyle}
      />
      <View style={[styles.textInputContainerStyle, { minHeight: 200 }]}>
        <TextInput
          placeholder="Treść komunikatu..."
          placeholderTextColor={theme.colors.darkBlackGreen}
          multiline
          value={announcementValue}
          style={styles.announcementInputTextStyle}
          onChangeText={setAnnouncementValue}
          editable={true}
          maxLength={2000}
        />
      </View>
      <View style={{ marginBottom: 32, width: "100%" }}>
        <MainButtonComponent
          text="Wyślij"
          onPress={onPressSend}
          // buttonStyle={{ width: "90%" }}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    marginTop: 16,
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
  announcementInputTextStyle: {
    flex: 1,
    textAlignVertical: "top",
    flexWrap: "wrap",
    padding: 0,
    paddingTop: 18,
    paddingBottom: 18,
    marginHorizontal: 12,
    color: theme.colors.darkBlackGreen,
  },
  textInputContainerStyle: {
    borderWidth: 1,
    borderColor: theme.colors.primaryGreen,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.greenyWhite,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  subtitleTextStyle: {
    textAlign: "center",
    color: theme.colors.darkBlackGreen,
    fontSize: 20,
  },
});
