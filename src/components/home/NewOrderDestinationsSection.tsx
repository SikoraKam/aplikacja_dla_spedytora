import { ModalComponent } from "../shared/ModalComponent";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TileComponent } from "../shared/TileComponent";
import { theme } from "../../theme";

type NewOrderDestinationsSectionProps = {};

export const NewOrderDestinationsSection: React.FC<NewOrderDestinationsSectionProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderModalContent = () => <Text>HEHEH</Text>;

  const array = ["text", "hehhehe", "jcjsdjcd"];

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
