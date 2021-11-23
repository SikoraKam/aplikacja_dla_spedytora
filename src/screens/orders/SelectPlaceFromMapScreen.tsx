import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { StyleSheet, View } from "react-native";
import { MapSelectPlace } from "../../components/orders/MapSelectPlace";
import { MainButtonComponent } from "../../components/MainButtonComponent";
import { LatLng } from "react-native-maps";
import { HomeScreenStackParamList } from "../home/HomeScreenStack";
import { PlaceObject } from "../../types/places/PlaceObject";
import { theme } from "../../theme";

type SelectPlaceFromMapScreenProps = StackScreenProps<
  HomeScreenStackParamList,
  "SelectPlaceFromMapScreen"
>;

export const SelectPlaceFromMapScreen: React.FC<SelectPlaceFromMapScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    destinationsArray,
    setDestinationsArray,
    setPlaceStart,
    selectStartPlace, // if true select start place for new order screen, if false select destination for new order screen
  } = route.params;

  const [selectedPlace, setSelectedPlace] = useState<PlaceObject | null>(null);
  const isLocationSelected = selectedPlace !== null;

  const onPress = () => {
    if (selectedPlace && selectStartPlace) {
      setPlaceStart(selectedPlace);
    }
    if (selectedPlace && !selectStartPlace) {
      setDestinationsArray([...destinationsArray, selectedPlace]);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapSelectPlace onLocationSelected={(place) => setSelectedPlace(place)} />
      <View style={styles.buttonContainer}>
        <MainButtonComponent
          text="Potwierdź lokalizacje"
          disabled={!isLocationSelected}
          buttonStyle={
            !isLocationSelected && {
              backgroundColor: theme.colors.disabled,
            }
          }
          mode="contained"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
});
