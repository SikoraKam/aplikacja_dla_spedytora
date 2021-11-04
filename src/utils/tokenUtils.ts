import * as SecureStore from "expo-secure-store";

import { useAuthStore } from "../store/useAuthStore";
import { TOKEN_STORAGE_KEY } from "../constants/authConstants";

/**
 * Retrieve token from SecureStore
 */
export const getToken = () => SecureStore.getItemAsync(TOKEN_STORAGE_KEY);

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token);
  useAuthStore.setState({ token });
};

/**
 * Remove token from SecureStore
 */
export const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
  useAuthStore.setState({ token: null });
};
