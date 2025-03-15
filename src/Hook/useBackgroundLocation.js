// import { useState, useEffect } from 'react';
// import Geolocation from '@react-native-community/geolocation';
// import ForegroundService from 'react-native-foreground-service';
// import { Platform, PermissionsAndroid } from 'react-native';

// const useBackgroundLocation = ({
//   updateInterval = 5000,
//   enableHighAccuracy = true,
//   distanceFilter = 10,
//   stopOnAppBackground = false,
// }) => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [watchId, setWatchId] = useState(null);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       Geolocation.requestAuthorization('always');
//       return true;
//     }
    
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Background Location Permission",
//             message: "We need access to your location to track your position in the background",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//           }
//         );
        
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//   };

//   const startForegroundService = async () => {
//     if (Platform.OS !== 'android') return true;
    
//     // Define the service notification channel
//     const channelConfig = {
//       id: 'locationChannel',
//       name: 'Location Tracking Channel',
//       description: 'Channel for Location Tracking',
//       enableVibration: false,
//       importance: 2, // IMPORTANCE_LOW
//     };
    
//     // Create notification channel
//     await ForegroundService.createNotificationChannel(channelConfig);
    
//     // Start foreground service
//     await ForegroundService.startService({
//       id: 1,
//       title: 'Location Tracking',
//       message: 'Your location is being tracked',
//       icon: 'ic_launcher',
//       importance: 1, // FOREGROUND_SERVICE_TYPE_LOCATION
//       button: false,
//       buttonText: '',
//       button2: false,
//       button2Text: '',
//       contentText: 'Collecting location data in the background',
//       vibration: false,
//       visibility: 'public',
//       number: '',
//       colorized: false,
//     });
    
//     return true;
//   };

//   const startTracking = async () => {
//     try {
//       const hasPermission = await requestLocationPermission();
      
//       if (!hasPermission) {
//         setError('Location permission denied');
//         return;
//       }
      
//       const serviceStarted = await startForegroundService();
      
//       if (!serviceStarted && Platform.OS === 'android') {
//         setError('Failed to start foreground service');
//         return;
//       }
      
//       // Get initial location
//       Geolocation.getCurrentPosition(
//         (position) => {
//           setLocation(position.coords);
//         },
//         (err) => {
//           setError(err.message);
//         },
//         { enableHighAccuracy, timeout: 15000, maximumAge: 10000 }
//       );
      
//       // Start watching position
//       const id = Geolocation.watchPosition(
//         (position) => {
//           setLocation(position.coords);
//           setError(null);
//         },
//         (err) => {
//           setError(err.message);
//         },
//         { 
//           enableHighAccuracy,
//           distanceFilter,
//           interval: updateInterval, 
//           fastestInterval: updateInterval / 2,
//           forceRequestLocation: true,
//           showLocationDialog: true,
//           useSignificantChanges: false
//         }
//       );
      
//       setWatchId(id);
//       setIsTracking(true);
      
