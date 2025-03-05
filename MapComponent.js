import React, { useEffect, useRef, useState } from "react";
import polyline from "@mapbox/polyline";
import { Satellite } from "lucide-react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import tw from "./tailwind";
import useWebSocket from "./src/Hook/GetRealtimeLocation";
import useFetchLocationForProvider from "./src/Hook/UpdareRealTimeForProvider";


// **Initial Region (Bangalore, India)**
const INITIAL_REGION = {
  latitude: 12.9716,
  longitude: 77.5946,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MAX_DISTANCE_KM = 5; // Maximum user scroll radius

const MapComponent = () => {
  const { location, isLoading, error } = useFetchLocationForProvider(true);
  const userlatlong = useSelector((state) => state.user?.user?.data?.address?.location?.coordinates || []);
  const userid = useSelector((state) => state.user?.user?.data?._id);
  //const statedestination = useSelector((state) => state.user?.desctination); // real data
  const statedestination={latitude:12.927663683966943, longitude:77.6090658826203}
  const [origin, setOrigin] = useState({latitude:userlatlong[0],longitude:userlatlong[1],latitudeDelta: 0.05,
  longitudeDelta: 0.05,});
  const [destination, setDestination] = useState({latitude:statedestination.latitude,longitude:statedestination.longitude,latitudeDelta: 0.05,
  longitudeDelta: 0.05,});
  console.log("userId", userid);
  const [userId, setUserId] = useState(userid);
  console.log("check userlatlong", userlatlong,destination);
  const mapRef = useRef(null);
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]); // Route line

  // WebSocket: Listen for real-time provider location updates
  const socket = useWebSocket("ws://192.168.179.18:4000", userId, (location) => {
    console.log("location check", location);
    let newLatitude = location.latitude;
    let newLongitude = location.longitude;
    console.log("new check",newLatitude,newLongitude)
    setDestination((prevLocation) => ({
      ...prevLocation,
      latitude: newLatitude,
      longitude: newLongitude
    }))
  });

  console.log(socket)

  // Smooth Animated Map Movement
  const animatedLat = useSharedValue(origin.latitude);
  const animatedLon = useSharedValue(origin.longitude);

  useEffect(() => {
    animatedLat.value = withTiming(origin.latitude, { duration: 500 });
    animatedLon.value = withTiming(origin.longitude, { duration: 500 });
    fetchRoute(origin, destination);
  }, [origin, destination]);
  
  useEffect(() => {
  if (location) {
    console.log("Provider's Live Location:", location);
    setOrigin(location); // Update provider's location on the map
  }
}, [location]);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedLat.value }, { translateY: animatedLon.value }],
  }));

  // Calculate distance between two points (Haversine formula)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in KM
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in KM
  };

  // Handle region change (Prevent excessive scrolling)
  const handleRegionChangeComplete = (newRegion) => {
    const distance = getDistance(
      origin.latitude,
      origin.longitude,
      newRegion.latitude,
      newRegion.longitude
    );

    if (distance > MAX_DISTANCE_KM) {
      setIsOutOfBounds(true);
      setOrigin(origin); // Reset map to provider location
    } else {
      setIsOutOfBounds(false);
    }
  };

  // Re-center the map
  const recenterMap = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...destination,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setIsOutOfBounds(false);
    }
  };

  // Fetch route (Mock function)
  const fetchRoute = async (start, end) => {
  try {
    if (!start || !end) return;

    const API_KEY = "AIzaSyBklNOyD5kNf9N6fo3NbLnqVBHkV_o90E4"; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("get data from google",response);

    if (data.routes.length) {
      const points = data.routes[0].overview_polyline.points;
      const routeCoordinates = decodePolyline(points);
      setRouteCoords(routeCoordinates);
    }
  } catch (error) {
    console.error("Error fetching route:", error);
  }
};

// Decode polyline into array of coordinates
const decodePolyline = (encoded) => {
  const points = polyline.decode(encoded);
  return points.map(([latitude, longitude]) => ({ latitude, longitude }));
};

  return (
    <View style={tw`h-1/2 w-full mt-4`}>
      <Text>Check Check</Text>
      {false&&origin&&<MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={tw`h-100 w-full`}
        initialRegion={origin}
        region={origin}
        onRegionChangeComplete={handleRegionChangeComplete}
        maxZoomLevel={16} // Prevent extreme zoom-in
      >
        {/* Provider Marker */}
        {origin&&<Marker coordinate={origin} title="You" pinColor="red" />}

        {/* Destination Marker */}
        {destination&&<Marker coordinate={destination} title="Destination" pinColor="green" />}

        {/* Route Line */}
        { (destination && origin &&
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="black" />
        )}
      </MapView>}

      {/* Re-center Button */}
      {isOutOfBounds && (
        <TouchableOpacity
          onPress={recenterMap}
          style={tw`absolute bottom-10 right-5 bg-white p-3 rounded-xl shadow-lg`}
        >
          <Text style={tw`text-black font-semibold`}>Re-center</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Custom Uber-like Map Theme (Dark Roads, Light Background)
const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#F5F5F5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#F5F5F5" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#C9C9C9" }] },
];

export default MapComponent;
