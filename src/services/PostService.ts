import axios from "../utils/axios";
import { CreateOrderPayload } from "../types/orders/CreateOrderPayload";
import { PlaceObject } from "../types/places/PlaceObject";
import {
  QUERY_ORDERS,
  QUERY_PASSWORD_RESET,
  QUERY_PASSWORD_RESET_NEW_PASSWORD,
  QUERY_PLACES,
  QUERY_PLACES_TSP,
  QUERY_POSITIONS,
  QUERY_POSITIONS_PROVIDER,
  QUERY_USER_NOTIFICATIONS,
} from "../constants/queryConstants";
import { OrderObject } from "../types/orders/OrderObject";

//orders
export const createOrder = async (body: CreateOrderPayload) => {
  const response = await axios.post(`${QUERY_ORDERS}`, body);

  return response.data;
};

// places
export const solveTsp = async (body: PlaceObject[]) => {
  const response = await axios.post(`${QUERY_PLACES_TSP}`, body);
  return response.data;
};

export const createPlace = async (body: {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}) => {
  const response = await axios.post(`${QUERY_PLACES}`, body);
  return response.data;
};

//positions
export const createPositionRequest = async (body: {
  latitude: number;
  longitude: number;
}) => {
  const response = await axios.post(`${QUERY_POSITIONS}`, body);
  return response.data;
};

export const deletePositionRequest = async (providerId: string) => {
  await axios.delete(`${QUERY_POSITIONS_PROVIDER}/${providerId}`);
};

// notifications
export const sendNotification = async (
  receiverId: string,
  payload: { title: string; announcement: string; orderObject: OrderObject }
) => {
  await axios.post(`${QUERY_USER_NOTIFICATIONS}/${receiverId}`, payload);
};

// auth
export const sendCodeRequest = async (payload: { email: string }) => {
  await axios.post(`${QUERY_PASSWORD_RESET}`, payload);
};

export const passwordResetRequest = async (payload: {
  email: string;
  code: string;
  newPassword: string;
}) => {
  await axios.post(`${QUERY_PASSWORD_RESET_NEW_PASSWORD}`, payload);
};
