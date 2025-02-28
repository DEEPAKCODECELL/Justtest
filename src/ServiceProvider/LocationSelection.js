import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"; // Tailwind CSS for React Native

const cities = [
  "Munnar",
  "Alwar+Rewari",
  "Warangal",
  "Jhajjar",
  "Raipur",
  "Nadia District",
  "Hoshiarpur",
  "Gurdaspur",
  "Etawah",
  "Sonipat",
];

export default function LocationSelectionScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  // Filter cities based on search input
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

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
          Where do you live?
        </Text>

        {/* Search Input */}
        <View
          style={tw`flex-row items-center bg-gray-100 p-3 rounded-lg mb-4 border border-gray-300`}
        >
          <TextInput
            placeholder="Search your city"
            placeholderTextColor="#888"
            style={tw`flex-1 text-gray-700 text-base`}
            onChangeText={setSearchText}
            value={searchText}
          />
        </View>

        {/* City List */}
        {filteredCities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center py-3 border-b border-gray-200`}
            onPress={() => setSelectedCity(city)}
          >
            <Text style={tw`text-base text-gray-800 flex-1`}>{city}</Text>
            <View
              style={tw`w-5 h-5 border-2 rounded-full ${
                selectedCity === city
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-400"
              }`}
            />
          </TouchableOpacity>
        ))}

        {/* Continue Button */}
        <TouchableOpacity
          style={tw`mt-6 bg-blue-600 py-3 rounded-lg ${
            selectedCity ? "" : "opacity-50"
          }`}
          disabled={!selectedCity}
          onPress={() => navigation.navigate("NextScreen")} // Replace with actual screen name
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}