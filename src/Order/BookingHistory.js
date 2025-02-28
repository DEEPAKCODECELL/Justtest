import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Calendar, Clock } from "lucide-react-native";
import tw from "twrnc";

const mockBookings = [
  {
    id: 1,
    date: "2024-02-25",
    time: "14:30",
    items: [
      { id: 1, name: "Lay's Potato Chips", quantity: 2, price: 20 },
      { id: 2, name: "Tomato Local", quantity: 1, price: 14 },
    ],
    total: 54,
    status: "delivered",
  },
  {
    id: 2,
    date: "2024-02-24",
    time: "10:15",
    items: [
      { id: 3, name: "Kurkure Masala Munch", quantity: 3, price: 20 },
      { id: 4, name: "Onion", quantity: 2, price: 41 },
    ],
    total: 142,
    status: "delivered",
  },
];

const BookingHistory = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`w-full p-4`}>
        <View style={tw`flex-row items-center mb-6`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={20} />
          </TouchableOpacity>
          <Text style={tw`text-lg font-semibold ml-2`}>Order History</Text>
        </View>

        {mockBookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            style={tw`mb-6 p-4 border rounded-lg bg-gray-50`}
            onPress={() => navigation.navigate("OrderDetails", { order: booking })}
          >
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <View>
                <Text style={tw`text-sm text-gray-500`}>Order #{booking.id}</Text>
                <Text style={tw`text-sm`}>{booking.items.length} items</Text>
              </View>
              <Text
                style={tw`px-2 py-1 rounded-full text-xs ${
                  booking.status === "delivered"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Text>
            </View>

            <View style={tw`flex-row items-center gap-2 mb-2`}>
              <Calendar size={16} color="gray" />
              <Text style={tw`text-sm text-gray-600`}>
                {new Date(booking.date).toLocaleDateString()}
              </Text>
              <Clock size={16} color="gray" />
              <Text style={tw`text-sm text-gray-600`}>{booking.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default BookingHistory;