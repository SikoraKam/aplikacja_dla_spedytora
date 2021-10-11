import React from "react";
import { Button, Portal, Provider, Modal } from "react-native-paper";
import { ScrollView, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";

type ModalComponentProps = {
  renderContent(): JSX.Element;
  visible: boolean;
  hideModal(): void;
};

export const ModalComponent: React.FC<ModalComponentProps> = ({
  renderContent,
  visible,
  hideModal,
}) => {
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <ScrollView>{renderContent()}</ScrollView>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.colors.white,
    padding: 40,
    marginHorizontal: 28,
    marginVertical: 52,
  },
});
