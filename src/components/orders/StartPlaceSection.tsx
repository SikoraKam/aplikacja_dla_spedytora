import React, { useState } from "react";
import { MainInputComponent } from "../MainInputComponent";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ModalComponent } from "../shared/ModalComponent";
import { ModalContentItem } from "../shared/ModalContentItem";
import { PlaceObject } from "../../types/places/PlaceObject";
import { theme } from "../../theme";

type StartPlaceSectionProps = {
  places?: PlaceObject[];
  isLoading?: boolean;
  setSelectedPlaceId?(id: string): void;
  disabled?: boolean;
  initialPlaceStartValue?: string;
};

export const StartPlaceSection: React.FC<StartPlaceSectionProps> = ({
  places,
  isLoading,
  setSelectedPlaceId,
  disabled = false,
  initialPlaceStartValue = "",
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [placeStartValue, setPlaceStartValue] = useState<string | undefined>(
    initialPlaceStartValue
  );
  const [pressedItem, setPressedItem] = useState<PlaceObject | null>(null);

  const handleApproveResults = () => {
    setPlaceStartValue(pressedItem?.name);
    setIsModalVisible(false);
    if (pressedItem && !!setSelectedPlaceId)
      setSelectedPlaceId(pressedItem?._id);
  };

  const renderModalContent = () =>
    places!.map((element: PlaceObject) => (
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
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setIsModalVisible(true)}
      >
        <MainInputComponent
          text={placeStartValue}
          setText={setPlaceStartValue}
          editable={false}
          style={[styles.inputStyle, disabled && styles.disabledInputStyle]}
        />
      </TouchableOpacity>

      {!!places && !!setSelectedPlaceId && (
        <ModalComponent
          title={"Miejsce rozpoczęcia"}
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
});
