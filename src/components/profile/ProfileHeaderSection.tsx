import React from "react";
import { Avatar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { AVATAR_SIZE } from "../../constants/appConstants";
import { theme } from "../../theme";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserObject } from "../../types/user/UserObject";
import { useProfileStore } from "../../store/useProfileStore";

type ProfileHeaderSectionProps = {
  profileType: ProfileTypeEnum | null;
  userData: UserObject;
};

export const ProfileHeaderSection: React.FC<ProfileHeaderSectionProps> = ({
  profileType,
  userData,
}) => {
  const nameAndLastName = useProfileStore((state) => state.nameAndLastName);

  const renderRating = () => {
    if (profileType === ProfileTypeEnum.Forwarder || !userData?.rating)
      return <View />;
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
          {userData?.rating > 0 ? userData?.rating.toFixed(2) : "Brak Ocen"}
        </Text>
        <MaterialCommunityIcons
          name="star-outline"
          color={theme.colors.darkGreen}
          size={30}
        />
      </View>
    );
  };

  const getInitials = () => {
    const seperate = nameAndLastName.split(" ");
    const name = seperate[0];
    const lastName = seperate[1];
    return `${name[0]}${lastName[0]}`;
  };

  return (
    <View style={styles.avatarWrapper}>
      {renderRating()}
      <Avatar.Text
        size={AVATAR_SIZE}
        label={getInitials()}
        style={styles.avatarStyle}
        labelStyle={styles.avatarTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    alignItems: "center",
    marginTop: -AVATAR_SIZE / 2 - 40,
    position: "relative",
    zIndex: 900,
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
