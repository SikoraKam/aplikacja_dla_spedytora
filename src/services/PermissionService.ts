import * as Location from "expo-location";

export const requestForegroundLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status;
};

export const requestBackgroundLocationPermission = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  return status;
};

export const checkForegroundLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status;
};

export const checkBackgroundLocationPermission = async () => {
  const { status } = await Location.getBackgroundPermissionsAsync();
  return status;
};
