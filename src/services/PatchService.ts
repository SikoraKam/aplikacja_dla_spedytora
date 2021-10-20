import axios from "../utils/axios";
import { UpdateOrderPayload } from "../types/orders/UpdateOrderPayload";

export const updateOrder = async (
  orderId: string,
  body: UpdateOrderPayload
) => {
  const response = await axios.patch(`orders/${orderId}`, body);
  return response.data.data;
};