//       return id;
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const stopTracking = () => {
//     if (watchId !== null) {
//       Geolocation.clearWatch(watchId);
//       setWatchId(null);
//       setIsTracking(false);
      
//       if (Platform.OS === 'android') {
//         ForegroundService.stopService();
//       }
//     }
//   };

//   useEffect(() => {
//     // Clean up on unmount
//     return () => {
//       if (watchId !== null) {
//         stopTracking();
//       }
//     };
//   }, [watchId]);

//   return {
//     location,
//     error,
//     isTracking,
//     startTracking,
//     stopTracking
//   };
// };

// export default useBackgroundLocation;

// import { useState, useEffect, useRef } from "react";
// import { 
//   Platform, 
//   PermissionsAndroid, 
//   Linking, 
//   Alert, 
//   ToastAndroid 
// } from "react-native";
// import Geolocation, { GeoPosition } from "react-native-geolocation-service";
// import VIForegroundService from "@voximplant/react-native-foreground-service";
// import appConfig from "../../app.json"; // Ensure this is correctly imported

export const useBackgroundLocation = () => {
  // const [forceLocation, setForceLocation] = useState(true);
  // const [highAccuracy, setHighAccuracy] = useState(true);
  // const [locationDialog, setLocationDialog] = useState(true);
  // const [significantChanges, setSignificantChanges] = useState(false);
  // const [observing, setObserving] = useState(false);
  // const [foregroundService, setForegroundService] = useState(false);
  // const [useLocationManager, setUseLocationManager] = useState(false);
  // const [location, setLocation] = useState(null);

  // const watchId = useRef(null);

  // const stopLocationUpdates = () => {
  //   if (Platform.OS === "android") {
  //     VIForegroundService.getInstance()
  //       .stopService()
  //       .catch((err) => console.error("Foreground service stop error:", err));
  //   }

  //   if (watchId.current !== null) {
  //     Geolocation.clearWatch(watchId.current);
  //     watchId.current = null;
  //     setObserving(false);
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     stopLocationUpdates();
  //   };
  // }, []);

  // const hasPermissionIOS = async () => {
  //   const openSetting = () => {
  //     Linking.openSettings().catch(() => {
  //       Alert.alert("Unable to open settings");
  //     });
  //   };
  //   const status = await Geolocation.requestAuthorization("whenInUse");

  //   if (status === "granted") return true;

  //   if (status === "denied") {
  //     Alert.alert("Location permission denied");
  //   }

  //   if (status === "disabled") {
  //     Alert.alert(
  //       `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
  //       "",
  //       [
  //         { text: "Go to Settings", onPress: openSetting },
  //         { text: "Don't Use Location", onPress: () => {} },
  //       ]
  //     );
  //   }

  //   return false;
  // };

  // const hasLocationPermission = async () => {
  //   if (Platform.OS === "ios") {
  //     return await hasPermissionIOS();
  //   }

  //   if (Platform.OS === "android" && Platform.Version < 23) {
  //     return true;
  //   }

  //   const hasPermission = await PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //   );

  //   if (hasPermission) return true;

  //   const status = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //   );

  //   if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //     return true;
  //   }

  //   if (status === PermissionsAndroid.RESULTS.DENIED) {
  //     ToastAndroid.show("Location permission denied by user.", ToastAndroid.LONG);
  //   } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //     ToastAndroid.show("Location permission revoked by user.", ToastAndroid.LONG);
  //   }

  //   return false;
  // };

  // const getLocation = async () => {
  //   const hasPermission = await hasLocationPermission();

  //   if (!hasPermission) return;

  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       setLocation(position);
  //       console.log("Current Location:", position);
  //     },
  //     (error) => {
  //       Alert.alert(`Error: ${error.code}`, error.message);
  //       setLocation(null);
  //       console.error("Location Error:", error);
  //     },
  //     {
  //       accuracy: { android: "high", ios: "best" },
  //       enableHighAccuracy: highAccuracy,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //       distanceFilter: 0,
  //       forceRequestLocation: forceLocation,
  //       forceLocationManager: useLocationManager,
  //       showLocationDialog: locationDialog,
  //     }
  //   );
  // };

  // const getLocationUpdates = async () => {
  //   const hasPermission = await hasLocationPermission();

  //   if (!hasPermission) return;

  //   if (Platform.OS === "android" && foregroundService) {
  //     await startForegroundService();
  //   }

  //   setObserving(true);

  //   watchId.current = Geolocation.watchPosition(
  //     (position) => {
  //       setLocation(position);
  //       console.log("Location Update:", position);
  //     },
  //     (error) => {
  //       setLocation(null);
  //       console.error("Location Update Error:", error);
  //     },
  //     {
  //       accuracy: { android: "high", ios: "best" },
  //       enableHighAccuracy: highAccuracy,
  //       distanceFilter: 0,
  //       interval: 5000,
  //       fastestInterval: 2000,
  //       forceRequestLocation: forceLocation,
  //       forceLocationManager: useLocationManager,
  //       showLocationDialog: locationDialog,
  //       useSignificantChanges: significantChanges,
  //     }
  //   );
  // };

  // const startForegroundService = async () => {
  //   if (Platform.Version >= 26) {
  //     await VIForegroundService.getInstance().createNotificationChannel({
  //       id: "locationChannel",
  //       name: "Location Tracking Channel",
  //       description: "Tracks location of user",
  //       enableVibration: false,
  //     });
  //   }

  //   return VIForegroundService.getInstance().startService({
  //     channelId: "locationChannel",
  //     id: 420,
  //     title: appConfig.displayName,
  //     text: "Tracking location updates",
  //     icon: "ic_launcher",
  //   });
  // };

  // return {
  //   location,
  //   getLocation,
  //   getLocationUpdates,
  //   stopLocationUpdates,
  //   observing,
  //   setForceLocation,
  //   setHighAccuracy,
  //   setLocationDialog,
  //   setSignificantChanges,
  //   setForegroundService,
  //   setUseLocationManager,
  // };

  return {
    loading:true
  }
};
