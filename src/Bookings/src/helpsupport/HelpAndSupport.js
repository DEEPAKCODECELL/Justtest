import React, { useEffect } from "react";
import { Alert, Platform, View,Text } from "react-native";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

const requestLocationPermission = async () => {
   const permission =
     Platform.OS === "android"
       ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
       : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

   const status = await check(permission);
  //onst status = "wow";
  if (status === RESULTS.GRANTED) {
    console.log("Location permission already granted.");
    getCurrentLocation();
  } else {
    //const requestStatus = await request(permission);
    //if (requestStatus === RESULTS.GRANTED) {
      //console.log("Location permission granted.");
      //getCurrentLocation();
    //} else {
      console.log("failed to fetch location")
      //Alert.alert("Permission Denied", "Location access is required.");
    //}
  }
};

 const getCurrentLocation = () => {
   Geolocation.getCurrentPosition(
     (position) => {
       console.log("Location:", position);
     },
     (error) => {
       console.error("Location Error:", error);
     },
     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
   );
 };

const HelpAndSupport = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

    return (
        <View>
            <Text>Able To Fetch Location</Text>
            <Text>Able To Fetch Location</Text>
            <Text>Able To Fetch Location</Text>
            <Text>Able To Fetch Location</Text>
      </View>
  )
};

export default HelpAndSupport;
