import React, { useLayoutEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { UsersOverviewScreenStackParamList } from "./UsersOverviewScreenStack";
import { useProfileStore } from "../../store/useProfileStore";
import { useUsersByType } from "../../hooks/user/useUsersByType";
import {
  ListRenderItemInfo,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { displayOneButtonAlert } from "../../utils/displayAlert";
import { UserObject } from "../../types/user/UserObject";
import { List } from "react-native-paper";
import { theme } from "../../theme";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type UsersOverviewScreenProps = StackScreenProps<
  UsersOverviewScreenStackParamList,
  "UsersOverviewScreen"
>;

export const UsersOverviewScreen: React.FC<UsersOverviewScreenProps> = ({
  navigation,
  route,
}) => {
  const profileType = useProfileStore((state) => state.profileType);

  useLayoutEffect(() => {
    if (profileType) {
      navigation.setOptions({
        headerTitle:
          profileType === ProfileTypeEnum.Forwarder ? "DOSTAWCY" : "SPEDYTORZY",
      });
    }
  });

  const {
    usersByType: usersByTypeData,
    isLoading: usersDataIsLoading,
    isError: usersByTypeDataError,
  } = useUsersByType(profileType);

  if (usersByTypeDataError)
    return (
      <>
        {displayOneButtonAlert()}
        {console.log(usersByTypeDataError)}
        <Text>Wystąpił błąd</Text>
      </>
    );

  const onPressItem = (item: UserObject) => {
    navigation.push("ProfileOverviewScreen", { userObject: item });
  };

  const renderListItem = ({ item, index }: ListRenderItemInfo<UserObject>) => (
    <List.Item
      key={`${item?._id}${index}`}
      title={`${item?.name} ${item?.lastName}`}
      style={styles.listItemStyle}
      onPress={() => onPressItem(item)}
      left={(props) => <List.Icon {...props} icon="account-box" />}
      right={(props) => renderRightListItem(item)}
    />
  );

  const renderRightListItem = (item: UserObject) => {
    if (profileType === ProfileTypeEnum.Forwarder) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{item?.rating?.toFixed(2)}</Text>
          <MaterialCommunityIcons
            name="star-outline"
            color={theme.colors.darkGreen}
            size={20}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.usersList}>
        {!usersDataIsLoading ? (
          <FlatList
            keyExtractor={(item) => item._id}
            data={usersByTypeData}
            renderItem={renderListItem}
          />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  usersList: {
    flex: 1,
  },
  listItemStyle: {
    backgroundColor: theme.colors.mediumGreen,
    marginVertical: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginHorizontal: 8,
    borderRadius: 8,
  },
});
