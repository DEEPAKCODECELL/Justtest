import React from "react";
import { View, Text } from "react-native";
import { Home } from "lucide-react-native";
import tw from "twrnc";

const DeliveryAddress = ({ address }) => {
  return (
    <View style={tw`px-4 py-3 bg-gray-50 flex-row items-center`}>
      <Home size={20} color="#4B5563" />
      <View style={tw`ml-2`}>
        <Text style={tw`text-sm font-medium`}>Delivering to Home</Text>
        <Text style={tw`text-xs text-gray-500`}>{address}</Text>
      </View>
    </View>
  );
};

export default DeliveryAddress;