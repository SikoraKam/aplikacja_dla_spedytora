import * as SecureStore from "expo-secure-store";

import { TOKEN_STORAGE_KEY } from "../constants";
import { TOKEN_CHANGED_EVENT } from "../constants";
import { EventBus } from "./eventBus";
import { useAuthStore } from "../store/useAuthStore";

/**
 * Retrieve token from SecureStore
 */
export const getToken = () => SecureStore.getItemAsync(TOKEN_STORAGE_KEY);

/**
 * Save token in SecureStore and emit change event
 * @param token - JWT token
 */
export const setToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token);
  useAuthStore.setState({ token });
  // EventBus.emit(TOKEN_CHANGED_EVENT);
};

/**
 * Remove token from SecureStore and emit change event
 */
export const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
  useAuthStore.setState({ token: null });
  // EventBus.emit(TOKEN_CHANGED_EVENT);
};
