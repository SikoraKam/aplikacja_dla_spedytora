import React, { useEffect, useRef } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { RegionObject } from "../../types/places/RegionObject";
import { PlaceObject } from "../../types/places/PlaceObject";
import { handlePress } from "react-native-paper/lib/typescript/components/RadioButton/utils";
import { PositionResponse } from "../../types/positions/PositionResponse";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ActiveTourMapProps = {
  initialRegion: Region;
  placeStart: PlaceObject;
  destinations: PlaceObject[];
  providerPosition: PositionResponse;
  providerLastName: string;
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
          pinColor={"tan"}
          title={placeStart.name}
          description={placeStart.address}
        />
        <Marker
          coordinate={{
            latitude: providerPosition.latitude,
            longitude: providerPosition.longitude,
          }}
          title={providerLastName}
          description={"HEHEH"}
        >
          <MaterialCommunityIcons name="van-utility" size={30} />
        </Marker>
        {destinations?.map((element) => (
          <Marker
            coordinate={{
              latitude: element.latitude,
              longitude: element.longitude,
            }}
            key={element._id}
            title={element.name}
            description={element.address}
          />
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
