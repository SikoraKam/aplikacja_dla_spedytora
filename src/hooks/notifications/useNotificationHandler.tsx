import { NotificationResponse } from "expo-notifications";
import { NOTIFICATION_EVENT } from "../../constants/eventsConstants";
import { EventBus } from "../../utils/eventBus";
import React, { useCallback, useEffect } from "react";
import { OrderObject } from "../../types/orders/OrderObject";

export const useNotificationHandler = (navigation: any) => {
  const handleNotificationPress = useCallback(
    async (response: NotificationResponse) => {
      const responseData = response.notification?.request?.content?.data as {
        orderObject: OrderObject;
        title: string;
        announcement: string;
      };

      await navigation.navigate("Orders", { screen: "OrdersScreen" });
      await navigation.navigate("Orders", {
        screen: "OrderDetailsScreen",
        params: {
          order: responseData.orderObject,
          showNotificationAlert: true,
          notificationAlertData: responseData,
        },
      });
    },
    [navigation]
  );

  useEffect(() => {
    const unsubscribe = EventBus.on(
      NOTIFICATION_EVENT,
      handleNotificationPress
    );
    return () => {
      unsubscribe();
    };
  }, [handleNotificationPress]);
};
