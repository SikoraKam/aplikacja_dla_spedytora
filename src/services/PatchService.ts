import axios from "../utils/axios";
import { UpdateOrderPayload } from "../types/orders/UpdateOrderPayload";
import { UpdateProviderRatingPayload } from "../types/user/UpdateProviderRatingPayload";
import { UserObject } from "../types/user/UserObject";

export const updateOrder = async (
  orderId: string,
  body: UpdateOrderPayload
) => {
  const response = await axios.patch(`orders/${orderId}`, body);
  // return response.data.data;
};

export const updateProviderRating = async (
  userId: string,
  body: UpdateProviderRatingPayload
) => {
  const response = await axios.patch(`users/rating/${userId}`, body);
  // return response.data;
};
