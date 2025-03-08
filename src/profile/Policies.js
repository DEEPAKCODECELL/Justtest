import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft,ArrowBigRight, FileText, Lock, Code } from "lucide-react-native";
import tw from "twrnc";

const PolicyItem = ({ icon: Icon, title, to }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(to)}
      style={tw`flex-row items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-md`}
    >
      <View style={tw`flex-row items-center gap-x-3`}>
        <View style={tw`p-2 rounded-lg bg-purple-100`}>
          <Icon size={20} color="#6B21A8" />
        </View>
        <Text style={tw`text-lg font-medium text-gray-800`}>{title}</Text>
      </View>
      <ArrowLeft size={20} color="#9CA3AF" style={tw`rotate-180`} />
    </TouchableOpacity>
  );
};

const Policies = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-gray-100 px-4 pt-10`}>
      {/* Header */}
      <View style={tw`flex-row items-center`}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
    <ArrowLeft size={24} color="black" />
  </TouchableOpacity>        
  <Text style={tw`text-lg font-semibold ml-2`}> Policies</Text>
</View>  

      {/* Policy Items */}
      <PolicyItem icon={FileText} title="Terms & Conditions" to="TermsAndConditions" />
      <PolicyItem icon={Lock} title="Privacy Policy" to="TermsAndConditions" />
      <PolicyItem icon={Code} title="Open Source Licenses" to="TermsAndConditions" />
    </View>
  );
};

export default Policies;
