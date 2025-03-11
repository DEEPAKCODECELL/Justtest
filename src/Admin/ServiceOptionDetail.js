import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../../tailwind";

const ServiceOptionDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [option, setOption] = useState<IServiceOption | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundOption = sampleServiceOptions.find((o) => o._id === id);
    setTimeout(() => {
      setOption(foundOption || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const confirmDelete = () => {
    Alert.alert("Delete Service Option", "Are you sure you want to delete this service option?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => {
        Alert.alert("Success", "Service option deleted successfully");
        navigation.navigate("ServiceOptions");
      }, style: "destructive" }
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  if (!option) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-100 p-4`}>
        <Text style={tw`text-lg font-semibold`}>Service Option Not Found</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ServiceOptions")} style={tw`mt-4 px-4 py-2 bg-blue-500 rounded`}> 
          <Text style={tw`text-white`}>Back to Service Options</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-200 bg-white`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#4F46E5" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold`}>{option.name}</Text>
        <View style={tw`flex-row space-x-2`}>
          <TouchableOpacity onPress={() => navigation.navigate("EditServiceOption", { id: option._id })}>
            <Icon name="pencil" size={20} color="#EAB308" />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete}>
            <Icon name="trash" size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={tw`p-4`}>
        <View style={tw`bg-white p-4 rounded-lg shadow-md`}> 
          <Text style={tw`text-xl font-semibold`}>{option.name}</Text>
          <Text style={tw`text-gray-600 mt-1`}>{option.description}</Text>
          <View style={tw`flex-row justify-between mt-4`}>
            <View>
              <Text style={tw`text-gray-500`}>Price</Text>
              <Text style={tw`text-lg font-semibold text-green-600`}>${option.price}</Text>
            </View>
            <View>
              <Text style={tw`text-gray-500`}>Duration</Text>
              <Text style={tw`text-lg font-semibold`}>{option.duration} mins</Text>
            </View>
          </View>
        </View>

        {option.images?.length > 0 && (
          <View style={tw`mt-4`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Images</Text>
            <ScrollView horizontal>
              {option.images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={tw`w-32 h-32 rounded-lg mr-2`} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceOptionDetail;
