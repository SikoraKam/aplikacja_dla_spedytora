import axios from "../utils/axios";
import { CreateOrderPayload } from "../types/orders/CreateOrderPayload";

export const createOrder = async (body: CreateOrderPayload) => {
  const response = await axios.post("orders", body);
  return response.data.data;
};
