import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft, Check } from "lucide-react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-gray-100 items-center justify-center`}>
      {/* Mobile frame */}
      <View
        style={tw`w-full max-w-md bg-white h-full shadow-lg overflow-hidden flex-1`}
      >
        {/* Header */}
        <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
          <TouchableOpacity
            style={tw`mr-4 p-2 rounded-full bg-gray-100`}
            accessibilityLabel="Go back"
          >
            <ArrowLeft
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={tw`text-xl font-semibold`}>Notification Centre</Text>
        </View>

        {/* Empty state */}
        <ScrollView
          contentContainerStyle={tw`flex-1 items-center justify-center p-6 text-center`}
        >
          <View
            style={tw`w-16 h-16 rounded-full bg-purple-100 items-center justify-center mb-6`}
          >
            <Check size={32} color="#9333ea" />
          </View>

          <Text style={tw`text-lg font-medium mb-2 text-center`}>
            You will see your important updates here
          </Text>

          <TouchableOpacity
            style={tw`mt-8 bg-purple-600 px-6 py-3 rounded-full`}
          >
            <Text style={tw`text-white font-medium text-center`}>Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default NotificationScreen;