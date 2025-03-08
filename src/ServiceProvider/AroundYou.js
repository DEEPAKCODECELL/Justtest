import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { UserIcon } from "lucide-react-native";

const AroundYou = () => {
  const [activeTab, setActiveTab] = useState("around");
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`px-4 pt-4 pb-3 flex-row justify-between items-center`}>
        <Text style={tw`text-2xl font-bold`}>UC Around You</Text>
        <View style={tw`flex-row space-x-2`}>
          <TouchableOpacity style={tw`rounded-full bg-blue-50 px-3 py-1`}>
            <Text style={tw`text-blue-600 font-medium`}>En</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`rounded-full bg-blue-50 p-2`}>
            <Text style={tw`text-blue-600 font-medium`}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Container */}
      <View style={tw`relative w-full h-72 bg-gray-200`}>
        <Image source={require("./map.jpeg")} style={tw`w-full h-full`} />

        {/* Job Info Card */}
        <View
          style={tw`absolute top-6 left-4 right-4 bg-white rounded-lg p-4 shadow-lg`}
        >
          <Text style={tw`text-lg font-medium mb-3`}>No jobs around you</Text>

          <View style={tw`flex-row items-center mb-2`}>
            <Text style={tw`w-8 text-center`}>💼</Text>
            <Text style={tw`text-gray-800`}>0 jobs</Text>
          </View>

          <View style={tw`flex-row items-center mb-3`}>
            <Text style={tw`w-8 text-center`}>💰</Text>
            <Text style={tw`text-gray-800`}>Worth ₹0</Text>
          </View>

          <View style={tw`flex-row items-center mb-3`}>
            <Text style={tw`w-8 text-center`}>⏳</Text>
            <Text>
              <Text style={tw`text-red-400`}>Business closed</Text> • Opens at 9
              AM
            </Text>
          </View>

          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`w-8 text-center text-blue-500`}>📍</Text>
            <Text style={tw`text-blue-500 font-medium`}>See jobs near me</Text>
          </TouchableOpacity>
        </View>

        {/* Explore Map Button */}
        <View
          style={tw`absolute bottom-4 left-0 right-0 flex items-center justify-center`}
        >
          <TouchableOpacity
            style={tw`bg-blue-500 text-white rounded-full px-4 py-2 flex-row items-center shadow-md`}
          >
            <Text style={tw`mr-2 text-white`}>📍</Text>
            <Text style={tw`font-medium text-white`}>Explore on Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Friends Section */}
      <View style={tw`px-4 pt-6 pb-20`}>
        <Text style={tw`text-xl font-semibold mb-1`}>
          See your friends{" "}
          <Text style={tw`font-normal text-gray-600`}>working with us</Text>
        </Text>
        <Text style={tw`text-gray-500 text-sm mb-3`}>
          Give contact access to see your friends
        </Text>

        <TouchableOpacity
          style={tw`bg-blue-500 text-white rounded-full py-2 px-4 flex-row items-center`}
        >
          <Text style={tw`mr-2 text-white`}>👥</Text>
          <Text style={tw`font-medium text-white`}>Show my friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AroundYou;
