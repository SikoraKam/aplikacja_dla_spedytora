import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { AuthScreenStackParamList } from "./AuthScreenStack";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Headline } from "react-native-paper";
import { theme } from "../../theme";
import { ProfileTypeComponent } from "../../components/auth/ProfileTypeComponent";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { registerRequest } from "../../services/AuthService";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";

type ProfileSelectionScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  "ProfileSelection"
>;

export const ProfileSelectionScreen: React.FC<ProfileSelectionScreenProps> = ({
  navigation,
  route,
}) => {
  const [isRegistrationInProcess, setIsRegistrationInProcess] = useState(false);

  const handleChooseProfileType = async (profileType: ProfileTypeEnum) => {
    const { name, lastName, email, password } = route.params;

    setIsRegistrationInProcess(true);
    Keyboard.dismiss();

    try {
      await registerRequest(name, lastName, email, password, profileType);
    } catch (err) {
      console.warn(err);
    }
    navigation.popToTop();
    setIsRegistrationInProcess(false);
  };

  return (
    <View style={styles.screenContainer}>
      <View>
        <Headline style={styles.headlineStyle}>Kim jesteś</Headline>
        <Text style={styles.subheader}>
          Wybierz profil odpowiadający twojej aktywności
        </Text>
      </View>

      <View style={styles.profileSelectionContainer}>
        <ProfileTypeComponent
          onPress={() => handleChooseProfileType(ProfileTypeEnum.Provider)}
          iconComponent={
            <MaterialCommunityIcons name={"truck-fast-outline"} size={50} />
          }
          text="Doręczyciel"
        />
        <ProfileTypeComponent
          onPress={() => handleChooseProfileType(ProfileTypeEnum.Forwarder)}
          iconComponent={<Foundation name={"clipboard-notes"} size={50} />}
          text="Spedytor"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headlineStyle: {
    ...theme.defaultTextStyle,
    fontWeight: "bold",
    color: theme.colors.darkBlackGreen,
    fontSize: 36,
    lineHeight: 36,
    marginBottom: 12,
    marginTop: 24,
  },
  subheader: {
    ...theme.defaultTextStyle,
    color: theme.colors.darkBlackGreen,
    fontSize: 14,
  },
  profileSelectionContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
