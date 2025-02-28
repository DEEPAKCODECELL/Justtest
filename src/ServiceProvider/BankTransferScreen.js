import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const BankTransfersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white px-4 pt-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-lg text-black`}>←</Text>{" "}
          {/* Unicode Back Arrow */}
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold ml-4`}>All Bank transfers</Text>
      </View>

      {/* Transfer Card */}
      <TouchableOpacity
        style={tw`mt-6 bg-gray-100 rounded-lg p-4 flex-row justify-between items-center`}
      >
        <View>
          <Text style={tw`text-base font-semibold text-black`}>
            13 - 16 Feb
          </Text>
          <Text style={tw`text-sm text-gray-500`}>Upcoming</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-base font-semibold text-black`}>₹0</Text>
          <Text style={tw`text-lg text-gray-500 ml-2`}>→</Text>{" "}
          {/* Unicode Right Arrow */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BankTransfersScreen;