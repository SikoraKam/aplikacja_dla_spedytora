import { ModalComponent } from "../shared/ModalComponent";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TileComponent } from "../shared/TileComponent";
import { theme } from "../../theme";
import { ModalContentItem } from "../shared/ModalContentItem";
import { PlaceObject } from "../../types/places/PlaceObject";

type NewOrderDestinationsSectionProps = {
  places?: PlaceObject[];
  setSelectedPlacesId?(ids: string[]): void;
  disabled?: boolean;
  initialDestinationsArray?: PlaceObject[];
};

export const NewOrderDestinationsSection: React.FC<NewOrderDestinationsSectionProps> = ({
  places,
  setSelectedPlacesId,
  disabled = false,
  initialDestinationsArray = [],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemsArray, setSelectedItemsArray] = useState<PlaceObject[]>(
    []
  );

  const [approvedArray, setApprovedArray] = useState<PlaceObject[]>(
    initialDestinationsArray
  );

  const handleSelectItem = (placeElement: PlaceObject) => {
    const prevArray = [...selectedItemsArray];
    const elementIsSelected = prevArray.includes(placeElement);

    if (elementIsSelected)
      setSelectedItemsArray(prevArray.filter((item) => item !== placeElement));
    else setSelectedItemsArray([...prevArray, placeElement]);
  };

  const checkIfElementIsSelected = (placeElement: PlaceObject) => {
    const array = [...selectedItemsArray];
    return array.includes(placeElement);
  };

  const handleApproveResults = () => {
    setApprovedArray(selectedItemsArray);
    setIsModalVisible(false);
    if (selectedItemsArray && !!setSelectedPlacesId) {
      setSelectedPlacesId(selectedItemsArray.map((element) => element._id));
    }
  };

  const handleCancelResults = () => {
    setApprovedArray([]);
    setSelectedItemsArray([]);
    if (!!setSelectedPlacesId) setSelectedPlacesId([]);
  };

  const renderModalContent = () =>
    places!.map((element) => (
      <ModalContentItem
        key={element._id}
        title={element.name}
        description={element.address}
        onPress={() => handleSelectItem(element)}
        isSelected={checkIfElementIsSelected(element)}
      />
    ));

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={styles.sectionContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.tilesContainerStyle}>
          {approvedArray.length ? (
            approvedArray.map((element: PlaceObject) => (
              <TileComponent name={element.name} />
            ))
          ) : (
            <Text style={styles.emptyDestinationsTextStyle}>
              Kliknij aby dodać cele
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {!!places && (
        <ModalComponent
          renderContent={renderModalContent}
          visible={isModalVisible}
          hideModal={() => setIsModalVisible(false)}
          approveResults={handleApproveResults}
          title={"Wybierz cele"}
          cancelSelection={handleCancelResults}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    justifyContent: "center",
    marginBottom: 16,
    marginHorizontal: 24,
    backgroundColor: theme.colors.greenyWhite,
    marginTop: 8,
  },

  tilesContainerStyle: {
    marginVertical: 5,
    marginHorizontal: 12,
  },
  emptyDestinationsTextStyle: {
    textAlign: "center",
    paddingVertical: 12,
  },
});
