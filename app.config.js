import "dotenv/config";
module.exports = {
  name: "spedytor",
  displayName: "spedytor",
  expo: {
    name: "spedytor",
    slug: "spedytor",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    extra: {
      apiBaseUrl: process.env.EXPO_API_BASE_URL,
    },
  },
};
