import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { BlurView } from "@react-native-community/blur";
import WorkDetailsScreen from "./WorkDetails";
import WorkLocationScreen from "./WorkLocation";
import { useDispatch, useSelector } from "react-redux";
import {fetchServicesForProvider } from "../redux/slices/serviceSlice";

export default function ServiceSelectionScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState([]);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [ageGroup, setAgeGroup] = useState(null);
  const [location, setLocation] = useState("");
  const [adhadharCard, setAdhadharCard] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOptVerified] = useState(false);
  const [services, setServices] = useState([]);

  const toggleSelection = (id) => {
    setSelectedId((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id) // Remove if already selected
        : [...prevSelected, id] // Add if not selected
    );
    console.log(selectedId);
  };

  useEffect(() => {
      const getAllService = async () => {
        const response = await dispatch(fetchServicesForProvider());
        console.log(response.payload.data);
        if (response && response.payload) {
          setServices(response.payload.data);
        }
        else {
          Alert.alert("No Service Available At Your Location");
        }
      }
    getAllService();
    return () => {
      // Cleanup: Reset all states when component unmounts
      setSelectedId([]);
      setModalVisible1(false);
      setSelectedService(null);
      setModalVisible2(false);
      setAgeGroup(null);
      setLocation("");
      setAdhadharCard(null);
      setOtp("");
      setIsOptVerified(false);
      setServices([]);
    };
  },[dispatch])

  return (
    <ScrollView
      style={tw`bg-white h-full px-4 pt-6`}
      keyboardShouldPersistTaps="handled"
    >
      {(isModalVisible1 ||isModalVisible2 ) && (
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1, // Ensure it's behind the modal
          }}
          blurType="light" // Can be "dark", "extraLight", "light"
          blurAmount={30} // Adjust blur intensity
          reducedTransparencyFallbackColor="white"
        />
      )}
      <View style={tw`pb-10`}>
        {/* Title */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>
          What work do you do?
        </Text>

        {/* Search Bar */}
        <View
          style={tw`flex-row items-center bg-gray-100 p-3 rounded-lg mb-4 border border-gray-300`}
        >
          <TextInput
            placeholder="Search plumber, electrician etc."
            placeholderTextColor="#888"
            style={tw`flex-1 text-gray-700 text-base`}
          />
        </View>
        {/* All Categories */}
        <Text style={tw`text-lg font-semibold text-gray-900 mt-4 mb-2`}>
          All Categories
        </Text>
        {services&&services.length>0&&services.map((item,index) => (
          <TouchableOpacity
  key={item._id}
  style={tw`flex-row items-center py-3 border-b border-gray-200`}
  onPress={() => toggleSelection(item._id)} // Call function to update selection
>
  <Text style={tw`text-base text-gray-800 flex-1`}>{item.name}</Text>

  {/* Checkbox UI */}
  <View
    style={tw`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
      selectedId.includes(item._id) ? "border-blue-500 bg-blue-500" : "border-gray-400"
    }`}
  >
    {selectedId.includes(item._id) && (
      <Text style={tw`text-white font-bold`}>✓</Text> // Checkmark symbol
    )}
  </View>
</TouchableOpacity>
        ))}

        {/* Continue Button */}
        <TouchableOpacity
  style={tw`mt-6 bg-blue-600 py-3 rounded-lg${selectedId.length ? "" : " opacity-50"}`}
  disabled={selectedId.length === 0}
  onPress={() => {
    const selectedServicenow = services
      .filter((item) => selectedId.includes(item._id)) // Get all selected services
      .map((item) => item.name); // Extract only names as an array

    console.log("data check", selectedServicenow); // Now an array of selected names
    setSelectedService(selectedServicenow); // Save all selected names
    setModalVisible1(true);
  }}
>
  <Text style={tw`text-white text-center text-lg font-semibold`}>
    Continue
  </Text>
</TouchableOpacity>

         <Modal 
  visible={isModalVisible1}
  transparent={true} // Ensures the modal behaves correctly
  animationType="slide"
  onRequestClose={() => setModalVisible1(false)} // For Android back button
>
          <WorkDetailsScreen onClose={() => { setModalVisible1(false); setModalVisible2(true) }}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup} selectedService={selectedService}
            adhadharCard={adhadharCard} setAdhadharCard={setAdhadharCard}
            otp={otp} setOtp={setOtp} isOtpVerified={isOtpVerified} setIsOptVerified={setIsOptVerified}
            selectedId={selectedId}
          />
        </Modal>
      </View>
    </ScrollView>
  );
}
