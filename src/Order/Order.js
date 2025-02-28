import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft, Check, MessageSquare, Star } from "lucide-react-native";
import tw from "twrnc";
import OrderItem from "./OrderItem";

const Order = () => {
  const orderItems = [
    {
      name: "Lay's Potato Chips - Sizzling Hot Spicy Flavor",
      quantity: 48,
      unit: "g",
      price: 20,
      image: "https://placehold.co/100x100/png",
    },
    {
      name: "Tomato Local",
      quantity: 500,
      unit: "g",
      price: 14,
      image: "https://placehold.co/100x100/png",
    },
  ];

  return (
    <ScrollView style={tw`max-w-md mx-auto bg-white min-h-screen p-4`}>
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <TouchableOpacity style={tw`p-2`}>
          <ArrowLeft size={20} />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-sm text-gray-500`}>Order #ICC3B8HVS8549</Text>
          <Text style={tw`text-sm`}>{orderItems.length} items</Text>
        </View>
        <TouchableOpacity style={tw`flex-row items-center gap-1 text-pink-500`}>
          <MessageSquare size={16} />
          <Text style={tw`text-sm`}>Get Help</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center gap-1 mb-4`}>
        <Text style={tw`text-sm`}>You rated</Text>
        <View style={tw`flex-row gap-1`}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} color="#ff385c" fill="#ff385c" />
          ))}
        </View>
      </View>

      <View style={tw`flex-row items-center gap-2 mb-6`}>
        <View style={tw`w-6 h-6 rounded-full bg-green-100 items-center justify-center`}>
          <Check size={16} color="green" />
        </View>
        <Text style={tw`font-medium`}>Delivered</Text>
        <Text style={tw`text-xs text-purple-600 ml-auto`}>Arrived in 19 MINS</Text>
      </View>

      {orderItems.map((item, index) => (
        <OrderItem key={index} {...item} />
      ))}

      <View style={tw`mt-6 p-4 bg-gray-50 rounded-lg`}>
        <Text style={tw`text-pink-500 text-sm`}>Exchange</Text>
        <Text style={tw`text-xs text-gray-500`}>★ Eligible for Exchange till Feb 18</Text>
      </View>

      <TouchableOpacity style={tw`w-full bg-pink-500 py-3 rounded-lg mt-6`}>
        <Text style={tw`text-center text-white font-medium`}>Order Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Order;