import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";
import { UserObject } from "../../types/user/UserObject";
import { theme } from "../../theme";

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
      />
    ));

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setIsModalVisible(true)}
      >
        <MainInputComponent
          text={providerValue}
          setText={setProviderValue}
          editable={false}
          label="Dostawca"
          style={[styles.inputStyle, disabled && styles.disabledInputStyle]}
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
  },
  disabledInputStyle: {
    backgroundColor: theme.colors.disabled,
  },
});
