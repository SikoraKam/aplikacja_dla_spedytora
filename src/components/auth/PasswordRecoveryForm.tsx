import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, StyleSheet, View } from "react-native";
import { setResponseErrors } from "../../utils";
import { MainInputComponent } from "../MainInputComponent";
import { Button, HelperText } from "react-native-paper";
import { MainButtonComponent } from "../MainButtonComponent";
import { theme } from "../../theme";

type PasswordRecoveryFormProps = {
  onPressRecoveryPasswordScreenButton(): void;
};

type PasswordRecoveryFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const PasswordRecoverySchema = yup.object().shape({
  email: yup
    .string()
    .email("Adres email jest niepoprawny")
    .required("Podaj adres email aby się zalogować"),
});

export const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({
  onPressRecoveryPasswordScreenButton,
}) => {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormData>({
    resolver: yupResolver(PasswordRecoverySchema),
  });

  const [
    isPasswordRecoveryInProcess,
    setIsPasswordRecoveryInProcess,
  ] = useState(false);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const onSubmit = async () => {
    setIsPasswordRecoveryInProcess(true);
    Keyboard.dismiss();

    try {
      // TODO await function for register
    } catch (error) {
      setResponseErrors(error, setError);
    }
    setIsPasswordRecoveryInProcess(false);
  };

  return (
    <>
      <View style={styles.inputsContainer}>
        <MainInputComponent
          setText={(value) => setValue("email", value)}
          label={"Email"}
          autoCompleteType={"email"}
        />
        {!!errors.email && (
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
        )}
      </View>

      <MainButtonComponent
        text="Wyślij"
        buttonStyle={styles.buttonStyle}
        loading={isPasswordRecoveryInProcess}
        disabled={isPasswordRecoveryInProcess}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    marginTop: 12,
  },
  buttonStyle: {
    marginVertical: 16,
  },
  textButtonStyle: {},
  labelTextButtonStyle: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: theme.colors.darkBlackGreen,
  },
});
