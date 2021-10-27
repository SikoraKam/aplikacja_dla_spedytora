import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "../../theme";

type OverlayProps = {
  toggleOverlay(): void;
  visible: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({
  toggleOverlay,
  visible,
  children,
}) => {
  return (
    <Modal
      onRequestClose={toggleOverlay}
      visible={visible}
      transparent={true}
      animationType={"slide"}
    >
      <TouchableWithoutFeedback onPress={toggleOverlay}>
        <View
          style={{
            backgroundColor: theme.colors.greenBackgroundLight,
            opacity: 0.96,
            flex: 1,
          }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
