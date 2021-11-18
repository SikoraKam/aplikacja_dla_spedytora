import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, StyleSheet, View } from "react-native";
import { setResponseErrors } from "../../utils/setResponseErrors";
import { MainInputComponent } from "../MainInputComponent";
import { Button, HelperText } from "react-native-paper";
import { MainButtonComponent } from "../MainButtonComponent";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";

type PasswordRecoveryFormProps = {};

type PasswordRecoveryFormData = {
  email: string;
};

const PasswordRecoverySchema = yup.object().shape({
  email: yup
    .string()
    .email("Adres email jest niepoprawny")
    .required("Podaj adres email aby się zalogować"),
});

export const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({}) => {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormData>({
    resolver: yupResolver(PasswordRecoverySchema),
  });

  const navigation = useNavigation();

  const [
    isPasswordRecoveryInProcess,
    setIsPasswordRecoveryInProcess,
  ] = useState(false);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const onSubmit = async ({ email }: PasswordRecoveryFormData) => {
    setIsPasswordRecoveryInProcess(true);
    Keyboard.dismiss();

    try {
      // @ts-ignore
      navigation.navigate("NewPasswordScreen", {
        email,
      });
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
