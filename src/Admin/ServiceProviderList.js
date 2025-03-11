import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import tw from "twrnc";
import moment from "moment";
import { CheckCircle } from "lucide-react-native";
import axios from "axios";
import apiClient from "../redux/api/apiClient";
import { useNavigation } from "@react-navigation/native";

const serviceImages = {
  "67a7990178809143300087b9": "https://via.placeholder.com/50/0000FF/FFFFFF?text=Cleaning", // Example service image
  // Add other service IDs and their images if needed
};

const ServiceProviderList = () => {
    const navigation=useNavigation();
  const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(serviceProviders);

  useEffect(() => {
     const fetchServiceProviders = async () => {
      try {
        const response = await apiClient.get("/service-provider/all");
          setServiceProviders(response.data.data);
          console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch service providers", error);
      } finally {
        setLoading(false);
      }
     }
    fetchServiceProviders();
  }, []);

  const handleAccept = (id) => {
      console.log(`Accepting service provider with ID: ${id}`);
      navigation.navigate("ProviderDetails",{id:id});
    // API call to accept provider (Implement backend logic)
  };

  const renderItem = ({ item }) => (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row`}>
      {/* Profile Image */}
      <Image source={{ uri: item.image }} style={tw`w-16 h-16 rounded-full`} />

      {/* Provider Details */}
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-bold`}>{item.name}</Text>
        <Text style={tw`text-gray-600`}>{item.email}</Text>
        <Text style={tw`text-gray-600`}>{item.phone}</Text>
        <Text style={tw`text-gray-500`}>Joined {moment(item.createdAt).format("MMM D, YYYY")}</Text>

        {/* Address */}
        <Text style={tw`text-gray-500`}>
          {item.address.street}, {item.address.city}, {item.address.state}, {item.address.country}
        </Text>
      </View>

      {/* Actual Service Image */}
      {item.actualService && serviceImages[item.actualService] && (
        <Image source={{ uri: serviceImages[item.actualService] }} style={tw`w-10 h-10 rounded`} />
      )}

      {/* Accept Button */}
      <TouchableOpacity onPress={() => handleAccept(item._id)} style={tw`p-2 bg-green-500 rounded-lg ml-2`}>
        <CheckCircle size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Service Providers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={serviceProviders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default ServiceProviderList;
// 
