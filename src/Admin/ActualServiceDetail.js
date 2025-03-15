import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Plus, Wrench, ImageOff } from "lucide-react-native";
import Toast from "react-native-toast-message";
import ServiceOptionList from "./ServiceOptionList";
import { ConfirmDeleteDialog } from "./AllComponenetForAdmin";
import tw from "../../tailwind";
import { useDispatch } from "react-redux";
import { fetchServicesDetails } from "../redux/slices/serviceSlice";
import { CreateService } from "./AllCrudForAdmin";
import { BlurView } from "@react-native-community/blur";

const ActualServiceDetail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = route.params;
  console.log("id me ja", id);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const response = await dispatch(fetchServicesDetails({ id }));
      setLoading(false);

      if (response?.payload?.success) {
        setService(response.payload.data);
      } else {
        setService(null);
      }
    };
    getDetails();
  }, [id]);

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    Toast.show({ type: "success", text1: "Service deleted successfully" });
    navigation.navigate("ActualServices");
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100 p-4`}>
        <Text style={tw`text-xl font-medium text-center mb-2`}>Service Not Found</Text>
        <Text style={tw`text-gray-500 text-center mb-4`}>
          The service you're looking for doesn't exist or has been removed.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ActualServices")}
          style={tw`bg-blue-600 px-4 py-2 rounded-lg`}
        >
          <Text style={tw`text-white`}>Back to Services</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sections = [
    { type: "header" },
    { type: "image" },
    { type: "description" },
    { type: "category" },
    { type: "options_header" },
    { type: "options_list" },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "header":
        return (
          <>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-2xl font-bold text-gray-900`}>{service.name}</Text>
            </View>
          </>
        );

      case "image":
        return (
          <View style={tw`w-full h-52 rounded-lg overflow-hidden mb-4 bg-gray-200`}>
            {service.images?.length > 0 ? (
              <Image source={{ uri: service.images[0] }} style={tw`w-full h-full`} resizeMode="cover" />
            ) : (
              <View style={tw`flex-1 justify-center items-center`}>
                <ImageOff size={50} color="#9CA3AF" />
                <Text style={tw`text-gray-500`}>No Image Available</Text>
              </View>
            )}
          </View>
        );

      case "description":
        return (
          <View style={tw`p-4 bg-gray-100 rounded-lg mb-6`}>
            <Text style={tw`text-lg text-gray-700 mb-2`}>{service.description || "No description provided"}</Text>
          </View>
        );

      case "category":
        return (
          <View style={tw`flex-row items-center bg-gray-50 p-3 rounded-lg mb-4`}>
            <Wrench size={18} color="#4b5563" style={tw`mr-2`} />
            <Text style={tw`text-gray-600`}>Category: {service.category || "N/A"}</Text>
          </View>
        );

      case "options_header":
        return (
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-medium text-gray-900`}>Actual Services List</Text>
            <TouchableOpacity
              onPress={() => { setIsModalVisible(true); }}
              style={tw`flex-row items-center bg-blue-600 px-4 py-2 rounded-lg`}
            >
              <Plus size={20} color="#fff" style={tw`mr-2`} />
              <Text style={tw`text-white font-medium`}>Add Actual Services</Text>
            </TouchableOpacity>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={tw`flex-1 bg-gray-100`}>
                <CreateService serviceId={service._id} setIsModalVisible={setIsModalVisible}/>
              </View>
            </Modal>
          </View>
        );

      case "options_list":
        return <ServiceOptionList serviceId={service._id} />;

      default:
        return null;
    }
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.type}
      renderItem={renderItem}
      contentContainerStyle={tw`p-1`}
      ListFooterComponent={
        <ConfirmDeleteDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Service"
          description="Are you sure you want to delete this service? This action cannot be undone and will also delete all associated service options."
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ActualServiceDetail;
