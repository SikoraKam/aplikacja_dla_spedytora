import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "./HomeScreenStack";
import { StyleSheet, View } from "react-native";

type NewOrderScreenProps = StackScreenProps<
  HomeScreenStackParamList,
  "NewOrderScreen"
>;

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const renderDateInput = () => {};

  return <View style={styles.screenContainer}></View>;
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
