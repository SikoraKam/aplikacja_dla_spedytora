import { OrderStatusEnum } from "./OrderStatusEnum";

export interface UpdateOrderPayload {
  orderStatus: OrderStatusEnum;
}
