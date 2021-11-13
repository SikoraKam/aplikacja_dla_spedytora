import React from "react";
import { UserObjectFormValues } from "../../types/user/UserObject";
import { StyleSheet, Text, View } from "react-native";
import { ShortInputComponent } from "../shared/ShortInputComponent";
import { theme } from "../../theme";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ProfileFormProps = {
  editMode?: boolean;
  userObject: UserObjectFormValues;
  profileType: ProfileTypeEnum | null;
  setName?(value: string): void;
  setLastName?(value: string): void;
  setPhoneNumber?(value: string): void;
  setPreferredRatePerHour?(value: string): void;
  setPreferredStartPlaces?(value: string): void;
  setAdditionalInfo?(value: string): void;
  setHideSaveButton?(val: boolean): void;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  editMode = false,
  userObject,
  profileType = ProfileTypeEnum.Provider,
  setName = () => {},
  setLastName = () => {},
  setPhoneNumber = () => {},
  setPreferredRatePerHour = () => {},
  setPreferredStartPlaces = () => {},
  setAdditionalInfo = () => {},
  setHideSaveButton = () => {},
}) => {
  const renderProviderContactSection = () =>
    profileType === ProfileTypeEnum.Provider && (
      <>
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          keyboardType="numeric"
          setText={setPreferredRatePerHour}
          text={userObject.preferredRatePerHour}
          placeholder="Preferowana stawka za godzinę"
        />
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          setText={setPreferredStartPlaces}
          text={userObject.preferredStartPlaces}
          placeholder="Informacja o preferowanej okolicy startu"
        />
      </>
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
          placeholder="Dodatkowe informacje. Na przykład niedostępność w konkretnych dniach,
           preferowana godzina startu, email"
        />
      </View>
    );

  return (
    <KeyboardAwareScrollView style={styles.componentContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Imię i Nazwisko</Text>
        <ShortInputComponent
          onFocus={() => setHideSaveButton(true)}
          onBlur={() => setHideSaveButton(false)}
          isEditable={editMode}
          text={userObject.name}
          setText={setName}
          placeholder="Imię"
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
        {renderProviderContactSection()}
      </View>

      {renderProviderAdditionalInfo()}
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