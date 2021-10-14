import { ModalComponent } from "../shared/ModalComponent";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TileComponent } from "../shared/TileComponent";
import { theme } from "../../theme";
import { ModalContentItem } from "../shared/ModalContentItem";
import { PlaceObject } from "../../types/places/PlaceObject";

type NewOrderDestinationsSectionProps = {
  places: PlaceObject[];
};

export const NewOrderDestinationsSection: React.FC<NewOrderDestinationsSectionProps> = ({
  places,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemsArray, setSelectedItemsArray] = useState<string[]>([]);

  const handleSelectItem = (elementId: string) => {
    const prevArray = [...selectedItemsArray];
    const elementIsSelected = prevArray.includes(elementId);

    if (elementIsSelected)
      setSelectedItemsArray(prevArray.filter((item) => item !== elementId));
    else setSelectedItemsArray([...prevArray, elementId]);
  };

  const checkIfElementIsSelected = (elementId: string) => {
    const array = [...selectedItemsArray];
    return array.includes(elementId);
  };

  const renderModalContent = () =>
    places?.map((element) => (
      <ModalContentItem
        key={element._id}
        title={element.name}
        description={element.name}
        onPress={() => handleSelectItem(element._id)}
        isSelected={checkIfElementIsSelected(element._id)}
      />
    ));

  const array = [
    "text",
    "hehhehe",
    "jcjsdjcd",
    "dddds",
    "dssdsd",
    "dsdsdds",
    "psdpdsp",
  ];

  return (
    <>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.tilesContainerStyle}>
          {array.map((element) => (
            <TileComponent name={element} />
          ))}
        </View>
      </TouchableOpacity>

      <ModalComponent
        renderContent={renderModalContent}
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
        approveResults={() => null}
        title={"Wybierz cele"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    justifyContent: "center",
    marginBottom: 16,
    marginHorizontal: 24,
    backgroundColor: theme.colors.greenyWhite,
  },
  tilesContainerStyle: {
    marginVertical: 5,
    marginHorizontal: 12,
  },
});
