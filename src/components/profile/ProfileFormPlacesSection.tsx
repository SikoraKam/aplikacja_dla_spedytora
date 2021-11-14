import React, { useEffect, useState } from "react";
import { PlaceObject } from "../../types/places/PlaceObject";
import { ModalContentItem } from "../shared/ModalContentItem";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TileComponent } from "../shared/TileComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { ModalComponent } from "../shared/ModalComponent";

type ProfileFormPlacesSectionProps = {
  places?: PlaceObject[];
  disabled: boolean;
  initialPlacesArray: PlaceObject[];
  approvedArray: PlaceObject[] | undefined;
  setApprovedArray?(value: PlaceObject[]): void;
};

export const ProfileFormPlacesSection: React.FC<ProfileFormPlacesSectionProps> = ({
  disabled = false,
  places,
  setApprovedArray = () => {},
  approvedArray,
  initialPlacesArray = [],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemsArray, setSelectedItemsArray] = useState<PlaceObject[]>(
    []
  );

  useEffect(() => {
    if (setApprovedArray) setApprovedArray(initialPlacesArray);
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
        leftIconName="home"
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
          {approvedArray?.length ? (
            approvedArray?.map((element: PlaceObject) => (
              <TileComponent
                key={element._id}
                name={element.name}
                description={element?.address}
              />
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.emptyDestinationsTextStyle}>
                Brak preferowanych miejsc startowych
              </Text>
              <MaterialCommunityIcons
                style={{ position: "absolute", right: 0 }}
                name="chevron-down"
                color={theme.colors.lightGreenInactive}
                disabled={true}
                size={24}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {!!places && (
        <ModalComponent
          renderContent={renderModalContent}
          visible={isModalVisible}
          hideModal={() => setIsModalVisible(false)}
          approveResults={handleApproveResults}
          title={"Wybierz miesjca startowe"}
          cancelSelection={handleCancelResults}
          shouldRenderAdditionalButton={true}
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
    color: theme.colors.mediumGreenInactive,
    textAlign: "center",
    paddingVertical: 12,
  },
});
