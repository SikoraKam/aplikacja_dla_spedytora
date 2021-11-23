import React, { useRef, useState } from "react";
import MapView, { LatLng, MapEvent, Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { PlaceObject } from "../../types/places/PlaceObject";
import { displayOneButtonAlert } from "../../utils/displayAlert";

type MapSelectPlaceProps = {
  onLocationSelected: (place: PlaceObject) => void;
};

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

export const MapSelectPlace: React.FC<MapSelectPlaceProps> = ({
  onLocationSelected,
}) => {
  const mapRef = useRef<MapView | null>(null);
  const [placeLocation, setPlaceLocation] = useState<LatLng | null>(null);

  const onMapPress = async (event: MapEvent) => {
    const { coordinate } = event.nativeEvent;
    setPlaceLocation(coordinate);

    const res = await Location.reverseGeocodeAsync({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    if (!res[0].street) {
      displayOneButtonAlert(
        "Wybierz dokładniejszy adres",
        "Zbliż mapę i spróbuj ponownie"
      );
    }

    const createdPlace: PlaceObject = {
      _id: Date.now().toString(),
      name: res[0].city ?? "Nieznane",
      address: res[0].street ? `${res[0].street} ${res[0].name}` : "Nieznane",
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
    };

    onLocationSelected(createdPlace);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        initialRegion={initialRegion}
        style={[StyleSheet.absoluteFill]}
        showsUserLocation
        showsCompass={false}
        showsMyLocationButton={false}
        zoomTapEnabled={false}
        onPress={onMapPress}
      >
        {placeLocation && <Marker coordinate={placeLocation} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
