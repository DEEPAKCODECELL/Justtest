import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "../../tailwind";


const slots = [
  { id: "1", duration: "60 mins", price: 174, oldPrice: 200, discount: "13%", available: false },
  { id: "2", duration: "90 mins", price: 258, oldPrice: 300, discount: "14%", available: false },
    { id: "3", duration: "120 mins", price: 340, oldPrice: 400, discount: "15%", available: false },
    { id: "4", duration: "120 mins", price: 340, oldPrice: 400, discount: "15%", available: false },
    { id: "5", duration: "120 mins", price: 340, oldPrice: 400, discount: "15%", available: false },
  { id: "6", duration: "120 mins", price: 340, oldPrice: 400, discount: "15%", available: false },
];

const AvailableSlots = () => {
    return (
      <View style={tw`p-5`}>
                <Text style={tw`text-lg font-bold text-gray-700`}>Available Slots</Text>
                <View style={tw`py-2`}>
      <FlatList
        data={slots}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw``}
        renderItem={({ item }) => (
          <View style={tw`bg-white p-4 rounded-xl mr-3 w-32 items-center shadow-md`}>
            {/* Discount Badge */}
            <View style={tw`absolute top-2 left-2 bg-gray-200 px-2 py-1 rounded-md`}>
              <Text style={tw`text-xs font-bold text-gray-600`}>{item.discount} OFF</Text>
            </View>

            {/* Slot Duration */}
            <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>{item.duration}</Text>

            {/* Price Section */}
            <View style={tw`flex-row items-center mt-1`}>
              <Text style={tw`text-sm font-bold text-red-600`}>₹{item.price}</Text>
              <Text style={tw`text-xs text-gray-500 line-through ml-2`}>₹{item.oldPrice}</Text>
            </View>

            {/* Notify Button */}
            <TouchableOpacity style={tw`mt-3 bg-pink-700 dark:bg-pink-500 px-4 py-2 rounded-full`}>
              <Text style={tw`text-xs font-bold text-white`}>Notify me</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
      </View>
  );
};

export default AvailableSlots;
