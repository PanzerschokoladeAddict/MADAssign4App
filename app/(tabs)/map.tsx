import { getResults } from "@/services/firestoreService";
import * as locationService from "@/services/locationService";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    try {
      const coords = await locationService.getCurrentLocation().catch(() => null);
      if (coords) setUserLocation(coords);

      const allResults = await getResults();
      const withLocation = allResults.filter((r: any) => {
        const lat = r.langitude;
        const lng = r.longitude;
        return typeof lat === "number" && typeof lng === "number" && lat !== 0 && lng !== 0;
      });

      setResults(withLocation);
    } catch (error) {
      console.error("Map load error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude ?? 49.25,
          longitude: userLocation?.longitude ?? -123.12,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation
      >
        {results.map((result: any) => (
          <Marker
            key={result.id}
            coordinate={{
              latitude: result.langitude,
              longitude: result.longitude,
            }}
            title={result.teamName || "Activity"}
            description={result.activityType || ""}
          />
        ))}
      </MapView>

      <View style={styles.info}>
        <Text>📍 {results.length} activities shown</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  info: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
  },
});