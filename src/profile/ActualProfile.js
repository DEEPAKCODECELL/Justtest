import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Edit, Trash, ChevronRight, Plus, Wrench } from "lucide-react-native";
import Toast from "react-native-toast-message";
import ServiceOptionList from "./ServiceOptionList";
import { ConfirmDeleteDialog } from "./AllComponenetForAdmin";
import tw from "../../tailwind";

const ActualServiceDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const foundService = sampleActualServices.find((s) => s._id === id);
    setTimeout(() => {
      setService(foundService || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    Toast.show({ type: "success", text1: "Service deleted successfully" });
    navigation.navigate("ActualServices");
  };

  const parentService = service?.service ? sampleServices.find((s) => s._id === service.service) : null;
  const serviceOptionCount = sampleServiceOptions.filter((o) => o.actualService === id).length;

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
        <Text style={tw`text-gray-500 text-center mb-4`}>The service you're looking for doesn't exist or has been removed.</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ActualServices")} style={tw`bg-blue-600 px-4 py-2 rounded-lg`}>
          <Text style={tw`text-white`}>Back to Services</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-2xl font-bold`}>{service.name}</Text>
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity onPress={() => navigation.navigate("EditService", { id: service._id })}>
            <Edit size={24} color="#f59e0b" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Trash size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
      {service.images?.length > 0 && (
        <Image source={{ uri: service.images[0] }} style={tw`w-full h-48 rounded-lg mb-4`} />
      )}
      <Text style={tw`text-lg text-gray-600 mb-4`}>{service.description || "No description provided"}</Text>
      {parentService && (
        <View style={tw`flex-row items-center mb-2`}>
          <Wrench size={16} color="#4b5563" style={tw`mr-2`} />
          <Text style={tw`text-gray-600`}>Category: {parentService.name}</Text>
        </View>
      )}
      <Text style={tw`text-lg font-medium mb-2`}>Service Options ({serviceOptionCount})</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateServiceOption", { serviceId: service._id })} style={tw`flex-row items-center bg-blue-600 px-4 py-2 rounded-lg mb-4`}>
        <Plus size={20} color="#fff" style={tw`mr-2`} />
        <Text style={tw`text-white`}>Add Option</Text>
      </TouchableOpacity>
      <ServiceOptionList serviceId={service._id} />
      <ConfirmDeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone and will also delete all associated service options."
      />
    </ScrollView>
  );
};

export default ActualServiceDetail;
