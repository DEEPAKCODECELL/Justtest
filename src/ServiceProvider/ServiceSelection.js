import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const categories = {
  popular: [
    { id: "1", name: "Beautician", icon: "💅" },
    { id: "2", name: "Professional Cleaning", icon: "🛏" },
    { id: "3", name: "Bathroom Cleaning Subscription", icon: "⚓" },
  ],
  all: [
    { id: "4", name: "AC Repair & Service" },
    { id: "5", name: "AC Service - Freshers" },
    { id: "6", name: "Beautician - Fresher" },
    { id: "7", name: "Home Deep Cleaning" },
    { id: "8", name: "Sofa & Carpet Cleaning" },
    { id: "9", name: "Pest Control" },
    { id: "10", name: "Electrician" },
    { id: "11", name: "Plumber" },
    { id: "12", name: "Carpenter" },
    { id: "13", name: "Salon for Women" },
    { id: "14", name: "Salon for Men" },
    { id: "15", name: "Massage for Women" },
    { id: "16", name: "Massage for Men" },
    { id: "17", name: "Makeup & Hairstyling" },
    { id: "18", name: "Home Painting" },
    { id: "19", name: "Packers & Movers" },
    { id: "20", name: "Car Cleaning" },
    { id: "21", name: "Laundry & Dry Cleaning" },
  ],
};

export default function ServiceSelectionScreen() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <ScrollView
      style={tw`bg-white h-full px-4 pt-6`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`pb-10`}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Text style={tw`text-xl text-gray-700`}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>
          What work do you do?
        </Text>

        {/* Search Bar */}
        <View
          style={tw`flex-row items-center bg-gray-100 p-3 rounded-lg mb-4 border border-gray-300`}
        >
          <TextInput
            placeholder="Search plumber, electrician etc."
            placeholderTextColor="#888"
            style={tw`flex-1 text-gray-700 text-base`}
          />
        </View>

        {/* Popular Categories */}
        <Text style={tw`text-lg font-semibold text-gray-900 mb-2`}>
          ⚡ Popular Categories
        </Text>
        {categories.popular.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={tw`flex-row items-center py-3 border-b border-gray-200`}
            onPress={() => setSelectedId(item.id)}
          >
            <Text style={tw`text-xl mr-3`}>{item.icon}</Text>
            <Text style={tw`text-base text-gray-800 flex-1`}>{item.name}</Text>
            <View
              style={tw`w-5 h-5 border-2 rounded-full ${
                selectedId === item.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-400"
              }`}
            />
          </TouchableOpacity>
        ))}

        {/* All Categories */}
        <Text style={tw`text-lg font-semibold text-gray-900 mt-4 mb-2`}>
          All Categories
        </Text>
        {categories.all.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={tw`flex-row items-center py-3 border-b border-gray-200`}
            onPress={() => setSelectedId(item.id)}
          >
            <Text style={tw`text-base text-gray-800 flex-1`}>{item.name}</Text>
            <View
              style={tw`w-5 h-5 border-2 rounded-full ${
                selectedId === item.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-400"
              }`}
            />
          </TouchableOpacity>
        ))}

        {/* Continue Button */}
        <TouchableOpacity
          style={tw`mt-6 bg-blue-600 py-3 rounded-lg ${
            selectedId ? "" : "opacity-50"
          }`}
          disabled={!selectedId}
          onPress={() => {
            const selectedService = [
              ...categories.popular,
              ...categories.all,
            ].find((item) => item.id === selectedId)?.name;
            navigation.navigate("WorkDetails", { selectedService });
          }}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}