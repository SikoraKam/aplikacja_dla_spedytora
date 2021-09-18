import axios from "../utils/axios";
import { deleteToken, setToken } from "../utils/tokenUtils";

export const registerRequest = async (
  name: string,
  lastname: string,
  email: string,
  password: string
) => {
  return axios.post("auth/register", {
    name,
    lastName: lastname,
    email,
    password,
  });
};

export const loginRequest = async (email: string, password: string) => {
  console.log("OOOOO");
  const response = await axios.post("auth/login", {
    email,
    password,
  });
  console.log("XDDDD ==> ", response.data.access_token);
  await setToken(response.data.access_token);
};

const logoutRequest = async () => {
  await axios.post("auth/logout");
  await deleteToken();
};
