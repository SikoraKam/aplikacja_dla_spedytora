import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { Text, TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";
import { PlaceObject } from "../../types/places/PlaceObject";

type StartPlaceSectionProps = {
  places: PlaceObject[];
  isLoading: boolean;
  setSelectedPlaceId(id: string): void;
};

export const StartPlaceSection: React.FC<StartPlaceSectionProps> = ({
  places,
  isLoading,
  setSelectedPlaceId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [placeStartValue, setPlaceStartValue] = useState<string | undefined>(
    ""
  );
  const [pressedItem, setPressedItem] = useState<PlaceObject | null>(null);

  const handleApproveResults = () => {
    setPlaceStartValue(pressedItem?.name);
    setIsModalVisible(false);
    if (pressedItem) setSelectedPlaceId(pressedItem?._id);
  };

  const renderModalContent = () =>
    places?.map((element: PlaceObject) => (
      <ModalContentItem
        key={element._id}
        title={element.name}
        description={element.name}
        onPress={() => setPressedItem(element)}
        isSelected={pressedItem?._id === element._id}
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
        approveResults={handleApproveResults}
      />
    </>
  );
};
