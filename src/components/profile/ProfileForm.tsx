import React from "react";
import { UserObject } from "../../types/user/UserObject";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ShortInputComponent } from "../shared/ShortInputComponent";
import { theme } from "../../theme";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";

type ProfileFormProps = {
  editMode?: boolean;
  userObject: UserObject;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  editMode = false,
  userObject,
}) => {
  const renderProviderContactSection = () =>
    userObject.profileType === ProfileTypeEnum.Provider && (
      <>
        <ShortInputComponent
          text=""
          placeholder="Preferowana stawka za godzinę"
        />
        <ShortInputComponent
          text=""
          placeholder="Informacja o preferowanej okolicy startu"
        />
      </>
    );

  const renderProviderAdditionalInfo = () =>
    userObject.profileType === ProfileTypeEnum.Provider && (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Dodatkowe informacje</Text>
        <ShortInputComponent
          multiline
          text=""
          placeholder="Dodatkowe informacje. Na przykład niedostępność w konkretnych dniach, preferowana godzina startu, email"
        />
      </View>
    );

  return (
    <ScrollView style={styles.componentContainer}>
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Imię i Nazwisko</Text>
        <ShortInputComponent text={userObject.name} placeholder="Imię" />
        <ShortInputComponent
          text={userObject.lastName}
          placeholder="Nazwisko"
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subtitleTextStyle}>Kontakt</Text>
        <ShortInputComponent text="" placeholder="Telefon" />
        {renderProviderContactSection()}
      </View>

      {renderProviderAdditionalInfo()}
    </ScrollView>
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
