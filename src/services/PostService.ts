import axios from "../utils/axios";
import { CreateOrderPayload } from "../types/orders/CreateOrderPayload";
import { PlaceObject } from "../types/places/PlaceObject";

//orders
export const createOrder = async (body: CreateOrderPayload) => {
  const response = await axios.post("orders", body);

  // return response.data;
};

// places
export const solveTsp = async (body: PlaceObject[]) => {
  const response = await axios.post("places/tsp", body);
  return response.data;
};

//positions
export const createPositionRequest = async (body: {
  latitude: number;
  longitude: number;
}) => {
  const response = await axios.post("positions");
};

export const deletePositionRequest = async (providerId: string) => {
  await axios.delete(`positions/provider/${providerId}`);
};
