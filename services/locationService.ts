import * as Location from "expo-location";

export async function requestLocationPermission() {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            console.log("Location permission granted");
            return true;
        } else {
            console.warn("Location permission denied");
            return false;
        }
    } catch (error) {
        console.error("Error requesting location permission:", error);
        return false;
    }
}

export async function getCurrentLocation() {
    try {
        let { status } = await Location.getForegroundPermissionsAsync();

    if (status === "undetermined") {
      const request = await Location.requestForegroundPermissionsAsync();
      status = request.status;
    }

    if (status !== "granted") {
      throw new Error("Location permission not granted");
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return location.coords;
    } catch (error) {
        console.error("Error getting current location:", error);
        throw error;
    }
}