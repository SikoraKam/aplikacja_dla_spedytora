import axios from "../utils/axios";
import { UpdateOrderPayload } from "../types/orders/UpdateOrderPayload";
import { UpdateProviderRatingPayload } from "../types/user/UpdateProviderRatingPayload";
import { UpdateProviderPosition } from "../types/positions/UpdateProviderPosition";
import {
  QUERY_ORDERS,
  QUERY_POSITIONS_PROVIDER,
  QUERY_USER_NOTIFICATIONS,
  QUERY_USER_RATING,
  QUERY_USERS,
} from "../constants/queryConstants";
import { UpdateUserPayload } from "../types/user/UpdateUserPayload";

// ------ order
export const updateOrder = async (
  orderId: string,
  body: UpdateOrderPayload
) => {
  const response = await axios.patch(`${QUERY_ORDERS}/${orderId}`, body);
  return response.data;
};
// ----- user
export const updateProviderRating = async (
  userId: string,
  body: UpdateProviderRatingPayload
) => {
  const response = await axios.patch(`${QUERY_USER_RATING}/${userId}`, body);
  return response.data;
};

export const updateUserFormRequest = async (body: UpdateUserPayload) => {
  const response = await axios.patch(QUERY_USERS, body);
  return response.data;
};

// ------- position
export const requestUpdateProviderPosition = async (
  body: UpdateProviderPosition
) => {
  const response = await axios.patch(`${QUERY_POSITIONS_PROVIDER}`, body);
};

// ---- push token
export const updateExpoPushTokenRequest = async (body: {
  expo_token: string;
}) => {
  const response = await axios.patch(`${QUERY_USER_NOTIFICATIONS}`, body);
  return response.data;
};

export const deleteExpoPushTokenRequest = async () => {
  const response = await axios.delete(`${QUERY_USER_NOTIFICATIONS}`);
  return response.data;
};
