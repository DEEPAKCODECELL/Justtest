import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { updateProviderDetails, verifyAadhaar, verifyAadhaarOTP } from "../redux/slices/ProviderSlice";
import { CheckCircleIcon } from "lucide-react-native";
import LoadingBar from "./components/LoadingBar";


export default function WorkDetailsScreen({ onClose, ageGroup, setAgeGroup, selectedService,adhadharCard, setAdhadharCard,selectedId
            ,otp, setOtp, isOtpVerified, setIsOptVerified }) {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {loading} = useSelector((state) => state?.provider);
  console.log(loading);

  const [aadhaarVerificationStatus, setAadhaarVerificationStatus] = useState(null);
  const [otpStatus, setOtpStatus] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup: Reset all states when component unmounts
      setOtpStatus(null);
      setAadhaarVerificationStatus(null);
      setIsLoading(false);
    };
  }, []);

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
      const response = await dispatch(verifyAadhaar(adhadharCard.replace(/-/g, "")));
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
    setIsLoading(true);
    console.log("called",selectedId, ageGroup, adhadharCard);
    const response = await dispatch(updateProviderDetails({ selectedId, ageGroup, adhadharCard:adhadharCard.replace(/-/g, ""),status:"verified" }));
    console.log("check check response check", response);
    setIsLoading(false);
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
        console.log("called Make");
        await MakeProviderVerified();
      } else {
        setOtpStatus("Invalid OTP.");
      }
    } catch (error) {
      console.log(error.message);
      setOtpStatus("OTP verification failed.");
    }
  };

  if (isLoading) {
    return (
      <>
      <LoadingBar loading={isLoading}/>
      </>
    )
  }
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
             You Selected {selectedService.length > 0 ? selectedService.join(", ") : "these services"}
          </Text>
        </View>

        {/* Age Group Section */}
       <View style={tw`bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6`}>
  <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
    What is your age?
  </Text>

  <View style={tw`flex-row items-center py-3 border-b border-gray-300`}>
    <TextInput
      style={tw`flex-1 text-base text-gray-800 bg-white px-4 py-2 rounded-lg border border-gray-400`}
      placeholder="Enter your age"
      placeholderTextColor="#888"
      keyboardType="numeric"
      value={ageGroup}
      onChangeText={(text) => setAgeGroup(text)}
    />
          </View>
     <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
        Enter Aadhaar card
      </Text>

      {/* Aadhaar Card Input */}
      <View style={tw`flex-row items-center py-3 border-b border-gray-300`}>
        <TextInput
          placeholder="Enter Aadhaar Card Number"
          value={adhadharCard}
          onChangeText={handleAadhaarCardChange}
          style={tw`flex-1 text-base text-gray-800 bg-white px-4 py-4 rounded-lg border border-gray-400`}
          maxLength={19} // Max length of Aadhaar number with hyphens (16 digits + 3 hyphens)
          keyboardType="numeric"
          editable={aadhaarVerificationStatus !== "Aadhaar card verified successfully!"}    
        />
      </View>

      {/* Verify Aadhaar Button */}
          {aadhaarVerificationStatus!="Aadhaar card verified successfully!"&&<TouchableOpacity
            style={tw`bg-blue-500 px-5 py-3 rounded-lg shadow-md w-full justify-center items-center mb-3`}
            onPress={handleAadhaarVerification}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Verify Aadhaar</Text>
          </TouchableOpacity>}

      {/* OTP Input */}
          {aadhaarVerificationStatus === "Aadhaar card verified successfully!" && (
            <>
              <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
        Enter Otp
      </Text>
        <View style={tw`w-full bg-white p-3 rounded-xl shadow-md mb-3`}>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={tw`text-lg text-gray-700`}
            keyboardType="numeric"
          />
        </View>
            </>
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
</View>
      </View>
    </ScrollView>
  );
}
