import { ModalComponent } from "../shared/ModalComponent";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MainInputComponent } from "../MainInputComponent";

type NewOrderDestinationsSectionProps = {};

export const NewOrderDestinationsSection: React.FC<NewOrderDestinationsSectionProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderModalContent = () => <Text>HEHEH</Text>;

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <MainInputComponent
            text={""}
            setText={() => {}}
            editable={false}
            label="Cele"
            multiline
            style={{ height: 80 }}
          />
        </TouchableOpacity>
      </View>
      <ModalComponent
        renderContent={renderModalContent}
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
      />
    </>
  );
};
