import React, { useState } from "react";
import { Button, Modal, Portal } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../theme";
import { AirbnbRating, Rating } from "react-native-ratings";

type RatingSectionProps = {
  visible: boolean;
  hideModal(): void;
  setMark(value: number): void;
};

export const RatingSection: React.FC<RatingSectionProps> = ({
  visible,
  hideModal,
  setMark,
}) => {
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
            defaultRating={5}
            size={20}
          />
          <Rating
            showRating
            onFinishRating={() => {}}
            style={{ paddingVertical: 10 }}
          />
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginHorizontal: 28,
    marginVertical: 52,
    height: 900,
  },
});
