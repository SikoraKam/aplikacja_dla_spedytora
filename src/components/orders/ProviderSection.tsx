import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";
import { UserObject } from "../../types/user/UserObject";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

type ProviderSectionProps = {
  providers?: UserObject[];
  setSelectedProviderId?(id: string): void;
  disabled?: boolean;
  initialProviderValue?: string;
};

export const ProviderSection: React.FC<ProviderSectionProps> = ({
  providers,
  setSelectedProviderId,
  disabled = false,
  initialProviderValue = "",
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [providerValue, setProviderValue] = useState<string | undefined>(
    initialProviderValue
  );
  const [pressedItem, setPressedItem] = useState<UserObject | null>(null);

  const handleApproveResults = () => {
    setProviderValue(`${pressedItem?.name} ${pressedItem?.lastName}`);
    setIsModalVisible(false);
    if (pressedItem && !!setSelectedProviderId)
      setSelectedProviderId(pressedItem?._id);
  };

  const renderModalContent = () =>
    providers!.map((element: UserObject) => (
      <ModalContentItem
        key={element._id}
        title={element.name}
        description={element.lastName}
        onPress={() => setPressedItem(element)}
        isSelected={pressedItem?._id === element._id}
        leftComponent={renderModalContentLeftItemComponent(element)}
      />
    ));

  const renderModalContentLeftItemComponent = (provider: UserObject) => {
    const isSelected = pressedItem?._id === provider._id;
    return (
      <View style={styles.modalItemLeftComponentContainerStyle}>
        <MaterialCommunityIcons
          name="star-outline"
          color={
            isSelected ? theme.colors.darkGreen : theme.colors.primaryGreen
          }
          size={20}
        />
        <Text style={styles.modalItemLeftComponentTextStyle}>
          {provider.rating?.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setIsModalVisible(true)}
      >
        <MainInputComponent
          placeholder={"Kliknij aby rozwinąć listę"}
          text={providerValue}
          setText={setProviderValue}
          editable={false}
          style={[styles.inputStyle, disabled && styles.disabledInputStyle]}
          right={
            <TextInput.Icon
              name="chevron-down"
              color={theme.colors.darkGreen}
              disabled={true}
            />
          }
        />
      </TouchableOpacity>

      {!!providers && (
        <ModalComponent
          title={"Wybierz dostawce"}
          renderContent={renderModalContent}
          visible={isModalVisible}
          hideModal={() => setIsModalVisible(false)}
          approveResults={handleApproveResults}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginHorizontal: 24,
    textAlign: "center",
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
  modalItemLeftComponentContainerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 80,
  },
  modalItemLeftComponentTextStyle: {
    textAlign: "center",
    marginRight: 20,
  },
});
