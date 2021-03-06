import React from "react";
import { UserObjectFormValues } from "../../types/user/UserObject";
import { StyleSheet, Text, View } from "react-native";
import { ShortInputComponent } from "../shared/ShortInputComponent";
import { theme } from "../../theme";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { PlaceObject } from "../../types/places/PlaceObject";
import { ProfileFormPlacesSection } from "./ProfileFormPlacesSection";
import { usePlaces } from "../../hooks/places/usePlaces";

type ProfileFormProps = {
  editMode?: boolean;
  userObject: UserObjectFormValues;
  profileType: ProfileTypeEnum | null;
  setName?(value: string): void;
  setLastName?(value: string): void;
  setPhoneNumber?(value: string): void;
  setPreferredRatePerHour?(value: string): void;
  setAdditionalInfo?(value: string): void;
  setHideSaveButton?(val: boolean): void;
  setAvailableStartPlaces?(array: PlaceObject[]): void;
  availableStartPlacesArray?: PlaceObject[];
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  editMode = false,
  userObject,
  profileType = ProfileTypeEnum.Provider,
  setName = () => {},
  setLastName = () => {},
  setPhoneNumber = () => {},
  setPreferredRatePerHour = () => {},
  setAdditionalInfo = () => {},
  setHideSaveButton = () => {},
  setAvailableStartPlaces = () => {},
  availableStartPlacesArray,
}) => {
  const {
    places: placesData,
    isLoading: placesDataIsLoading,
    isError: placesDataError,
  } = usePlaces();

  const renderProviderRatePerHour = () =>
    profileType === ProfileTypeEnum.Provider && (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>
          Preferowana stawka godzinowa
        </Text>
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          keyboardType="numeric"
          setText={setPreferredRatePerHour}
          text={userObject.preferredRatePerHour}
          placeholder="Preferowana stawka za godzin??"
        />
      </View>
    );

  const renderProviderAvailablePlaces = () =>
    profileType === ProfileTypeEnum.Provider && (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>
          Preferowane miejsca rozpocz??cia zlecenia
        </Text>
        <ProfileFormPlacesSection
          places={placesData}
          setApprovedArray={setAvailableStartPlaces}
          disabled={!editMode}
          initialPlacesArray={userObject.availableStartPlaces}
          approvedArray={
            editMode
              ? availableStartPlacesArray
              : userObject.availableStartPlaces
          }
        />
      </View>
    );

  const renderProviderAdditionalInfo = () =>
    profileType === ProfileTypeEnum.Provider && (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Dodatkowe informacje</Text>
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          multiline
          isEditable={editMode}
          setText={setAdditionalInfo}
          text={userObject.additionalInfo}
          placeholder="Dodatkowe informacje. Na przyk??ad niedost??pno???? w konkretnych dniach,
           preferowana godzina startu, email"
        />
      </View>
    );

  return (
    <KeyboardAwareScrollView style={styles.componentContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Imi?? i Nazwisko</Text>
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          text={userObject.name}
          setText={setName}
          placeholder="Imi??"
        />
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          text={userObject.lastName}
          setText={setLastName}
          placeholder="Nazwisko"
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Kontakt</Text>
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          text={userObject.phoneNumber}
          setText={setPhoneNumber}
          keyboardType="numeric"
          placeholder="Telefon"
        />
      </View>
      {renderProviderRatePerHour()}

      {renderProviderAdditionalInfo()}

      {renderProviderAvailablePlaces()}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  subtitleTextStyle: {
    marginLeft: 24,
    marginBottom: 4,
    color: theme.colors.darkBlackGreen,
  },
});
