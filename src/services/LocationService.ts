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
  const foregroundPermissionStatus = await checkForegroundLocationPermission();
  const backgroundPermissionStatus = await checkBackgroundLocationPermission();

  if (
    foregroundPermissionStatus !== "granted" ||
    backgroundPermissionStatus !== "granted"
  ) {
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
    distanceInterval: 1000, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 30000, // minimum interval (in milliseconds) between updates
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    foregroundService: {
      notificationTitle: "Using your location",
      notificationBody:
        "To turn off, go back to the app and switch something off.",
    },
  });
};
