import { ModalComponent } from "../shared/ModalComponent";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TileComponent } from "../shared/TileComponent";
import { theme } from "../../theme";
import { ModalContentItem } from "../shared/ModalContentItem";
import { PlaceObject } from "../../types/places/PlaceObject";
import { MainInputComponent } from "../MainInputComponent";

type NewOrderDestinationsSectionProps = {
  places?: PlaceObject[];
  disabled?: boolean;
  initialDestinationsArray?: PlaceObject[];
  approvedArray: PlaceObject[];
  setApprovedArray?(value: PlaceObject[]): void;
};

export const NewOrderDestinationsSection: React.FC<NewOrderDestinationsSectionProps> = ({
  places,
  disabled = false,
  initialDestinationsArray = [],
  approvedArray,
  setApprovedArray = () => {},
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdditionalModalVisible, setIsAdditionalModalVisible] = useState(
    false
  );
  const [selectedItemsArray, setSelectedItemsArray] = useState<PlaceObject[]>(
    []
  );

  useEffect(() => {
    if (setApprovedArray) setApprovedArray(initialDestinationsArray);
  }, []);

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
    if (selectedItemsArray && !!setApprovedArray) {
      setApprovedArray(selectedItemsArray);
    }
  };

  const handleCancelResults = () => {
    setApprovedArray([]);
    setSelectedItemsArray([]);
    if (!!setApprovedArray) setApprovedArray([]);
  };

  const renderModalContent = () =>
    places!.map((element) => (
      <ModalContentItem
        key={element._id}
        title={element.name}
        description={element.address}
        onPress={() => handleSelectItem(element)}
        isSelected={checkIfElementIsSelected(element)}
        leftIconName="home-map-marker"
      />
    ));

  const additionalModalButtonOnPress = () => {
    setIsModalVisible(false);
  };

  const renderAdditionalModalContent = () => <>{/*<MainInputComponent />*/}</>;

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
              <TileComponent
                key={element._id}
                name={element.name}
                description={element?.address}
              />
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
          additionalButtonText={"Dodaj inne"}
          additionalButtonOnPress={additionalModalButtonOnPress}
          shouldRenderAdditionalButton={true}
        />
      )}

      {isAdditionalModalVisible && (
        <ModalComponent
          renderContent={renderAdditionalModalContent}
          visible={isAdditionalModalVisible}
          hideModal={() => setIsAdditionalModalVisible(false)}
          approveResults={handleApproveResults}
          title={"Dodaj miejsce"}
          cancelSelection={() => setIsAdditionalModalVisible(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    justifyContent: "center",
    marginBottom: 8,
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
