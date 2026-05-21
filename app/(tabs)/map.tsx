import { getResults } from "@/services/firestoreService";
import * as locationService from "@/services/locationService";
import { AppleMaps, GoogleMaps } from "expo-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    try {
      // Get user location (safely)
      const coords = await locationService.getCurrentLocation().catch(() => null);
      if (coords) setUserLocation(coords);

      // Load results with valid locations
      const allResults = await getResults();
      const withLocation = allResults.filter((r: any) => {
        const lat = r.langitude;
        const lng = r.longitude;
        return typeof lat === "number" && 
               typeof lng === "number" && 
               lat !== 0 && 
               lng !== 0;
      });

      setResults(withLocation);
    } catch (error) {
      console.error("Error loading map:", error);
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

  const MapComponent = Platform.OS === "ios" ? AppleMaps.View : GoogleMaps.View;

  const markers = results.map((result: any) => ({
    coordinates: {
      latitude: result.langitude,
      longitude: result.longitude,
    },
    title: result.teamName || "Activity",
    subtitle: result.activityType || "",
  }));

  const cameraPosition = {
    coordinates: {
      latitude: userLocation?.latitude ?? 49.25,
      longitude: userLocation?.longitude ?? -123.12,
    },
    zoom: 11,
  };

  return (
    <View style={styles.container}>
      <MapComponent
        style={styles.map}
        cameraPosition={cameraPosition}
        markers={markers}
      />

      <View style={styles.info}>
        <Text>📍 {results.length} activities shown</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});