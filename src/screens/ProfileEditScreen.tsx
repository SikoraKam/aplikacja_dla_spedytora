import React, { useState } from "react";
import { ProfileScreenStackParamList } from "./profile/ProfileScreenStack";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { StyleSheet, View } from "react-native";
import { ProfileForm } from "../components/profile/ProfileForm";
import { ProfileHeaderSection } from "../components/profile/ProfileHeaderSection";
import { MainButtonComponent } from "../components/MainButtonComponent";
import { updateUserFormRequest } from "../services/PatchService";
import { useSWRConfig } from "swr";
import { QUERY_USERS_USER } from "../constants/queryConstants";
import { displayOneButtonAlert } from "../utils/displayAlert";

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
  const [availableStartPlaces, setAvailableStartPlaces] = useState(
    user.availableStartPlaces
  );
  const [additionalInfo, setAdditionalInfo] = useState(user.additionalInfo);

  const tempUserValues = {
    name,
    lastName,
    phoneNumber,
    preferredRatePerHour,
    availableStartPlaces,
    additionalInfo,
  };

  const onSave = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const availablePlacesArrayId = availableStartPlaces.map(
        (element) => element?._id
      );
      const userRequestBody = {
        ...tempUserValues,
        availableStartPlaces: availablePlacesArrayId,
      };
      const res = await updateUserFormRequest(tempUserValues);
      await mutate(QUERY_USERS_USER);
      setIsLoading(false);
      navigation.goBack();
    } catch (e) {
      displayOneButtonAlert();
      console.log("ERROR", e);
    }
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
          }}
          setAvailableStartPlaces={setAvailableStartPlaces}
          availableStartPlacesArray={availableStartPlaces}
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
