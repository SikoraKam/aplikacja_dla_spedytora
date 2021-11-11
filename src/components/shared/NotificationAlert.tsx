import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { theme } from "../../theme";

type NotificationAlertProps = {
  showAlert: boolean;
  // setShowAlert(value: boolean): void;
  title: string;
  message: string;
};

export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  showAlert,
  // setShowAlert,
  title,
  message,
}) => {
  const [show, setShow] = useState<boolean>(showAlert);

  return (
    <AwesomeAlert
      show={show}
      showProgress={false}
      title="AwesomeAlert"
      message="I have a message for you!"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText="Okej"
      confirmButtonColor={theme.colors.lightGreen}
      onConfirmPressed={() => setShow(false)}
    />
  );
};
