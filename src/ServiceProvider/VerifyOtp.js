import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { verifyOtp } from "../redux/slices/userSlice";

const VerifyOtp = ({setIsAuthenticated}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.user.phone);
  console.log("Phone Number:", phone);

  const handleVerifyOtp = async () => {
    console.log(otp);
    const mergedOtp = otp.join("");
    console.log(mergedOtp);
  const result = await dispatch(verifyOtp({ phone:phone, otp:mergedOtp }));
  console.log(result);
  if (result.payload.success) {
    await AsyncStorage.setItem("authToken", result.payload.data.token);// Store token
    await AsyncStorage.setItem("role", result.payload.data.role);// Store role
    console.log("toekn", result.payload.data.token)
    if (result.payload.data.role != "admin") navigation.navigate("FetchAddress")
    else navigation.navigate("CategoryCreate");
  } else {
    console.log("Login Failed");
  }
};

  const handleOtpChange = (text, index) => {
    if (!/^\d?$/.test(text)) return; // Allow only numbers

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input field
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center px-5`}>
      <Text style={tw`text-lg font-semibold mb-4`}>Enter OTP</Text>

      <View style={tw`flex-row justify-between w-full max-w-sm`}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={tw`w-12 h-12 border rounded-md text-center text-lg border-gray-300 focus:border-pink-500`}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(digit, index);
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={handleVerifyOtp}
        style={tw`w-full max-w-sm bg-pink-500 py-3 rounded-md mt-4`}
      >
        <Text style={tw`text-white text-center font-semibold`}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-3`}>
        <Text style={tw`text-sm text-gray-500`}>Change Phone Number</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtp;
