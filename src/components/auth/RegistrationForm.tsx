import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { MainInputComponent } from "../MainInputComponent";
import { HelperText } from "react-native-paper";
import { MainButtonComponent } from "../MainButtonComponent";
import { setResponseErrors } from "../../utils/setResponseErrors";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "../../screens/auth/AuthScreenStack";

type RegistrationFormProps = {
  navigation: any;
};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const RegisterSchema = yup.object().shape({
  name: yup.string().required("Imię jest wymagane"),
  lastName: yup.string().required("Nazwisko jest wymagane"),
  email: yup
    .string()
    .email("Adres email jest niepoprawny")
    .required("Adres email jest wymagany"),
  password: yup
    .string()
    .min(5, "Hasło musi składać się z mininimum 5 znaków")
    .required("Hasło jest wymagane"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą się zgadzać")
    .required("Powtórz hasło"),
});

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  navigation,
}) => {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const [isRegistrationInProcess, setIsRegistrationInProcess] = useState(false);

  useEffect(() => {
    register("name");
    register("lastName");
    register("email");
    register("password");
    register("passwordConfirm");
  }, [register]);

  const onSubmit = async () => {
    setIsRegistrationInProcess(true);
    Keyboard.dismiss();
    navigation.push("ProfileSelection");
    setIsRegistrationInProcess(false);
  };

  return (
    <>
      <View style={styles.inputsContainer}>
        <MainInputComponent
          setText={(value) => setValue("name", value)}
          label={"Imię"}
          error={!!errors.name}
        />
        {!!errors.name && (
          <HelperText type="error" visible={!!errors.name}>
            {errors.name?.message}
          </HelperText>
        )}
        <MainInputComponent
          setText={(value) => setValue("lastName", value)}
          label={"Nazwisko"}
          error={!!errors.lastName}
        />
        {!!errors.lastName && (
          <HelperText type="error" visible={!!errors.lastName}>
            {errors.lastName?.message}
          </HelperText>
        )}
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
          label={"Hasło"}
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
        loading={isRegistrationInProcess}
        disabled={isRegistrationInProcess}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    marginTop: 12,
  },
  buttonStyle: {
    marginVertical: 16,
  },
});
