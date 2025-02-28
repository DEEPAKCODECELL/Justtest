import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";

const CartItem = ({ image, name, description, price, originalPrice, quantity, onIncrement, onDecrement }) => {
  return (
    <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
      <Image source={{ uri: image }} style={tw`w-16 h-16 rounded-md`} />

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`font-medium text-gray-900`}>{name}</Text>
        <Text style={tw`text-sm text-gray-500`}>{description}</Text>

        <View style={tw`flex-row items-center mt-2`}>
          <Text style={tw`font-medium text-black`}>₹{price}</Text>
          {originalPrice && <Text style={tw`ml-2 text-sm text-gray-400 line-through`}>₹{originalPrice}</Text>}
        </View>
      </View>

      <View style={tw`flex-row items-center`}>
        <TouchableOpacity onPress={onDecrement} style={tw`w-8 h-8 rounded-full border border-gray-300 items-center justify-center`}>
          <Text style={tw`text-gray-600 text-lg`}>-</Text>
        </TouchableOpacity>

        <Text style={tw`w-8 text-center text-lg`}>{quantity}</Text>

        <TouchableOpacity onPress={onIncrement} style={tw`w-8 h-8 rounded-full border border-gray-300 items-center justify-center`}>
          <Text style={tw`text-gray-600 text-lg`}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;