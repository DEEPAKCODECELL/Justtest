import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

const useFetchLocationForProvider = (trigger,continous) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log("Location permission granted.");
        return true;
      } else {
        Alert.alert("Permission Denied", "Location permission is required.");
        return false;
      }
    } catch (error) {
      console.error("Permission request error:", error);
      return false;
    }
  };

  const fetchLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setError("Permission Denied");
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
      },
      (err) => {
        console.error("Location error:", err);
        setError("Could not fetch location");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );
  };

  useEffect(() => {
    if (!trigger) return;

    setIsLoading(true);
    fetchLocation(); // Initial fetch
    if (continous == false) {
      return;
    }
    const interval = setInterval(() => {
      fetchLocation();
    }, 5000); // Fetch location every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [trigger]);

  return { location, isLoading, error };
};

export default useFetchLocationForProvider;
