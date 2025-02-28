import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft, Clock } from "lucide-react-native";
import tw from "twrnc";

const CartHeader = ({ savedAmount }) => {
  return (
    <View style={tw`px-4 py-3 bg-white border-b border-gray-200`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity style={tw`p-2`}>
          <ArrowLeft size={20} />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold ml-2`}>Your Cart</Text>
      </View>

      <View style={tw`bg-emerald-50 rounded-lg p-3 mb-3`}>
        <Text style={tw`text-emerald-600 font-medium`}>
          SAVED ₹{savedAmount}
        </Text>
        <Text style={tw`text-emerald-600 text-sm`}>
          Free Delivery unlocked, apply coupon to avail
        </Text>
      </View>

      <View style={tw`flex-row items-center text-gray-600`}>
        <Clock size={20} color="#4B5563" />
        <Text style={tw`ml-2 text-gray-600`}>Delivery in 12 mins</Text>
      </View>
    </View>
  );
};

export default CartHeader;