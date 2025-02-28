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
import tw from "twrnc";

const WorkLocationScreen = () => {
  const [location, setLocation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(100)).current;
  const navigation = useNavigation(); // Navigation Hook

  const handleSaveLocation = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      // Animate popup
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide popup and navigate after 2 seconds
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setModalVisible(false);
          navigation.replace("HomeProvider"); // Navigate after popup
        });
      }, 2000);
    }
  }, [modalVisible]);

  return (
    <View style={tw`flex-1 bg-gray-100 p-4 justify-center items-center`}>
      <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>
        Last step!
      </Text>
      <Text style={tw`text-xl font-bold text-gray-900 mb-4 text-center`}>
        Search for the preferred work location in Bangalore
      </Text>

      {/* Search Input */}
      <View style={tw`w-full bg-white p-3 rounded-xl shadow-md mb-3`}>
        <TextInput
          placeholder="Search area"
          value={location}
          onChangeText={setLocation}
          style={tw`text-lg text-gray-700`}
        />
      </View>

      {/* Use My Current Location Button */}
      <TouchableOpacity
        style={tw`flex-row items-center bg-blue-500 px-5 py-3 rounded-lg shadow-md w-full justify-center mb-3`}
        onPress={handleSaveLocation}
      >
        <MapPinIcon size={20} color="white" />
        <Text style={tw`text-white text-lg font-semibold ml-2`}>
          Use my current location
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={tw`bg-green-500 px-5 py-3 rounded-lg shadow-md w-full justify-center items-center`}
        onPress={handleSaveLocation}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Submit</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      {modalVisible && (
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
              Area saved successfully!
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default WorkLocationScreen;