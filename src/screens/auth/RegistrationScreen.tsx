import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";
import * as yup from "yup";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
type RegisterScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  "Registration"
>;

const RegisterSchema = yup.object().shape({
  name: yup.string().required("Nick jest wymagany"),
  email: yup
    .string()
    .email("Podaj poprawny adres email")
    .required("Adres email jest wymagany"),
  password: yup
    .string()
    .min(8, "Hasło musi składać się z min. 8 znaków")
    .required("Hasło jest wymagane"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą się zgadzać")
    .required("Powtórz hasło"),
});

export const RegistrationScreen: React.FC<RegisterScreenProps> = () => {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  useEffect(() => {
    register("name");
    register("email");
    register("password");
    register("passwordConfirm");
  }, [register]);

  return <View></View>;
};
