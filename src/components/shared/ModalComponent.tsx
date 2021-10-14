import React from "react";
import { Button, Portal, Provider, Dialog } from "react-native-paper";
import { ScrollView, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";

type ModalComponentProps = {
  renderContent(): JSX.Element[];
  visible: boolean;
  hideModal(): void;
  title: string;
  approveResults(): void;
};

export const ModalComponent: React.FC<ModalComponentProps> = ({
  renderContent,
  visible,
  hideModal,
  approveResults,
  title,
}) => {
  const handleButtonConfirm = () => {
    approveResults();
    hideModal();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideModal}
        style={styles.containerStyle}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 24,
              maxHeight: 900,
            }}
          >
            {renderContent()}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions style={styles.dialogActionsContainer}>
          <Button style={styles.buttonActionStyle} onPress={hideModal}>
            Cancel
          </Button>
          <Button onPress={handleButtonConfirm}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
  dialogActionsContainer: {
    right: 0,
    bottom: 0,
    padding: 16,
  },
  buttonActionStyle: {
    paddingHorizontal: 16,
  },
});
