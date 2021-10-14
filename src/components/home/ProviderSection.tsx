import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";

type ProviderSectionProps = {};

export const ProviderSection: React.FC<ProviderSectionProps> = ({}) => {
  const array = [
    "jjdjdjd",
    "dsdsdds",
    "dsdsdsdsd",
    "dsdsddsdds",
    "dsdsdssddds",
    "dsdssdds",
    "dsdsddsas",
    "dsdsdcdvfds",
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [placeStartValue, setPlaceStartValue] = useState("");
  const [pressedItemId, setPressedItemId] = useState<string | null>(null);

  const renderModalContent = () =>
    array.map((element) => (
      <ModalContentItem
        key={element}
        title={element}
        description={element}
        onPress={() => setPressedItemId(element)}
        isSelected={pressedItemId === element}
      />
    ));

  return (
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <MainInputComponent
          text={placeStartValue}
          setText={setPlaceStartValue}
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
        approveResults={() => null}
      />
    </>
  );
};
