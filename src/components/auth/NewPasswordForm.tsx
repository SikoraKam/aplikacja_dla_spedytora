import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, StyleSheet, View } from "react-native";
import { setResponseErrors } from "../../utils/setResponseErrors";
import { MainInputComponent } from "../MainInputComponent";
import { Button, HelperText } from "react-native-paper";
import { MainButtonComponent } from "../MainButtonComponent";
import { theme } from "../../theme";
import { loginRequest } from "../../services/AuthService";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { AxiosError } from "axios";

type NewPasswordFormProps = {};

type NewPasswordFormData = {
  code: string;
  password: string;
  passwordConfirm: string;
};

const LoginSchema = yup.object().shape({
  code: yup.string().required("Podaj kod przesłany na maila"),
  password: yup.string().required("Podaj hasło aby się zalogować"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą się zgadzać")
    .required("Powtórz hasło"),
});

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({}) => {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register("code");
    register("password");
    register("passwordConfirm");
  }, [register]);

  const onSubmit = async ({ password }: NewPasswordFormData) => {
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      //todo
    } catch (error) {
      setResponseErrors(error, setError);
      displayOneButtonAlert(
        "Nieprawidłowe dane",
        "Sprawdź poprawność kodu, który otrzymałeś"
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <View style={styles.inputsContainer}>
        <MainInputComponent
          setText={(value) => setValue("code", value)}
          label={"Kod"}
        />
        {!!errors.code && (
          <HelperText type="error" visible={!!errors.code}>
            {errors.code?.message}
          </HelperText>
        )}
        <MainInputComponent
          setText={(value) => setValue("password", value)}
          label="Hasło"
          secureTextEntry
          autoCompleteType={"password"}
        />
        {!!errors.password && (
          <HelperText type="error" visible={!!errors.password}>
            {errors.password?.message}
          </HelperText>
        )}
        <MainInputComponent
          setText={(value) => setValue("passwordConfirm", value)}
          label={"Powtórz hasło"}
          secureTextEntry
          autoCompleteType={"password"}
        />
        {!!errors.passwordConfirm && (
          <HelperText type="error" visible={!!errors.passwordConfirm}>
            {errors.passwordConfirm?.message}
          </HelperText>
        )}
      </View>

      <MainButtonComponent
        text="Dalej"
        buttonStyle={styles.buttonStyle}
        loading={isLoading}
        disabled={isLoading}
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
