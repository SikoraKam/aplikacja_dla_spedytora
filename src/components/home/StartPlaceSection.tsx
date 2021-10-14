import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";

type StartPlaceSectionProps = {};

export const StartPlaceSection: React.FC<StartPlaceSectionProps> = ({}) => {
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
          label="Miejsce startu"
          style={{ marginHorizontal: 24 }}
        />
      </TouchableOpacity>

      <ModalComponent
        title={"Miejsce rozpoczęcia"}
        renderContent={renderModalContent}
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
        approveResults={() => null}
      />
    </>
  );
};
