import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { AirbnbRating } from "react-native-ratings";
import { MainButtonComponent } from "../../components/MainButtonComponent";

type RatingSectionProps = {
  visible: boolean;
  hideModal(): void;
  setMark(value: number): void;
};

const DEFAULT_RATING = 5;

export const RatingSection: React.FC<RatingSectionProps> = ({
  visible,
  hideModal,
  setMark,
}) => {
  const [selectedMark, setSelectedMark] = useState(DEFAULT_RATING);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <AirbnbRating
            count={5}
            reviews={["Terrible", "So-so", "OK", "Good", "Very Good"]}
            defaultRating={DEFAULT_RATING}
            size={40}
            selectedColor={theme.colors.primaryGreen}
            reviewColor={theme.colors.primaryGreen}
            onFinishRating={(value) => setSelectedMark(value)}
          />
          <View style={styles.buttonContainer}>
            <MainButtonComponent
              text={"Oceń"}
              onPress={() => setMark(selectedMark)}
            />
          </View>
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
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
});
