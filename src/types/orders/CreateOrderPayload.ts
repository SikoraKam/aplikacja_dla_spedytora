import { OrderStatusEnum } from "./OrderStatusEnum";

export interface CreateOrderPayload {
  dateStart: Date;
  dateEnd: Date;
  forwarder: string;
  provider?: string;
  placeStart: string;
  destinations: string[];
  orderStatus: OrderStatusEnum;
  weightInKg: number;
  category: string;
  description: string;
  incoterm: string;
  truckType: string;
}
