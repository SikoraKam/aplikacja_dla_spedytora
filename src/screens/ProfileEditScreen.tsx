import React, { useState } from "react";
import { ProfileScreenStackParamList } from "./profile/ProfileScreenStack";
import { ScreenStackProps } from "react-native-screens";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { StyleSheet, View } from "react-native";
import { ProfileForm } from "../components/profile/ProfileForm";
import { ProfileHeaderSection } from "../components/profile/ProfileHeaderSection";
import { MainButtonComponent } from "../components/MainButtonComponent";
import { updateUserFormRequest } from "../services/PatchService";
import useSWR, { useSWRConfig } from "swr";
import { QUERY_USERS, QUERY_USERS_USER } from "../constants/queryConstants";

type ProfileEditScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  "ProfileEditScreen"
>;

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = route.params;
  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState(false);
  const [hideSaveButton, setHideSaveButton] = useState(false);

  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [preferredRatePerHour, setPreferredRatePerHour] = useState(
    user.preferredRatePerHour
  );
  const [preferredStartPlaces, setPreferredStartPlaces] = useState(
    user.preferredStartPlaces
  );
  const [additionalInfo, setAdditionalInfo] = useState(user.additionalInfo);

  const tempUserValues = {
    name,
    lastName,
    phoneNumber,
    preferredRatePerHour,
    preferredStartPlaces,
    additionalInfo,
  };

  const onSave = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await updateUserFormRequest(tempUserValues);
    await mutate(QUERY_USERS_USER);
    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.screenContainer}>
      <ProfileHeaderSection profileType={user.profileType} userData={user} />

      <View
        style={[
          styles.contentContainer,
          !hideSaveButton && { marginBottom: 60 },
        ]}
      >
        <ProfileForm
          userObject={tempUserValues}
          editMode={true}
          profileType={user.profileType}
          {...{
            setName,
            setLastName,
            setAdditionalInfo,
            setPhoneNumber,
            setPreferredRatePerHour,
            setPreferredStartPlaces,
          }}
          setHideSaveButton={setHideSaveButton}
        />
      </View>

      {!hideSaveButton && (
        <MainButtonComponent
          text="Zapisz dane"
          loading={isLoading}
          disabled={isLoading}
          buttonStyle={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 48,
            marginHorizontal: 0,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          }}
          onPress={onSave}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    zIndex: 100,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
  },
});
