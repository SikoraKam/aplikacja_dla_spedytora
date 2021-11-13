import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { UsersOverviewScreenStackParamList } from "./UsersOverviewScreenStack";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ProfileHeaderSection } from "../../components/profile/ProfileHeaderSection";
import { ProfileForm } from "../../components/profile/ProfileForm";
import { useProfileStore } from "../../store/useProfileStore";

type ProfileOverviewScreenProps = StackScreenProps<
  UsersOverviewScreenStackParamList,
  "ProfileOverviewScreen"
>;

export const ProfileOverviewScreen: React.FC<ProfileOverviewScreenProps> = ({
  navigation,
  route,
}) => {
  const { userObject } = route.params;
  const profileType = useProfileStore((state) => state.profileType);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profil użytkownika",
      headerTitleContainerStyle: {
        height: "100%",
        justifyContent: "flex-start",
        marginTop: 20,
      },
    });
  });

  return (
    <View style={styles.screenContainer}>
      <ProfileHeaderSection
        profileType={userObject.profileType}
        userData={userObject}
      />

      <View style={styles.contentContainer}>
        <ProfileForm
          userObject={userObject}
          editMode={false}
          profileType={userObject.profileType}
        />
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
