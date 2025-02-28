import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import tw from "../../tailwind";
import ServiceModal from "../Bookings/ServiceModal";

const services = [
  { name: "Everyday Cleaning" },
  { name: "Weekly Cleaning" },
  { name: "Laundry", },
  { name: "Dishwashing",},
  { name: "Bathroom Cleaning", },
  { name: "Kitchen Prep"},
];

const OurServicesCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-lg mt-4`}>
      {/* Header */}
      <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>Our Services</Text>
      <Text style={tw`text-gray-600 mb-3`}>Avail one or multiple services in your booking</Text>

      {/* Grid Layout with Two Columns */}
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`w-[48%] mb-4 items-center p-2 bg-gray-100 rounded-lg shadow-sm`}
            onPress={() => openModal(item)}
          >
            <Image source={item.image} style={{ width: 80, height: 80, resizeMode: "contain" }} />
            <Text style={tw`text-sm font-medium text-gray-800 mt-2 text-center`}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={tw`m-0 justify-end`}
      >
        <ServiceModal/>
      </Modal>
    </View>
  );
};

export default OurServicesCard;
