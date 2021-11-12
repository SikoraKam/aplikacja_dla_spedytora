import React, { useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { UserObject } from "../../types/user/UserObject";

type NotificationAlertProps = {
  showAlert: boolean;
  title: string;
  message: string;
  sender: UserObject;
};

export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  showAlert,
  title,
  message,
  sender,
}) => {
  const [show, setShow] = useState<boolean>(showAlert);

  return (
    <AwesomeAlert
      show={show}
      showProgress={false}
      title={title}
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
