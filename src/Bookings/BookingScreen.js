import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import tw from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/slices/bookingSlice";
import moment from "moment";
import BookingDetailsScreen from "./BookingDetailsScreen";

const transformBookingData = (booking) => {
  const createdAt = moment(booking.createdAt); // Convert to moment object

  return {
    id: booking._id,
    date: createdAt.format("DD"), // Extract day (e.g., "06")
    day: createdAt.format("dddd"), // Full day name (e.g., "Thursday")
    month: createdAt.format("MMM"), // Short month (e.g., "Mar")
    year: createdAt.format("YYYY"), // Full year (e.g., "2025")
    time: createdAt.format("hh:mm A"), // Extract time (e.g., "06:03 AM")
    duration: "60", // Default duration (update as per `bookingSlot_id`)
    status: booking.status, // Booking status
    fullDetails: booking, // Store full booking details for modal
  };
};

const BookingCard = ({ date, day, month, year, time, duration, status, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`bg-white rounded-xl p-4 shadow-sm mb-4 flex-row items-center`}>
      {/* Date Section */}
      <View style={tw`bg-gray-100 p-3 rounded-lg items-center justify-center w-14`}>
        <Text style={tw`text-lg font-bold text-gray-800`}>{date}</Text>
        <Text style={tw`text-xs text-gray-600 uppercase`}>{month}</Text>
      </View>

      {/* Booking Info */}
      <View style={tw`ml-3 flex-1`}>
        <Text style={tw`text-sm font-semibold text-gray-900`}>
          {day}, {date} {month}, {year}
        </Text>
        <Text style={tw`text-gray-600 text-xs`}>{time} • {duration} mins</Text>
      </View>

      {/* Status Badge */}
      <View
        style={tw`px-2 py-1 rounded-full ${
          status === "cancelled" ? "bg-red-100" : "bg-green-100"
        }`}
      >
        <Text
          style={tw`text-xs font-semibold ${
            status === "cancelled" ? "text-red-600" : "text-green-600"
          }`}
        >
          {status.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const BookingScreen = () => {
  const dispatch = useDispatch();
  const allBookings = useSelector((state) => state.booking.allBookings);
  const bookings = allBookings?.bookings || [];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    console.log("Fetching all bookings...");
    if (bookings.length === 0) {
      dispatch(getAllBookings());
    }
  }, []);

  const handlePress = (booking) => {
    setSelectedBooking(booking.fullDetails);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <BookingCard {...transformBookingData(item)} onPress={() => handlePress(transformBookingData(item))} />
  );

  return (
    <View style={tw`flex-1 bg-gray-100 px-4 py-6`}>
      {/* Header */}
      <TouchableOpacity style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold text-gray-900`}>Your bookings</Text>
      </TouchableOpacity>

      {/* Booking List */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Booking Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-white p-4`}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={tw`absolute top-4 right-4 bg-gray-200 p-2 rounded-full`}
          >
            <Text style={tw`text-lg font-bold`}>✖</Text>
          </TouchableOpacity>

          {selectedBooking ? (
            <BookingDetailsScreen bookingId={selectedBooking._id} />
          ) : (
            <ActivityIndicator size="large" color="blue" />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default BookingScreen;
