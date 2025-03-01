import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions"; 
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateUserLocation } from "../redux/slices/userSlice";

const useFetchLocation = (trigger) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const requestPermission = async () => {
    try {
      const result = await request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      return result === RESULTS.GRANTED;
    } catch (err) {
      console.error("Permission error:", err);
      return false;
    }
  };

  const fetchLocation = async () => {
    setIsLoading(true);
    setError(null);

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Enable location access for a better experience.");
      setIsLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Dispatch location to Redux
        const result = await dispatch(updateUserLocation({ latitude, longitude }));
        
        if (result?.payload?.success) {
          navigation.replace("BottomTabs");
        }

        setIsLoading(false);
      },
      (err) => {
        console.error("Location error:", err);
        setError("Could not fetch location");
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (trigger) fetchLocation();
  }, [trigger]);

  return { isLoading, error };
};

export default useFetchLocation;
