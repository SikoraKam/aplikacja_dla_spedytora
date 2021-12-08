import "dotenv/config";
module.exports = {
  name: "Mobilna platforma logistyczna",
  displayName: "Mobilna platforma logistyczna",
  expo: {
    name: "Mobilna platforma logistyczna",
    slug: "MobilnaPlatformaLogistyczna",
    icon: "./assets/logo.png",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    extra: {
      apiBaseUrl: process.env.EXPO_API_BASE_URL,
    },
    android: {
      useNextNotificationsApi: true,
      package: "com.sikorakam.spedytor",
      versionCode: 1,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
    },
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.EXPO_GOOGLE_MAPS_IOS_KEY,
      },
      bundleIdentifier: "com.MobilnaPlatformaLogistyczna.app",
    },
  },
};
