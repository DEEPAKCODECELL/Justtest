import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { CheckSquare } from "lucide-react-native";
import { loginUser } from "../redux/slices/userSlice";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const handleLogin = async () => {
      if (phone.length == 0) {
          console.log("Phone Number Should Not Be Empty");
          return;
      }
      if (phone.length > 10) {
          console.log("Phone Number Should Not Be Greater Than 10 Digits");
          return;
      }  
      const result = await dispatch(loginUser({ phone }));
    if (result && result.success) {
        console.log(result.success);
        console.log("Login Success:", result.payload);
      } else {
        console.log("Login Failed:", result.error.message);
      }
  };

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      {/* Hero Section with Image */}
      <View style={tw`h-1/2 w-full`}>
        <Image
          source={require("./leather-sofa-cleaning.jpg")} // Replace with actual image
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
        <View style={tw`absolute bottom-0 left-0 right-0 p-4 bg-black/50`}>
          <Text style={tw`text-xl font-bold text-white text-center`}>
            Govt Certified Training
          </Text>
          <Text style={tw`text-sm text-gray-200 text-center`}>
            Get certified by Skill India
          </Text>
        </View>
      </View>

      {/* Registration Form */}
      <View style={tw`flex-1 justify-center px-6`}>
        <View style={tw`bg-white p-6 rounded-xl shadow-lg`}>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <Text style={tw`text-lg font-bold text-gray-700`}>
              {countryCode}
            </Text>
            <TextInput
              style={tw`flex-1 text-lg ml-2 text-gray-900`}
              placeholder="Enter mobile number"
              placeholderTextColor="gray"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={tw`flex-row items-center space-x-2 mt-4`}>
            <CheckSquare size={20} color="black" />
            <Text style={tw`text-sm text-gray-800`}>
              Get account updates on WhatsApp
            </Text>
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 p-3 rounded-lg mt-6 shadow-md`}
            onPress={() => navigation.navigate("ProfileSetup")} // Navigate to ProfileSetup page
          >
            <Text style={tw`text-white text-center text-lg font-semibold`} onPress={handleLogin}>
              Log In / Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;