import React, { useLayoutEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { ProfileScreenStackParamList } from "./ProfileScreenStack";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useProfileStore } from "../../store/useProfileStore";
import { theme } from "../../theme";
import { ProfileForm } from "../../components/profile/ProfileForm";
import { useUser } from "../../hooks/user/useUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { logoutRequest } from "../../services/AuthService";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { useSWRConfig } from "swr";
import { AVATAR_SIZE } from "../../constants/appConstants";
import { ProfileHeaderSection } from "../../components/profile/ProfileHeaderSection";

type MyProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  "MyProfileScreen"
>;

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { cache } = useSWRConfig();
  const { user: userData, isError: userDataError } = useUser();
  const profileType = useProfileStore((state) => state.profileType);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderLogoutButton(),
      headerRightContainerStyle: {
        height: "100%",
        justifyContent: "flex-start",
        marginRight: 4,
        marginTop: 16,
      },
    });
  }, [navigation]);

  const renderLogoutButton = () => (
    <Button
      onPress={async () => await logoutProcess()}
      labelStyle={{ color: theme.colors.darkBlackGreen }}
    >
      Wyloguj
    </Button>
  );

  const logoutProcess = async () => {
    await logoutRequest();
    // @ts-ignore
    cache.clear();
  };

  return (
    <View style={styles.screenContainer}>
      <ProfileHeaderSection profileType={profileType} userData={userData} />

      <View style={styles.contentContainer}>
        <ProfileForm userObject={userData} editMode={false} />
      </View>

      <MainButtonComponent
        text="Edytuj dane"
        buttonStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 48,
          marginHorizontal: 0,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}
        onPress={() => navigation.push("ProfileEditScreen", { user: userData })}
      />
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
    marginBottom: 60,
  },
});
