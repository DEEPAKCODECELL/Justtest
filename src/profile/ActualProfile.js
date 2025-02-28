import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import Toast from "react-native-toast-message";
import tw from "../../tailwind";


const ActualProfile = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "derek",
    mobile: "9608557095",
    email: "",
  });

  const handleSubmit = () => {
    Toast.show({
      type: "success",
      text1: "Profile updated successfully!",
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Toast.show({
              type: "success",
              text1: "Account deleted successfully!",
            });
          },
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 bg-white px-4 pt-12`}>
      {/* Header */}
       <View style={tw`flex-row items-center`}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
    <ArrowLeft size={24} color="black" />
  </TouchableOpacity>        
  <Text style={tw`text-lg font-semibold ml-2`}>Profile</Text>
</View>  

      {/* Form */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-[#1A1F2C] font-medium mb-2`}>Name</Text>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
          style={tw`border border-gray-300 rounded-lg p-4 bg-gray-100`}
          placeholder="Enter your name"
        />

        <Text style={tw`text-[#1A1F2C] font-medium mt-4 mb-2`}>Mobile Number</Text>
        <TextInput
          value={formData.mobile}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, mobile: text }))}
          style={tw`border border-gray-300 rounded-lg p-4 bg-gray-100`}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
        />

        <Text style={tw`text-[#1A1F2C] font-medium mt-4 mb-2`}>Email Address</Text>
        <TextInput
          value={formData.email}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
          style={tw`border border-gray-300 rounded-lg p-4 bg-gray-100`}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <Text style={tw`text-sm text-gray-500 mt-1`}>We promise not to spam you</Text>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={tw`mt-6 p-4 bg-red-500 rounded-lg`}>
          <Text style={tw`text-center text-white font-bold`}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account Section */}
      <View style={tw`mt-12 pt-8 border-t`}>
        <TouchableOpacity onPress={handleDelete} style={tw`p-2`}>
          <Text style={tw`text-red-600 font-medium text-center`}>Delete Account</Text>
        </TouchableOpacity>
        <Text style={tw`text-gray-600 mt-2 text-sm text-center`}>
          Deleting your account will remove all your orders, wallet balance, and any active referral.
        </Text>
      </View>

      {/* Toast Message */}
      <Toast />
    </View>
  );
};

export default ActualProfile;
