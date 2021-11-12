import React from "react";
import { Overlay } from "../shared/Overlay";
import { Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";

type OrderMenu = {
  isMenuVisible: boolean;
  setIsMenuVisible(val: boolean): void;
  onPressTspItem(): void;
  onPressMapItem?(): void;
  isMapItemDisabled?: boolean;
  onSendNotificationPress?(): void;
  isSendNotificationVisible?: boolean;
};

export const OrderMenu: React.FC<OrderMenu> = ({
  onPressTspItem,
  isMenuVisible,
  setIsMenuVisible,
  onPressMapItem,
  isMapItemDisabled = false,
  onSendNotificationPress = () => {},
  isSendNotificationVisible = false,
}) => {
  const renderButton = (
    text: string,
    onPress: () => void,
    isDisabled = false
  ) => (
    <View style={styles.dividerStyle}>
      <Button
        labelStyle={styles.buttonTextStyle}
        style={styles.buttonStyle}
        disabled={isDisabled}
        onPress={() => {
          onPress();
          setIsMenuVisible(false);
        }}
        color={theme.colors.darkBlackGreen}
      >
        {text}
      </Button>
    </View>
  );

  return (
    <Overlay
      toggleOverlay={() => setIsMenuVisible(!isMenuVisible)}
      visible={isMenuVisible}
    >
      <View style={styles.menuStyle}>
        {renderButton("Wylicz optymalną trasę podróży", onPressTspItem)}
        {!!onPressMapItem &&
          renderButton("Podgląd mapy", onPressMapItem, isMapItemDisabled)}
        {isSendNotificationVisible &&
          renderButton("Wyślij komunikat", onSendNotificationPress)}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  menuStyle: {
    zIndex: 999,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 54,
  },
  dividerStyle: {
    borderBottomWidth: 1,
    borderColor: theme.colors.darkBlackGreen,
  },
  buttonStyle: {
    paddingBottom: 14,
    paddingLeft: 14,
    paddingTop: 12,
  },
  buttonTextStyle: {
    fontSize: 14,
    letterSpacing: 0.4,
    color: theme.colors.darkBlackGreen,
  },
});
