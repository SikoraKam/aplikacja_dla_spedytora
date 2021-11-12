import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { theme } from "../../theme";
import { UserObject } from "../../types/user/UserObject";

type NotificationAlertProps = {
  showAlert: boolean;
  title: string;
  message: string;
  sender?: UserObject;
  sentDate: string;
};

export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  showAlert,
  title,
  message,
  sender,
  sentDate,
}) => {
  const [show, setShow] = useState<boolean>(showAlert);

  const titleWithDate = `${title} ${sentDate}`;

  return (
    <AwesomeAlert
      show={show}
      showProgress={false}
      title={titleWithDate}
      message={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText="Okej"
      confirmButtonColor={theme.colors.lightGreen}
      onConfirmPressed={() => setShow(false)}
      onDismiss={() => setShow(false)}
      confirmButtonStyle={{ paddingHorizontal: 36, paddingVertical: 12 }}
    />
  );
};
