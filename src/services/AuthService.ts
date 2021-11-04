import axios from "../utils/axios";
import { deleteToken, setToken } from "../utils/tokenUtils";
import { ProfileTypeEnum } from "../types/user/ProfileTypeEnum";
import { useAuthStore } from "../store/useAuthStore";
import { stopLocationUpdate } from "./LocationService";
import { checkIfTaskUpdateLocationIsRegistered } from "./TasksService";
import { useProfileStore } from "../store/useProfileStore";
import { useTempStore } from "../store/useTempStore";

export const registerRequest = async (
  name: string,
  lastname: string,
  email: string,
  password: string,
  profileType: ProfileTypeEnum
) => {
  return axios.post("auth/register", {
    name,
    lastName: lastname,
    email,
    password,
    profileType,
  });
};

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post("auth/login", {
    email,
    password,
  });
  await setToken(response.data.access_token);
};

export const logoutRequest = async () => {
  // await axios.post("auth/logout");
  const locationTaskIsActive = await checkIfTaskUpdateLocationIsRegistered();
  if (locationTaskIsActive) {
    await stopLocationUpdate();
  }
  await deleteToken();
  // useAuthStore.setState({ token: null });
  resetStores();
};

export const resetStores = () => {
  const resetProfileStore = useProfileStore.getState().reset;
  const resetTempStore = useTempStore.getState().reset;
  const resetAuthStore = useAuthStore.getState().reset;

  resetAuthStore();
  resetProfileStore();
  resetTempStore();
};
