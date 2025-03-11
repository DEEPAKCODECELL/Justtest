import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from "react-native";
import { Eye, Edit, Trash, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../tailwind";
const actualServices = [
  {
    id: 1,
    name: "Plumbing Repair",
    category: "Home Services",
    provider: "John Doe",
    price: 50,
    duration: "60 minutes",
    location: "New York, NY",
    rating: 4.7,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Electrician Service",
    category: "Home Services",
    provider: "Jane Smith",
    price: 75,
    duration: "90 minutes",
    location: "Los Angeles, CA",
    rating: 4.9,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Car Wash",
    category: "Automotive",
    provider: "Mike Johnson",
    price: 30,
    duration: "45 minutes",
    location: "Chicago, IL",
    rating: 4.5,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Haircut & Styling",
    category: "Beauty",
    provider: "Sarah Lee",
    price: 40,
    duration: "60 minutes",
    location: "Houston, TX",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Home Cleaning",
    category: "Cleaning Services",
    provider: "David Brown",
    price: 100,
    duration: "120 minutes",
    location: "San Francisco, CA",
    rating: 4.6,
    image: "https://via.placeholder.com/150",
  }
];
const ActualServiceList = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState(actualServices);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const filteredServices = services.filter(service => service.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    setServiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter(s => s._id !== serviceToDelete));
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  return (
    <View style={tw`flex-1 p-4`}> 
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search services..."
        style={tw`border p-3 rounded-lg mb-4`}
      />

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onView={() => navigation.navigate("ActualServiceDetail", { id: item._id })}
            onEdit={() => navigation.navigate("EditActualService", { id: item._id })}
            onDelete={() => handleDelete(item._id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={tw`text-center text-gray-500`}>No services found</Text>
        )}
      />

      <TouchableOpacity 
        style={tw`absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg`}
        onPress={() => navigation.navigate("ActualServiceForm")}
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
    </View>
  );
};

const ServiceCard = ({ service, onView, onEdit, onDelete }) => {
  return (
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
        <TouchableOpacity onPress={onView} style={tw`p-2 mx-1`}>
          <Eye size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={tw`p-2 mx-1`}>
          <Edit size={20} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={tw`p-2 mx-1`}>
          <Trash size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActualServiceList;
