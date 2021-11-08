import { NotificationResponse } from "expo-notifications";
import { NOTIFICATION_EVENT } from "../../constants/eventsConstants";
import { EventBus } from "../../utils/eventBus";
import { useCallback, useEffect } from "react";

export const useNotificationHandler = (navigation: any) => {
  const handleNotifiationPress = useCallback(
    (response: NotificationResponse) => {
      // TODO: add behaviour
      console.log("RESPONSE NOTIFICATION ++++> ", response);
    },
    [navigation]
  );

  useEffect(() => {
    const unsubscribe = EventBus.on(NOTIFICATION_EVENT, handleNotifiationPress);

    return () => {
      unsubscribe();
    };
  }, [handleNotifiationPress]);
};
