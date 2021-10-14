import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { Text, TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";
import { PlaceObject } from "../../types/places/PlaceObject";

type StartPlaceSectionProps = {
  places: PlaceObject[];
  isLoading: boolean;
};

export const StartPlaceSection: React.FC<StartPlaceSectionProps> = ({
  places,
  isLoading,
}) => {
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
    places?.map((element: PlaceObject) => (
      <ModalContentItem
        key={element._id}
        title={element.name}
        description={element.name}
        onPress={() => setPressedItemId(element._id)}
        isSelected={pressedItemId === element._id}
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
