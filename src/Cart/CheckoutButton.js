import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

const CheckoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`w-full py-4 px-6 bg-pink-500 rounded-lg`}>
      <Text style={tw`text-white text-center font-medium text-lg`}>Click to Pay</Text>
    </TouchableOpacity>
  );
};

export default CheckoutButton;