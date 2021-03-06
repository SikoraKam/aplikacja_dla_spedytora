import React, { useEffect, useState } from "react";
import { Modal, Portal } from "react-native-paper";
import { theme } from "../../theme";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PlaceObject } from "../../types/places/PlaceObject";
import { TileComponent } from "../shared/TileComponent";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { solveTsp } from "../../services/PostService";
import { Fontisto } from "@expo/vector-icons";

type TspSectionProps = {
  visible: boolean;
  hideModal(): void;
  places: PlaceObject[];
};

export const TspSection: React.FC<TspSectionProps> = ({
  visible,
  hideModal,
  places,
}) => {
  const [tspResult, setTspResult] = useState<PlaceObject[]>([]);

  useEffect(() => {
    try {
      solveTsp(places).then((result) => setTspResult(result));
    } catch (error) {
      console.log(error);
      displayOneButtonAlert();
    }
  }, []);

  const renderLoadingIndicator = () => (
    <View>
      <ActivityIndicator color={theme.colors.darkBlackGreen} size={"large"} />
    </View>
  );

  const renderModalContent = () => {
    if (!tspResult.length) return renderLoadingIndicator();

    return (
      <View style={styles.tilesContainerStyle}>
        <Text style={styles.modalTextTitleStyle}>
          Przewidywana optymalna kolejność dojazdu
        </Text>
        {tspResult?.map((element: PlaceObject, index: number) => (
          <View style={{ alignItems: "center" }}>
            <TileComponent name={element.name} description={element?.address} />
            {index !== tspResult.length - 1 && (
              <Fontisto name="arrow-down-l" size={20} />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <ScrollView
            style={styles.scrollContainerStyle}
            contentContainerStyle={{
              justifyContent: "center",
            }}
          >
            {renderModalContent()}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 0.7,
    backgroundColor: theme.colors.white,
    marginHorizontal: 28,
    marginVertical: 52,
  },
  tilesContainerStyle: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  emptyDestinationsTextStyle: {
    textAlign: "center",
    paddingVertical: 12,
  },
  scrollContainerStyle: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  modalTextTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.colors.darkBlackGreen,
    marginBottom: 8,
  },
});
