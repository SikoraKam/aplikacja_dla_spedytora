import React from "react";
import { ProfileScreenStackParamList } from "./profile/ProfileScreenStack";
import { ScreenStackProps } from "react-native-screens";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { StyleSheet, View } from "react-native";
import { ProfileForm } from "../components/profile/ProfileForm";
import { ProfileHeaderSection } from "../components/profile/ProfileHeaderSection";

type ProfileEditScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  "ProfileEditScreen"
>;

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = route.params;

  return (
    <View style={styles.screenContainer}>
      <ProfileHeaderSection profileType={user.profileType} userData={user} />

      <View style={styles.contentContainer}>
        <ProfileForm userObject={user} editMode={true} />
      </View>
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
