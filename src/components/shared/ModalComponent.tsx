import React from "react";
import { Button, Portal, Provider, Dialog } from "react-native-paper";
import { ScrollView, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";

type ModalComponentProps = {
  renderContent(): JSX.Element;
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
    <Provider>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideModal}
          style={styles.containerStyle}
        >
          {/*<Dialog.Title>{title}</Dialog.Title>*/}
          {/*<Dialog.Content>*/}
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Text>This is a scrollable area</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          {/*</Dialog.Content>*/}
          {/*<Dialog.Actions>*/}
          {/*  <Button onPress={hideModal}>Cancel</Button>*/}
          {/*  <Button onPress={handleButtonConfirm}>Ok</Button>*/}
          {/*</Dialog.Actions>*/}
        </Dialog>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginHorizontal: 28,
    marginVertical: 52,
  },
});
