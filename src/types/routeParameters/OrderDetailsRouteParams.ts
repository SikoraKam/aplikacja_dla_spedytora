import { OrderObject } from "../orders/OrderObject";

export interface OrderDetailsRouteParams {
  order: OrderObject;
  showNotificationAlert?: boolean;
  notificationAlertData?: any;
}
