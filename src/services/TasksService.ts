import * as TaskManager from "expo-task-manager";
import { TaskManagerTask } from "expo-task-manager";

export const TASK_UPDATE_LOCATION = "TASK_UPDATE_LOCATION";

export const defineUpdateLocationTask = () => {
  TaskManager.defineTask(TASK_UPDATE_LOCATION, async ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("LOCATIONS -> ", data);
    try {
      // await requestUpdateProviderPosition(data);
    } catch (err) {
      console.error(err);
    }
  });
};

export const checkIfTaskUpdateLocationIsRegistered = async () => {
  const tasks = await TaskManager.getRegisteredTasksAsync();
  const filteredArray = tasks.filter(
    (element: TaskManagerTask) => element.taskName === TASK_UPDATE_LOCATION
  );
  return !!filteredArray.length;
};
