import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";
import { UserObject } from "../../types/user/UserObject";

type ProviderSectionProps = {
  providers: UserObject[];
  setSelectedProviderId(id: string): void;
};

export const ProviderSection: React.FC<ProviderSectionProps> = ({
  providers,
  setSelectedProviderId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [providerValue, setProviderValue] = useState<string | undefined>("");
  const [pressedItem, setPressedItem] = useState<UserObject | null>(null);

  const handleApproveResults = () => {
    setProviderValue(`${pressedItem?.name} ${pressedItem?.lastName}`);
    setIsModalVisible(false);
    if (pressedItem) setSelectedProviderId(pressedItem?._id);
  };

  const renderModalContent = () =>
    providers?.map((element: UserObject) => (
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
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <MainInputComponent
          text={providerValue}
          setText={setProviderValue}
          editable={false}
          label="Dostawca"
          style={{ marginHorizontal: 24 }}
        />
      </TouchableOpacity>

      <ModalComponent
        title={"Wybierz dostawce"}
        renderContent={renderModalContent}
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
        approveResults={handleApproveResults}
      />
    </>
  );
};
