import React, { useState } from "react";
import { Overlay } from "../shared/Overlay";
import { Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";

type OrderMenu = {
  isMenuVisible: boolean;
  setIsMenuVisible(val: boolean): void;
  solveTSP(): void;
};

export const OrderMenu: React.FC<OrderMenu> = ({
  solveTSP,
  isMenuVisible,
  setIsMenuVisible,
}) => {
  const renderButton = (text: string, onPress: () => void) => (
    <View style={styles.dividerStyle}>
      <Button
        labelStyle={styles.buttonTextStyle}
        style={styles.buttonStyle}
        onPress={onPress}
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
        {renderButton("Wylicz optymalną trasę podróży", solveTSP)}
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
