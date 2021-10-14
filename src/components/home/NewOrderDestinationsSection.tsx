import { ModalComponent } from "../shared/ModalComponent";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TileComponent } from "../shared/TileComponent";
import { theme } from "../../theme";
import { ModalContentItem } from "../shared/ModalContentItem";

type NewOrderDestinationsSectionProps = {};

export const NewOrderDestinationsSection: React.FC<NewOrderDestinationsSectionProps> = () => {
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
    array.map((element) => (
      <ModalContentItem
        key={element}
        title={element}
        description={element}
        onPress={() => handleSelectItem(element)}
        isSelected={checkIfElementIsSelected(element)}
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
