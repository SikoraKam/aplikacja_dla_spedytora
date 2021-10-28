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
  cancelSelection?(): void;
};

export const ModalComponent: React.FC<ModalComponentProps> = ({
  renderContent,
  visible,
  hideModal,
  approveResults,
  title,
  cancelSelection = () => {},
}) => {
  const handleButtonConfirm = () => {
    approveResults();
  };

  const handleCancel = () => {
    cancelSelection();
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
              maxHeight: 9000,
            }}
          >
            {renderContent()}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions style={styles.dialogActionsContainer}>
          <Button style={styles.buttonActionStyle} onPress={handleCancel}>
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
    height: 9000,
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
