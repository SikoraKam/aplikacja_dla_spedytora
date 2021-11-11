import { NotificationResponse } from "expo-notifications";
import { NOTIFICATION_EVENT } from "../../constants/eventsConstants";
import { EventBus } from "../../utils/eventBus";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NotificationAlert } from "../../components/shared/NotificationAlert";
import { OrderObject } from "../../types/orders/OrderObject";
import { View } from "react-native";
import { displayOneButtonAlert } from "../../utils/displayAlert";

export const useNotificationHandler = (navigation: any) => {
  // const [showAlert, setShowAlert] = useState(false);
  // const [responseData, setResponseData] = useState<any>(null);

  const handleNotificationPress = useCallback(
    async (response: NotificationResponse) => {
      const responseData = response.notification?.request?.content?.data as {
        orderObject: OrderObject;
        title: string;
        announcement: string;
      };

      await navigation.navigate("Deliverers", {
        screen: "OrderDetailsScreen",
        params: {
          order: responseData.orderObject,
          showNotificationAlert: true,
          notificationAlertData: responseData,
        },
      });

      // displayOneButtonAlert(title, announcement);

      // setShowAlert(true);
      // setResponseData(response.notification?.request?.content?.data);
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
