import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Star, Clipboard, DollarSign } from "lucide-react-native";
const dummyProviderStats = {
  "67a7990178809143300087b9": {
    rating: 4.8,
    totalBookings: 120,
    reviews: 45,
    activeSince: "2023-08-12",
  },
  "67b1dd7d74cac7b6b9d84083": {
    rating: 4.5,
    totalBookings: 98,
    reviews: 30,
    activeSince: "2023-06-20",
  },
};
const dummyBookings = {
  "67b1dd2e74cac7b6b9d8407d": [
    { id: "B1", user: "John Doe", time: "10:30 AM", price: 300 },
    { id: "B2", user: "Jane Smith", time: "12:00 PM", price: 450 },
  ],
  "67b1dd7d74cac7b6b9d84083": [
    { id: "B3", user: "Mark Henry", time: "2:00 PM", price: 500 },
    { id: "B4", user: "Lucy Adams", time: "4:00 PM", price: 350 },
  ],
};

const dummyPayments = [
  {
    id: "67a7990178809143300087b9",
    name: "Suraj Bhankar",
    currentWeek: 5200,  // Current week earnings
    monthlyIncome: 21000, // Monthly income
    weeklyPayments: [1000, 1200, 1500, 800, 700, 500, 500], // Last 7 days earnings
  },
  {
    id: "67b1dd7d74cac7b6b9d84083",
    name: "Kumar Vivek",
    currentWeek: 7000,
    monthlyIncome: 28000,
    weeklyPayments: [2000, 1500, 1800, 1300, 1000, 1200, 900],
  },
];


const ProviderDetails = ({ route, navigation }) => {
    const { providerId } = route.params;
    const[provider, setProvider] = useState(dummyPayments.find((p) => p.id === providerId));    
  const bookings = dummyBookings[providerId] || [];
  const stats = dummyProviderStats[providerId];

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      {/* Provider Name */}
      <Text style={tw`text-2xl font-bold mb-2`}>{provider?.name}</Text>

      {/* Stats Cards */}
      <View style={tw`flex-row justify-between mb-4`}>
        <StatCard icon={<Star size={24} color="gold" />} label="Rating" value={stats?.rating} />
        <StatCard icon={<Clipboard size={24} color="blue" />} label="Total Bookings" value={stats?.totalBookings} />
        <StatCard icon={<DollarSign size={24} color="green" />} label="Reviews" value={stats?.reviews} />
      </View>

      {/* Payment Details */}
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Payments</Text>
        <Text>Current Week: ₹{provider?.currentWeek}</Text>
        <Text>Monthly Income: ₹{provider?.monthlyIncome}</Text>
      </View>

      {/* Today's Bookings */}
      <Text style={tw`text-lg font-bold mb-2`}>Today's Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-white p-3 rounded-lg shadow-sm mb-2`}>
            <Text>User: {item?.user}</Text>
            <Text>Time: {item?.time}</Text>
            <Text>Price: ₹{item?.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const StatCard = ({ icon, label, value, onPress }) => {
  return (
    <TouchableOpacity
      style={tw`p-4 bg-white rounded-lg flex-1 items-center shadow-sm`}
      onPress={onPress}
    >
      <View style={tw`mb-2`}>{icon}</View>
      <Text style={tw`text-xl font-semibold`}>{value}</Text>
      <Text style={tw`text-sm text-gray-500`}>{label}</Text>
    </TouchableOpacity>
  );
};
export default ProviderDetails;
