import React from "react";
import { Button, Portal, Dialog } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { theme } from "../../theme";

type ModalComponentProps = {
  renderContent(): JSX.Element[];
  visible: boolean;
  hideModal(): void;
  title: string;
  approveResults(): void;
  cancelSelection?(): void;
  shouldRenderAdditionalButton?: boolean;
  additionalButtonText?: string;
  additionalButtonOnPress?(): void;
};

export const ModalComponent: React.FC<ModalComponentProps> = ({
  renderContent,
  visible,
  hideModal,
  approveResults,
  title,
  cancelSelection = () => {},
  shouldRenderAdditionalButton = false,
  additionalButtonOnPress = () => {},
  additionalButtonText = "",
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
          {shouldRenderAdditionalButton && (
            <Button
              labelStyle={styles.buttonActionLabelStyle}
              onPress={additionalButtonOnPress}
            >
              {additionalButtonText}
            </Button>
          )}
          <Button
            labelStyle={styles.buttonActionLabelStyle}
            style={styles.buttonActionStyle}
            onPress={handleCancel}
          >
            Cancel
          </Button>
          <Button
            labelStyle={styles.buttonActionLabelStyle}
            style={styles.buttonActionStyle}
            onPress={handleButtonConfirm}
          >
            Ok
          </Button>
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
  buttonActionLabelStyle: {
    color: theme.colors.darkGreen,
  },
});
