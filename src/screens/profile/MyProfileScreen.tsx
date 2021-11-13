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

type MyProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  "MyProfileScreen"
>;

const AVATAR_SIZE = 170;

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { cache } = useSWRConfig();
  const { user: userData, isError: userDataError } = useUser();
  const nameAndLastName = useProfileStore((state) => state.nameAndLastName);
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

  const getInitials = () => {
    const seperate = nameAndLastName.split(" ");
    const name = seperate[0];
    const lastName = seperate[1];
    return `${name[0]}${lastName[0]}`;
  };

  const renderRating = () => {
    if (profileType === ProfileTypeEnum.Forwarder) return <View />;
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: -20,
          marginBottom: 24,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={styles.ratingTextStyle}>
          {userData?.rating > 0 ? userData?.rating : "Brak Ocen"}
        </Text>
        <MaterialCommunityIcons
          name="star-outline"
          color={theme.colors.darkGreen}
          size={30}
        />
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.avatarWrapper}>
        {renderRating()}
        <Avatar.Text
          size={AVATAR_SIZE}
          label={getInitials()}
          style={styles.avatarStyle}
          labelStyle={styles.avatarTextStyle}
        />
      </View>

      <View style={styles.contentContainer}>
        <ProfileForm userObject={userData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    zIndex: 100,
  },
  navbarExtension: {
    width: "100%",
    height: AVATAR_SIZE / 2,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: -AVATAR_SIZE / 2 - 40,
    position: "relative",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
  },
  avatarStyle: {
    backgroundColor: theme.colors.secondaryGreen,
    borderColor: theme.colors.primaryDarkGreen,
    borderStartWidth: 4,
    borderEndWidth: 4,
    borderTopWidth: 0,
    borderBottomWidth: 5,
  },
  avatarTextStyle: {
    color: theme.colors.darkBlackGreen,
  },
  ratingTextStyle: {
    ...theme.defaultTextStyle,
    fontWeight: "bold",
    fontSize: 18,
  },
});
