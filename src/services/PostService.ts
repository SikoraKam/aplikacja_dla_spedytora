import axios from "../utils/axios";
import { CreateOrderPayload } from "../types/orders/CreateOrderPayload";
import { PlaceObject } from "../types/places/PlaceObject";
import {
  QUERY_ORDERS,
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

//positions
export const createPositionRequest = async (body: {
  latitude: number;
  longitude: number;
}) => {
  const response = await axios.post(`${QUERY_POSITIONS}`);
};

export const deletePositionRequest = async (providerId: string) => {
  await axios.delete(`${QUERY_POSITIONS_PROVIDER}/${providerId}`);
};

export const sendNotification = async (
  receiverId: string,
  payload: { title: string; announcement: string; orderObject: OrderObject }
) => {
  await axios.post(`${QUERY_USER_NOTIFICATIONS}/${receiverId}`, payload);
};
