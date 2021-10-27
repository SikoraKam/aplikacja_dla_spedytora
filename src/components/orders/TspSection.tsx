import React, { useEffect, useState } from "react";
import { Modal, Portal } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { theme } from "../../theme";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MainButtonComponent } from "../MainButtonComponent";
import { PlaceObject } from "../../types/places/PlaceObject";
import { TileComponent } from "../shared/TileComponent";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { solveTsp } from "../../services/PostService";

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
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator color={theme.colors.darkBlackGreen} size={"large"} />
    </View>
  );

  const renderModalContent = () => {
    if (!tspResult.length) return renderLoadingIndicator();
    else
      return (
        <View style={styles.tilesContainerStyle}>
          {tspResult?.map((element: PlaceObject) => (
            <TileComponent name={element.name} />
          ))}
        </View>
      );
  };

  //todo ScrollView
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          {renderModalContent()}
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
    marginVertical: 5,
    marginHorizontal: 12,
  },
  emptyDestinationsTextStyle: {
    textAlign: "center",
    paddingVertical: 12,
  },
});
