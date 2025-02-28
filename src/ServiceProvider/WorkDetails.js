import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";

export default function WorkDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedService } = route.params || {}; // Get selected service

  const [experience, setExperience] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);

  return (
    <ScrollView
      style={tw`bg-white h-full px-4 pt-6`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`pb-10`}>
        {/* Language & Alert */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View style={tw`bg-yellow-200 flex-row items-center p-2 rounded-lg`}>
            <Text style={tw`text-yellow-800 font-semibold ml-1`}>
              ⚡ Almost done!
            </Text>
          </View>
          <TouchableOpacity style={tw`border px-3 py-1 rounded-lg`}>
            <Text style={tw`text-gray-800 font-semibold`}>🌍 English</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>
          Tell us about your work!
        </Text>

        {/* Experience Section */}
        <View
          style={tw`bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4`}
        >
          <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
            Do you have any experience in {selectedService}?
          </Text>
          {["Yes", "No"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center py-3 border-b border-gray-300`}
              onPress={() => setExperience(option)}
            >
              <Text style={tw`text-base text-gray-800 flex-1`}>{option}</Text>
              <View
                style={tw`w-5 h-5 border-2 rounded-full ${
                  experience === option
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Age Group Section */}
        <View
          style={tw`bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6`}
        >
          <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
            What is your age?
          </Text>
          {["Less than 18 years", "18-45 Years", "More than 45 Years"].map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                style={tw`flex-row items-center py-3 border-b border-gray-300`}
                onPress={() => setAgeGroup(option)}
              >
                <Text style={tw`text-base text-gray-800 flex-1`}>{option}</Text>
                <View
                  style={tw`w-5 h-5 border-2 rounded-full ${
                    ageGroup === option
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-400"
                  }`}
                />
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={tw`bg-blue-600 py-3 rounded-lg ${
            experience && ageGroup ? "" : "opacity-50"
          }`}
          disabled={!experience || !ageGroup}
          onPress={() => navigation.navigate("WorkLocation")} // Replace with actual screen name
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}