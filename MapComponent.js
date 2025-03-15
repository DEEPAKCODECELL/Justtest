import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { LocateFixed } from "lucide-react-native";
import { decode } from "@mapbox/polyline";
import tw from "./tailwind";
import { MapPin } from "lucide-react-native";
import { useRoute } from "@react-navigation/native";
import BookingDetails from "./src/Bookings/BookingDetailsScreen";
import LoadingBar from "./src/ServiceProvider/components/LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { getFullBookingDetails } from "./src/redux/slices/bookingSlice";
import OrderHeader from "./src/ServiceProvider/components/OrderHeader";

const MapComponent = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const lastRegion = useRef(null);

  const { BookingId } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);

  // Define start and end points
  const startLocation = {
    latitude: 12.92671729840564,
    longitude: 77.61535316912814,
  };

  const endLocation = {
    latitude: 12.937451991198246,
    longitude: 77.60993546727666,
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await dispatch(getFullBookingDetails({ BookingId }));
        if (response.payload) {
          console.log("setBookingDetails depavb", response.payload.data)
          setBookingDetails(response.payload.data);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, [BookingId]);

  useEffect(() => {
    const fetchRoute = async () => {
      setIsLoading(true);
      const apiKey = "AIzaSyBklNOyD5kNf9N6fo3NbLnqVBHkV_o90E4";
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${endLocation.latitude},${endLocation.longitude}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes.length) {
          const points = data.routes[0].overview_polyline.points;
          const decodedCoords = decode(points).map(([lat, lng]) => ({
            latitude: lat,
            longitude: lng,
          }));

          setRouteCoords(decodedCoords);
          setDistance(data.routes[0].legs[0].distance.text);
          setDuration(data.routes[0].legs[0].duration.text);

          setTimeout(() => {
            mapRef.current?.fitToCoordinates(
              [startLocation, endLocation, ...decodedCoords],
              {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              }
            );
          }, 500);
          setIsMapReady(true);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
      setIsLoading(false);
    };

    fetchRoute();
  }, []);

  const recenterMap = () => {
    mapRef.current?.fitToCoordinates([startLocation, endLocation, ...routeCoords], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  if (isLoading) {
    return <LoadingBar loading={isLoading} />;
  }

  return (
    <View style={tw`absolute top-0 left-0 w-full h-full bg-black opacity-100`}>
      {/* Render only if booking details are available */}
      {bookingDetails && bookingDetails.length > 0 && (
        <OrderHeader
          distance={distance}
          duration={duration}
          address={bookingDetails[0]?.address || "Unknown Address"}
        />
      )}

      {/* MapView */}
      {isMapReady && (
        <MapView ref={mapRef} style={tw`flex-1 h-1/2 w-full`}>
          <Marker coordinate={startLocation} description="Origin">
            <MapPin size={32} color="blue" />
          </Marker>
          <Marker coordinate={endLocation} description="Destination">
            <MapPin size={32} color="hotpink" />
          </Marker>
          {routeCoords.length > 0 && (
            <Polyline coordinates={routeCoords} strokeColor="hotpink" strokeWidth={4} />
          )}
        </MapView>
      )}

      {/* Recenter Button */}
      <TouchableOpacity
        onPress={recenterMap}
        style={tw`absolute bottom-10 right-5 bg-white p-3 rounded-full shadow-lg`}
      >
        <LocateFixed size={24} color="black" />
      </TouchableOpacity>

      {/* Booking Details */}
      <View style={tw`h-1/2 w-full`}>
        {bookingDetails && bookingDetails.length > 0 && (
          <BookingDetails bookingData={bookingDetails} />
        )}
      </View>
    </View>
  );
};

export default MapComponent;
