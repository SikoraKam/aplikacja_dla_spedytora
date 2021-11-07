import { PlaceObject } from "../places/PlaceObject";
import { UserObject } from "../user/UserObject";
import { OrderStatusEnum } from "./OrderStatusEnum";

export interface OrderObject {
  _id: string;
  provider: UserObject;
  forwarder: UserObject;
  dateStart: Date;
  dateEnd: Date;
  placeStart: PlaceObject;
  destinations: PlaceObject[];
  orderStatus: OrderStatusEnum;
  category?: string;
  description?: string;
  weightInKg?: string;
}
