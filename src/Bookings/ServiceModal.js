import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from "react-native";
import tw from "../../tailwind";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ServiceModal = () => {
   const navigation = useNavigation();  
  const services = useSelector((state) => state.service.services.data);
  const [selectedService, setSelectedService] = useState(services[0]);
  const handleBookNow = () => {
    navigation.navigate("ChooseService", {
      serviceId: selectedService._id,
      serviceName: selectedService.name,
      isScheduled: false, // Example default value
    });
  };

  const handleScheduleForLater = () => {
    navigation.navigate("ChooseService", {
      serviceId: selectedService._id,
      serviceName: selectedService.name,
      isScheduled: true,
    });
  };
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-lg mt-4`}> 
      {/* Tabs */}
      <FlatList
        data={services}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedService(item)}
            style={tw`px-4 py-2 mx-1 ${
              selectedService._id === item._id ? "bg-purple-100 rounded-lg" : ""
            }`}
          >
            <Text
              style={tw`${
                selectedService._id === item._id ? "text-purple-600 font-bold" : "text-gray-500"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      
      {/* Content */}
      <ScrollView style={tw`mt-4`}>
        {/* Expert Training Section */}
        <Text style={tw`text-lg font-bold`}>The expert is trained to</Text>
        {selectedService?.expert_is_trained_in?.map((task, index) => (
          <Text key={index} style={tw`text-white mt-4`}>✅ {task}</Text>
        ))}

        {/* Service Excludes Section */}
        {selectedService?.service_excludes?.length > 0 && (
          <>
            <Text style={tw`text-lg font-bold mt-4`}>Service excludes</Text>
            {selectedService.service_excludes.map((exclude, index) => (
              <Text key={index} style={tw`text-red-500 mt-4`}>❌ {exclude}</Text>
            ))}
          </>
        )}

        {/* What We Need From You Section */}
        {/* What We Need From You */}
        {selectedService.what_we_need_from_you?.length > 0 && (
          <View style={tw`mt-4`}>
            <Text style={tw`text-lg font-bold`}>What We Need From You:</Text>
            {selectedService.what_we_need_from_you.map((item, index) => (
              <View key={index} style={tw`mt-4`}>
                <Text style={tw`text-gray-700`}>📌 {item.description}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={tw`flex-row justify-between items-center mt-4 p-4`}>
  {/* Book Now Button (Disabled) */}
  <TouchableOpacity style={tw`bg-purple-600 flex-1 py-3 rounded-lg mr-2`} onPress={handleBookNow}>
    <Text style={tw`text-white text-center font-semibold`}>Book Now</Text>
  </TouchableOpacity>

  {/* Schedule for Later Button */}
  <TouchableOpacity style={tw`bg-purple-600 flex-1 py-3 rounded-lg ml-2`} onPress={handleScheduleForLater}>
    <Text style={tw`text-white text-center font-semibold`}>Schedule for Later</Text>
  </TouchableOpacity>
</View>

    </View>
  );
};

export default ServiceModal;
