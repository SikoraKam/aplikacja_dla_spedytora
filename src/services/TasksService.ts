import * as TaskManager from "expo-task-manager";
import { TaskManagerTask } from "expo-task-manager";
import { useTempStore } from "../store/useTempStore";
import { requestUpdateProviderPosition } from "./PatchService";
import { createPositionRequest } from "./PostService";

export const TASK_UPDATE_LOCATION = "TASK_UPDATE_LOCATION";

export const defineUpdateLocationTask = () => {
  TaskManager.defineTask(
    TASK_UPDATE_LOCATION,
    // @ts-ignore
    async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      const createPositionRequestWasSent = useTempStore.getState()
        .createPositionRequestWasSent;
      const locationTaskOnStartApplicationDefined = useTempStore.getState()
        .locationTaskOnStartApplicationDefined;
      const latitude = locations[0].coords.latitude;
      const longitude = locations[0].coords.longitude;
      console.log("LOCATIONS Latitude-> ", locations[0].coords.latitude);
      try {
        if (createPositionRequestWasSent) {
          await requestUpdateProviderPosition({ latitude, longitude });
        } // if locationTaskOnStartApplicationDefined is true that means user had other order inProgress
        else if (locationTaskOnStartApplicationDefined) {
          await requestUpdateProviderPosition({ latitude, longitude });
        } else {
          // create request is sent after changing order status to inProgress
          useTempStore.setState({ createPositionRequestWasSent: true });
        }
      } catch (err) {
        console.error(err);
      }
    }
  );
};

export const checkIfTaskUpdateLocationIsRegistered = async () => {
  const tasks = await TaskManager.getRegisteredTasksAsync();
  const filteredArray = tasks.filter(
    (element: TaskManagerTask) => element.taskName === TASK_UPDATE_LOCATION
  );
  return !!filteredArray.length;
};
