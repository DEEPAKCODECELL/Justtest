import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ArrowLeft, Check, MessageSquare, Star } from "lucide-react-native";
import tw from "twrnc";
import OrderItem from "./OrderItem";

const OrderDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { order
    } = route.params;

  return (
    <ScrollView style={tw`w-full bg-white min-h-screen px-4 py-6`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
          <ArrowLeft size={20} />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-sm text-gray-500`}>Order #{order.id}</Text>
          <Text style={tw`text-sm`}>{order.items.length} items</Text>
        </View>
        <TouchableOpacity style={tw`flex-row items-center gap-1`}>
          <MessageSquare size={16} color="gray" />
          <Text style={tw`text-sm text-pink-500`}>Get Help</Text>
        </TouchableOpacity>
      </View>

      {/* Rating */}
      <View style={tw`flex-row items-center gap-1 mb-4`}>
        <Text style={tw`text-sm`}>You rated</Text>
        <View style={tw`flex-row gap-1`}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} color="#ff385c" fill="#ff385c" />
          ))}
        </View>
      </View>

      {/* Delivery Status */}
      <View style={tw`flex-row items-center gap-2 mb-6`}>
        <View style={tw`w-6 h-6 rounded-full bg-green-100 items-center justify-center`}>
          <Check size={16} color="green" />
        </View>
        <Text style={tw`font-medium`}>Delivered</Text>
      </View>

      {/* Order Items List */}
      {order.items.map((item, index) => (
        <OrderItem key={index} {...item} />
      ))}

      {/* Order Again Button */}
      <TouchableOpacity style={tw`w-full bg-pink-500 py-3 rounded-lg mt-6`}>
        <Text style={tw`text-center text-white font-medium`}>Order Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderDetails;