import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { CheckCircleIcon, MapPinIcon } from "lucide-react-native";

import { useDispatch } from "react-redux";
import { sendAadhaarOTP, updateProviderDetails, verifyAadhaar, verifyAadhaarOTP } from "../redux/slices/ProviderSlice";
import tw from "../../tailwind";
const apiCall = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API call error:", error);
    throw new Error("Something went wrong!");
  }
};
const WorkLocationScreen = ({onClose,adhadharCard,  setAdhadharCard, otp, setOtp, isOtpVerified, setIsOptVerified,experience, ageGroup ,selectedId}) => {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [aadhaarVerificationStatus, setAadhaarVerificationStatus] = useState(null);
  const [otpStatus, setOtpStatus] = useState(null);

  // Function to format Aadhaar card number as the user types (16 digits)
  const formatAadhaarCard = (input) => {
    // Remove non-numeric characters
    let cleanInput = input.replace(/\D/g, "");

    // Format the input into chunks of 4 digits (for 16-digit Aadhaar number)
    if (cleanInput.length <= 16) {
      cleanInput = cleanInput.replace(/(\d{4})(?=\d)/g, "$1-");
    }

    return cleanInput;
  };

  // Function to handle Aadhaar card input change
  const handleAadhaarCardChange = (text) => {
    const formattedText = formatAadhaarCard(text);
    setAdhadharCard(formattedText);
  };

  // Function to handle Aadhaar card verification
  const handleAadhaarVerification = async () => {
    if (!adhadharCard) {
      alert("Please enter your Aadhaar card number.");
      return;
    }

    try {
      const response =await dispatch(verifyAadhaar(adhadharCard.replace(/-/g, "")));
      if (response.payload.success) {
        setAadhaarVerificationStatus("Aadhaar card verified successfully!");
      } else {
        setAadhaarVerificationStatus("Invalid Aadhaar card.");
      }
    } catch (error) {
      setAadhaarVerificationStatus("Aadhaar verification failed.");
    }
  };
  const MakeProviderVerified = async () => {
    console.log(selectedId, ageGroup, experience, adhadharCard);
    //const response = await dispatch(updateProviderDetails());
    if (response) {
       na
    }
  }
  // Function to verify OTP
  const handleOtpVerification = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    try {
      const response = await dispatch(verifyAadhaarOTP({
        aadhaarNumber: adhadharCard.replace(/-/g, ""), // Remove hyphens before sending
        otp
      }));

      if (response) {
        setIsOptVerified(true);
        // alert("OTP verified successfully!");
        console.log("OTP verified successfully!");
        MakeProviderVerified();
      } else {
        setOtpStatus("Invalid OTP.");
      }
    } catch (error) {
      setOtpStatus("OTP verification failed.");
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4 justify-center items-center`}>
      <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>Aadhaar Verification</Text>
      <Text style={tw`text-xl font-bold text-gray-900 mb-4 text-center`}>
        Please verify your Aadhaar card and OTP.
      </Text>

      {/* Aadhaar Card Input */}
      <View style={tw`w-full bg-white p-3 rounded-xl shadow-md mb-3`}>
        <TextInput
          placeholder="Enter Aadhaar Card Number"
          value={adhadharCard}
          onChangeText={handleAadhaarCardChange}
          style={tw`text-lg text-gray-700`}
          maxLength={19} // Max length of Aadhaar number with hyphens (16 digits + 3 hyphens)
          keyboardType="numeric"
        />
      </View>

      {/* Verify Aadhaar Button */}
      <TouchableOpacity
        style={tw`bg-blue-500 px-5 py-3 rounded-lg shadow-md w-full justify-center items-center mb-3`}
        onPress={handleAadhaarVerification}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Verify Aadhaar</Text>
      </TouchableOpacity>

      {/* OTP Input */}
      {aadhaarVerificationStatus === "Aadhaar card verified successfully!" && (
        <View style={tw`w-full bg-white p-3 rounded-xl shadow-md mb-3`}>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={tw`text-lg text-gray-700`}
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Verify OTP Button */}
      {aadhaarVerificationStatus === "Aadhaar card verified successfully!" && (
        <TouchableOpacity
          style={tw`bg-green-500 px-5 py-3 rounded-lg shadow-md w-full justify-center items-center mb-3`}
          onPress={handleOtpVerification}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Verify OTP</Text>
        </TouchableOpacity>
      )}

      {/* Status Message */}
      {otpStatus && <Text style={tw`text-center text-red-600`}>{otpStatus}</Text>}
      {aadhaarVerificationStatus && (
        <Text style={tw`text-center text-green-600`}>{aadhaarVerificationStatus}</Text>
      )}

      {/* Success Modal */}
      <Animated.View
        style={[
          tw`absolute bottom-5 w-full flex items-center`,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View
          style={tw`bg-white p-4 rounded-xl shadow-lg w-11/12 flex-row items-center justify-center`}
        >
          <CheckCircleIcon size={30} color="green" />
          <Text style={tw`text-lg font-semibold text-gray-900 ml-2`}>
            Aadhaar Verified Successfully!
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default WorkLocationScreen;
