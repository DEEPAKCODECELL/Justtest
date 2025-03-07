import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import tw from "twrnc";

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-red-500 py-4 px-4 flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2 rounded-full bg-red-600`}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-semibold text-white ml-4`}>Terms & Conditions</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={tw`px-4 pt-6 pb-12`}>
        {/* Logo & Version */}
        <View style={tw`mb-10 items-center`}>
          <Text style={tw`text-4xl font-bold text-red-500 mb-2`}>SpeedRabbit</Text>
          <Text style={tw`text-gray-600`}>Version 1.0</Text>
        </View>

        {/* Terms Content */}
        <View style={tw`space-y-6`}>
          <View>
            <Text style={tw`text-2xl font-semibold text-red-500 mb-4`}>Terms of Use</Text>
            <Text style={tw`text-gray-700 leading-relaxed`}>
              This document is an electronic record and published in accordance with the 
              provisions of applicable laws. This document is generated by a computer 
              system and does not require any physical or digital signatures.
            </Text>
          </View>

          <View>
            <Text style={tw`text-xl font-semibold text-gray-800 mb-3`}>
              1. Acceptance of Terms
            </Text>
            <Text style={tw`text-gray-700 leading-relaxed`}>
              By accessing and using SpeedRabbit's services ("Services"), you acknowledge that 
              you have read, understood, and agree to be bound by these Terms and Conditions.
            </Text>
          </View>

          <View>
            <Text style={tw`text-xl font-semibold text-gray-800 mb-3`}>
              2. Service Description
            </Text>
            <Text style={tw`text-gray-700 leading-relaxed`}>
              SpeedRabbit provides various digital services through its website and mobile 
              applications. The specific features and functionalities of our Services may be 
              modified, updated, or discontinued at our discretion.
            </Text>
          </View>

          <View>
            <Text style={tw`text-xl font-semibold text-gray-800 mb-3`}>
              3. User Obligations
            </Text>
            <Text style={tw`text-gray-700 leading-relaxed`}>
              Users are responsible for maintaining the confidentiality of their account 
              information and for all activities that occur under their account. Users must notify 
              SpeedRabbit immediately of any unauthorized use of their account.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;
