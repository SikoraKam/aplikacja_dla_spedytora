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
  blackGreen: "#4B6A4E",
  darkBlackGreen: "#384f3b",
  lightGreen: "#BAE75B",
  greenBackgroundLight: "#D6F6B6",
  secondaryGreen: "#C4F592",
  white: "#FFFFFF",
  black: "#000000",
  error: "#ea4747",
  background: "#ffffff",
};

export const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...colors,
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
    },
  },
  authHeader: {
    headerStyle: {
      elevation: 0,
      height: 80,
      backgroundColor: colors.background,
      shadowColor: "transparent",
    },
  },
  defaultTextStyle: {
    textAlign: "center",
  },
};
