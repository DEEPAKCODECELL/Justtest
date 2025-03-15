import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from "react-native";
import tw from "../../tailwind";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ServiceModal = ({ selectedService }) => {
  const navigation = useNavigation();  
  const services = useSelector((state) => state.service.services.data);
  const [currentService, setCurrentService] = useState(selectedService);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && selectedService) {
      const index = services.findIndex((item) => item._id === selectedService._id);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
      }
    }
  }, [selectedService]);

  const handleBookNow = () => {
    navigation.navigate("ChooseService", {
      serviceId: currentService._id,
      serviceName: currentService.name,
      isScheduled: false, 
    });
  };

  const handleScheduleForLater = () => {
    navigation.navigate("ChooseService", {
      serviceId: currentService._id,
      serviceName: currentService.name,
      isScheduled: true,
    });
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-lg mt-4`}> 
      {/* Horizontal Scrollable Services List */}
      <FlatList
        ref={flatListRef}
        data={services}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        initialScrollIndex={services.findIndex((item) => item._id === selectedService?._id)} // Ensure it scrolls initially
        getItemLayout={(data, index) => ({
          length: 100, // Approximate width of each item
          offset: 100 * index, 
          index,
        })}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCurrentService(item)}
            style={tw`px-4 py-2 mx-1 ${
              currentService._id === item._id ? "bg-purple-100 rounded-lg" : ""
            }`}
          >
            <Text
              style={tw`${
                currentService._id === item._id ? "text-purple-600 font-bold" : "text-gray-500"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      
      {/* Content */}
      <ScrollView style={tw`mt-4`}>
        <Text style={tw`text-lg font-bold`}>The expert is trained to</Text>
        {currentService?.expert_is_trained_in?.map((task, index) => (
          <Text key={index} style={tw`text-black mt-4`}>✅   {task}</Text>
        ))}

        {currentService?.service_excludes?.length > 0 && (
          <>
            <Text style={tw`text-lg font-bold mt-4`}>Service excludes</Text>
            {currentService.service_excludes.map((exclude, index) => (
              <Text key={index} style={tw`text-red-500 mt-4`}>❌   {exclude}</Text>
            ))}
          </>
        )}

        {currentService.what_we_need_from_you?.length > 0 && (
          <View style={tw`mt-4`}>
            <Text style={tw`text-lg font-bold`}>What We Need From You:</Text>
            {currentService.what_we_need_from_you.map((item, index) => (
              <View key={index} style={tw`mt-4`}>
                <Text style={tw`text-gray-700`}>📌   {item.description}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Buttons */}
      <View style={tw`flex-row justify-between items-center mt-4 p-4`}>
        <TouchableOpacity style={tw`bg-purple-600 flex-1 py-3 rounded-lg mr-2`} onPress={handleBookNow}>
          <Text style={tw`text-white text-center font-semibold`}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`bg-purple-600 flex-1 py-3 rounded-lg ml-2`} onPress={handleScheduleForLater}>
          <Text style={tw`text-white text-center font-semibold`}>Schedule for Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceModal;
