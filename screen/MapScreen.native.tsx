import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreenNative({ results, userLocation }: any) {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation?.latitude ?? 49.25,
          longitude: userLocation?.longitude ?? -123.12,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation
      >
        {results.map((r: any) => (
          <Marker
            key={r.id}
            coordinate={{
              latitude: r.latitude,
              longitude: r.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}