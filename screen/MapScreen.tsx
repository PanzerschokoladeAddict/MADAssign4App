import { getResults } from "@/services/firestoreService";
import * as locationService from "@/services/locationService";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

// 👇 this is the key line
import MapPlatformScreen from "./MapScreen.platform";

export default function MapScreen() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const coords = await locationService.getCurrentLocation().catch(() => null);
      if (coords) setUserLocation(coords);

      const data = await getResults();
      setResults(data);

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <MapPlatformScreen
      results={results}
      userLocation={userLocation}
    />
  );
}