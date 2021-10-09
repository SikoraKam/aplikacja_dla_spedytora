import axios from "../utils/axios";
import { deleteToken, setToken } from "../utils/tokenUtils";
import { ProfileTypeEnum } from "../types/user/ProfileTypeEnum";
import { useAuthStore } from "../store/useAuthStore";

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
  await deleteToken();
  useAuthStore.setState({ token: null });
};
