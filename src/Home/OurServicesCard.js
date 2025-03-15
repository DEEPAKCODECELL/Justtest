import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Alert, ScrollView } from "react-native";
import Modal from "react-native-modal";
import tw from "../../tailwind";
import ServiceModal from "../Bookings/ServiceModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../redux/slices/serviceSlice";
const OurServicesCard = () => {
  const statedata = useSelector((state) => state);
  console.log("statedata",statedata);
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    const getAllService = async () => {
      const response = await dispatch(fetchServices());
      console.log(response.payload.data);
      if (response && response.payload) {
        setServices(response.payload.data);
      }
      else {
        Alert.alert("No Service Available At Your Location");
      }
    }
    getAllService();
  },[dispatch])
  const openModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  return (
    <ScrollView style={tw`bg-white p-4 rounded-lg shadow-lg mt-4`}>
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
  <View style={tw`w-full h-32 rounded-lg overflow-hidden`}>
    <Image
      source={{ uri: item?.images?.[0] }}
      style={tw`w-full h-full`}
      resizeMode="cover"
    />
  </View>
  <Text style={tw`text-sm font-medium text-gray-800 mt-2 text-center`}>
    {item.name}
  </Text>
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
        <ServiceModal selectedService={selectedService}/>
      </Modal>
    </ScrollView>
  );
};

export default OurServicesCard;
