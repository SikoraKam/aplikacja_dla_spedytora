import React from "react";
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import { TextStyle } from "react-native";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primaryGreen: string;
      white: string;
      black: string;
      darkGreen: string;
      blackGreen: string;
      lightGreen: string;
      greenBackgroundLight: string;
      secondaryGreen: string;
      error: string;
      darkBlackGreen: string;
      background: string;
      greenyWhite: string;
      disabled: string;
      disabledGreen: string;
      mediumGreenInactive: string;
      inputTextColor: string;
      greenyBlack: string;
      lightGreenInactive: string;
      mediumGreen: string;
      primaryDarkGreen: string;
    }

    interface Theme {
      tallHeader: any;
      primaryHeader: any;
      headerButtonLabel: {
        fontSize: number;
        inverseColor: string;
      };
      defaultTextStyle: TextStyle;
    }
  }
}

const fontConfig = {
  default: {
    thin: {
      fontFamily: "Inter_100Thin",
      fontWeight: "100" as "100",
    },
    light: {
      fontFamily: "Inter_300Light",
      fontWeight: "300" as "300",
    },
    regular: {
      fontFamily: "Inter_400Regular",
      fontWeight: "400" as "400",
    },
    medium: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500" as "500",
    },
  },
};

const colors = {
  primaryGreen: "#B2F272",
  darkGreen: "#739F13",
  mediumGreenInactive: "#a3be6d",
  lightGreenInactive: "#e2eed1",
  blackGreen: "#4B6A4E",
  darkBlackGreen: "#384f3b",
  lightGreen: "#BAE75B",
  greenBackgroundLight: "#D6F6B6",
  greenyWhite: "#fbffeb",
  secondaryGreen: "#C4F592",
  white: "#FFFFFF",
  black: "#000000",
  error: "#ea4747",
  background: "#ffffff",
  disabled: "#f5f5f5",
  disabledGreen: "#eef6d8",
  inputTextColor: "#4f6b0d",
  greenyBlack: "#223024",
  mediumGreen: "#b0ef66", //to change
  primaryDarkGreen: "#92bf5b",
};

const sizes = {
  iconHeaderSize: 20,
};

export const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...colors,
  },
  sizes: {
    ...sizes,
  },
  mainHeader: {
    headerTitleAlign: "center",
    headerStyle: {
      elevation: 0,
      height: 80,
      backgroundColor: colors.background,
      shadowColor: "transparent",
    },
    headerTitleStyle: {
      fontSize: 24,
      textAlign: "center",
      color: colors.darkBlackGreen,
      fontFamily: "sans-serif-medium",
      letterSpacing: 0.85,
    },
  },

  authHeader: {
    headerStyle: {
      elevation: 0,
      height: 80,
      backgroundColor: colors.background,
      shadowColor: "transparent",
      fontFamily: "sans-serif-medium",
      letterSpacing: 0.85,
    },
  },

  highHeader: {
    headerTitleAlign: "center",
    headerStyle: {
      elevation: 10,
      height: 250,
      backgroundColor: colors.primaryGreen,
      shadowColor: "transparent",
      borderBottomStartRadius: 32,
      borderBottomEndRadius: 32,
    },
    headerTitleStyle: {
      fontSize: 28,
      textAlign: "center",
      color: colors.darkBlackGreen,
      fontFamily: "sans-serif-medium",
      letterSpacing: 0.85,
    },
    headerTitleContainerStyle: {
      height: "100%",
      justifyContent: "flex-start",
      marginTop: 12,
    },
    headerLeftContainerStyle: {
      justifyContent: "flex-start",
      marginLeft: 4,
      marginTop: 24,
    },
  },
  defaultTextStyle: {
    textAlign: "center",
    color: colors.darkBlackGreen,
  },
  defaultIconHeaderStyle: {
    color: colors.darkBlackGreen,
  },
};
