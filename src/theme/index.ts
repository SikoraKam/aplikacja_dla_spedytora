import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

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
    }

    interface Theme {
      tallHeader: any;
      whiteHeader: any;
      primaryHeader: any;
      headerButtonLabel: {
        fontSize: number;
        inverseColor: string;
      };
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
  lightGreen: "#BAE75B",
  greenBackgroundLight: "#D6F6B6",
  secondaryGreen: "#C4F592",
  white: "#FFFFFF",
  black: "#000000",
  error: "#ea4747",
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
      height: 100,
      backgroundColor: colors.greenBackgroundLight,
      shadowColor: "transparent",
    },
    headerTitleStyle: {
      fontSize: 30,
      textAlign: "center",
      color: colors.white,
    },
  },
};
