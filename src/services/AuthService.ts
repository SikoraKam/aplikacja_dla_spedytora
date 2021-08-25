import axios from "../utils/axios";
import { deleteToken } from "../utils/tokenUtils";

export const register = async (
  name: string,
  lastname: string,
  email: string,
  password: string
) => {
  return axios.post("auth/register", {
    name,
    lastname,
    email,
    password,
  });
};

export const login = async (email: string, password: string) =>
  axios.post("auth/login", {
    email,
    password,
  });

const logout = async () => {
  await axios.post("auth/logout");
  await deleteToken();
};
