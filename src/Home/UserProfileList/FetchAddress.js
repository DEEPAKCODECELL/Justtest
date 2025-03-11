import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions"; 
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import LocationMarker from "../../ServiceProvider/components/LocationMarker";
import { CodeSquare } from "lucide-react-native";
import { updateUserLocation } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import useAuthRole from "../../Hook/useAuthRole";

const FetchAddress = ({setIsAuthenticated}) => {
  const [role, setRole] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState({
    name: "Finding your location",
    fullAddress: "Please wait while we locate you...",
  });
  const [isLoading, setIsLoading] = useState(true);
  // Request Location Permission
  const requestPermissionUsingRNPermissions = async () => {
  console.log("Getting permission...");

  try {
    const locationPermission = await request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (locationPermission !== RESULTS.GRANTED) {
      console.log("Location permission denied");
      Alert.alert("Permission Denied", "Enable location access for a better experience.");
      return false;
    }

    if (Platform.OS === "android") {
      const backgroundPermission = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      if (backgroundPermission !== RESULTS.GRANTED) {
        console.log("Background location permission denied");
        Alert.alert(
          "Background Location Required",
          "To get accurate location, allow background location access."
        );
      }
    }

    console.log("Location permission granted");
    return true;
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return false;
  }
};


  // Get User Location
  const sendLocation = async () => {
    console.log("Fetching location...");
    try {
      Geolocation.getCurrentPosition(
        async(position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          console.log("Need to set up address...");
          const result = await dispatch(updateUserLocation({ latitude, longitude }));
          const storedRole = await AsyncStorage.getItem("role");
          console.log("Stored Role is:", storedRole);
          setRole(storedRole);
          console.log("Role is:", role);
        },
        (error) => {
          console.error("Error getting location:", error);
          Alert.alert("Location Error", "Could not fetch location. Please try again.");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } catch (error) {
      console.error("Geolocation error:", error);
    }
  };

  // Handle Permission & Location Fetch
  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestPermissionUsingRNPermissions();
      if (hasPermission) {
        await sendLocation();
      }
      setIsLoading(false);
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (role === "User") {
      navigation.navigate("BottomTabsUser");
    }
    if (role === "Admin") {
      navigation.navigate("AdminBottomTabsUser");
    }
    if (role === "ServiceProvider") {
      navigation.navigate("ProviderBottomTabsUser");
    }
    if (!role) {
    console.warn("Role is still null, waiting...");
      return;
    }
  },[role])

  return (
    <View style={tw`flex-1 bg-gray-100 justify-center items-center px-5`}>
      {/* Location Marker */}
      <LocationMarker />

      {/* Location Info */}
      <Text style={tw`text-lg font-semibold text-gray-800 mt-6`}>{address.name}</Text>
      <Text style={tw`text-sm text-gray-500 text-center mt-2`}>{address.fullAddress}</Text>

      {/* Loading Indicator */}
      {isLoading && <ActivityIndicator size="large" color="#007AFF" style={tw`mt-4`} />}
    </View>
  );
};

export default FetchAddress;
