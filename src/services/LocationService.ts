import {
  checkBackgroundLocationPermission,
  checkForegroundLocationPermission,
  requestBackgroundLocationPermission,
  requestForegroundLocationPermission,
} from "./PermissionService";
import { displayOneButtonAlert } from "../utils/displayAlert";
import * as Location from "expo-location";
import { TASK_UPDATE_LOCATION } from "./TasksService";

export const registerLocationListener = async () => {
  const foregroundPermission = await checkForegroundLocationPermission();
  const backgroundPermission = await checkBackgroundLocationPermission();

  if (!foregroundPermission || !backgroundPermission) {
    const foregroundRequestedPermission = await requestForegroundLocationPermission();
    const backgroundRequestedPermission = await requestBackgroundLocationPermission();

    if (
      foregroundRequestedPermission !== "granted" ||
      backgroundRequestedPermission !== "granted"
    ) {
      displayOneButtonAlert("Brak uprawnień do lokalizacji");
      return;
    }
  }
  await Location.startLocationUpdatesAsync(TASK_UPDATE_LOCATION, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 2, // minimum change (in meters) between updates
    deferredUpdatesInterval: 3000, // minimum interval (in milliseconds) between updates
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    foregroundService: {
      notificationTitle: "Using your location",
      notificationBody:
        "To turn off, go back to the app and switch something off.",
    },
  });
};

export const stopLocationUpdate = async () => {
  await Location.stopLocationUpdatesAsync(TASK_UPDATE_LOCATION);
};
