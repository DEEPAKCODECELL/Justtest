import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import { Eye, Edit, Trash, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { deleteServices, fetchServicesForProvider } from "../redux/slices/serviceSlice";

const ActualServiceList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const { services: currentservices, loading } = useSelector((state) => state.service);
  const filteredServices = services.filter(service => service.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await dispatch(fetchServicesForProvider());
        if (response.payload.success) {
          setServices(response.payload.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getServices();
  }, [dispatch]);

  const handleSearch = (text) => {
    setSearch(text);
    const pattern = text.toLowerCase();
    const filtered = services.filter(
      ({ name, description }) =>
        name.toLowerCase().includes(pattern) || description.toLowerCase().includes(pattern)
    );
    setServices(filtered);
  };

  const handleDelete = (id) => {
    setServiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async() => {
    if (serviceToDelete) {
      console.log("serviceToDelete", serviceToDelete);
      const response = await dispatch(deleteServices({ id: serviceToDelete }));
      if (response.payload.success) {
        console.log("Done");
      }
      else {
        console.log("Not Done");
      }
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <TextInput
        value={search}
        onChangeText={handleSearch}
        placeholder="Search services..."
        style={tw`border p-3 rounded-lg mb-4`}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredServices.length > 0 ? (
          filteredServices.map((item) => (
            <ServiceCard
              key={item._id}
              service={item}
              onView={() => navigation.navigate("ActualServiceDetail", { id: item._id })}
              onEdit={() => navigation.navigate("EditActualService", { id: item._id })}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        ) : (
          <Text style={tw`text-center text-gray-500`}>No services found</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg`}
        onPress={() => { setIsModalVisible(true);}}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      <Modal visible={deleteDialogOpen} transparent animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-lg w-80`}>
            <Text style={tw`text-lg font-bold mb-4`}>Delete Service</Text>
            <Text>Are you sure you want to delete this service? This action cannot be undone.</Text>
            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity onPress={() => setDeleteDialogOpen(false)} style={tw`mr-4`}>
                <Text style={tw`text-blue-500`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={tw`text-red-500`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={tw`flex-1 bg-gray-100`}>
          <CreateService setIsModalVisible={setIsModalVisible} />
        </View>
      </Modal>
    </View>
  );
};

const ServiceCard = ({ service, onView, onEdit, onDelete }) => {
  return (
    <TouchableOpacity onPress={onView} activeOpacity={0.7}>
    <View style={tw`flex-row bg-white rounded-lg shadow p-4 mb-4 items-center`}>
      {service.images?.length ? (
        <Image source={{ uri: service.images[0] }} style={tw`w-24 h-24 rounded-lg`} />
      ) : (
        <View style={tw`w-24 h-24 bg-gray-200 rounded-lg items-center justify-center`}>
          <Text>No Image</Text>
        </View>
      )}
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-medium`}>{service.name}</Text>
        <Text style={tw`text-gray-500 mt-1`}>{service.description || "No description provided"}</Text>
      </View>
      <View style={tw`flex-row`}>
        <TouchableOpacity onPress={onEdit} style={tw`p-2 mx-1`}>
          <Edit size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={tw`p-2 mx-1`}>
          <Trash size={25} color="black" />
        </TouchableOpacity>
      </View>
      </View>
      </TouchableOpacity>
  );
};

export default ActualServiceList;
