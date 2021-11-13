import React from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { ProfileScreenStackParamList } from "./ProfileScreenStack";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { useProfileStore } from "../../store/useProfileStore";
import { theme } from "../../theme";

type MyProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  "MyProfileScreen"
>;

const AVATAR_SIZE = 170;

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const nameAndLastName = useProfileStore((state) => state.nameAndLastName);

  const getInitials = () => {
    const seperate = nameAndLastName.split(" ");
    const name = seperate[0];
    const lastName = seperate[1];
    return `${name[0]}${lastName[0]}`;
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.avatarWrapper}>
        <Avatar.Text
          size={AVATAR_SIZE}
          label={getInitials()}
          style={styles.avatarStyle}
          labelStyle={styles.avatarTextStyle}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text>HEHE</Text>
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
    marginTop: -AVATAR_SIZE / 2 - 30,
    position: "relative",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
  },
  avatarStyle: {
    backgroundColor: theme.colors.secondaryGreen,
    // borderWidth: 5,5
    borderColor: theme.colors.primaryDarkGreen,
    borderStartWidth: 4,
    borderEndWidth: 4,
    borderTopWidth: 0,
    borderBottomWidth: 5,
  },
  avatarTextStyle: {
    color: theme.colors.darkBlackGreen,
  },
});
