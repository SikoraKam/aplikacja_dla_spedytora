import React, { useRef } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { PlaceObject } from "../../types/places/PlaceObject";
import { PositionResponse } from "../../types/positions/PositionResponse";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ActiveTourMapProps = {
  initialRegion: Region;
  placeStart: PlaceObject;
  destinations: PlaceObject[];
  providerPosition?: PositionResponse;
  providerLastName?: string;
};

export const ActiveTourMap: React.FC<ActiveTourMapProps> = ({
  initialRegion,
  placeStart,
  destinations,
  providerPosition,
  providerLastName,
}) => {
  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={styles.componentContainer}>
      <MapView
        ref={mapRef}
        provider="google"
        initialRegion={initialRegion}
        style={[StyleSheet.absoluteFill]}
        showsMyLocationButton={false}
      >
        <Marker
          coordinate={{
            latitude: placeStart.latitude,
            longitude: placeStart.longitude,
          }}
          title={placeStart.name}
          description={placeStart.address}
        >
          <MaterialCommunityIcons name="home" size={30} />
        </Marker>
        {providerPosition && (
          <Marker
            coordinate={{
              latitude: providerPosition?.latitude,
              longitude: providerPosition?.longitude,
            }}
            title={providerLastName}
          >
            <MaterialCommunityIcons name="van-utility" size={30} />
          </Marker>
        )}
        {destinations?.map((element) => (
          <Marker
            coordinate={{
              latitude: element.latitude,
              longitude: element.longitude,
            }}
            key={element._id}
            title={element.name}
            description={element.address}
          >
            <MaterialCommunityIcons name="map-marker-down" size={30} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
  },
});
