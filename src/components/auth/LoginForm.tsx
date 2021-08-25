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

type LoginFormProps = {
  onPressRecoveryPasswordScreenButton(): void;
};

type LoginFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Adres email jest niepoprawny")
    .required("Podaj adres email aby się zalogować"),
  password: yup.string().required("Podaj hasło aby się zalogować"),
});

export const LoginForm: React.FC<LoginFormProps> = ({
  onPressRecoveryPasswordScreenButton,
}) => {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const [isLoginInProcess, setIsLoginInProcess] = useState(false);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const onSubmit = async () => {
    setIsLoginInProcess(true);
    Keyboard.dismiss();

    try {
      // TODO await function for register
    } catch (error) {
      setResponseErrors(error, setError);
    }
    setIsLoginInProcess(false);
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
      </View>

      <MainButtonComponent
        text="Dalej"
        buttonStyle={styles.buttonStyle}
        loading={isLoginInProcess}
        disabled={isLoginInProcess}
        onPress={handleSubmit(onSubmit)}
      />

      <Button
        mode="text"
        labelStyle={styles.labelTextButtonStyle}
        style={styles.textButtonStyle}
        onPress={onPressRecoveryPasswordScreenButton}
      >
        Pomoc w logowaniu
      </Button>
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
