import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { FAB } from "react-native-paper";
import tw from "../../tailwind";

// Sample Data
const sampleServiceOptions = [
  { _id: "1", name: "Standard Cleaning", price: 50, discount_price: 60, duration: 60, actualService: "101" },
  { _id: "2", name: "Deep Cleaning", price: 80, duration: 90, actualService: "102" },
];
const sampleActualServices = [{ _id: "101", name: "Home Cleaning" }, { _id: "102", name: "Office Cleaning" }];

const ServiceOptionList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceId } = route.params || {};

  const [options, setOptions] = useState(sampleServiceOptions);

  const filteredOptions = serviceId
    ? options.filter((option) => option.actualService === serviceId)
    : options;

  const serviceName = serviceId
    ? sampleActualServices.find((s) => s._id === serviceId)?.name
    : null;

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Service Option",
      "Are you sure you want to delete this service option?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            setOptions(options.filter((o) => o._id !== id));
            Alert.alert("Success", "Service option deleted successfully");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      {serviceId && serviceName && (
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 bg-gray-200 rounded-full mr-2`}>
            <Icon name="arrow-left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-bold`}>Options for {serviceName}</Text>
        </View>
      )}

      <FlatList
        data={filteredOptions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <OptionCard
            option={item}
            onView={() => navigation.navigate("ServiceOptionDetails", { id: item._id })}
            onEdit={() => navigation.navigate("ServiceOptionEdit", { id: item._id })}
            onDelete={() => handleDelete(item._id)}
          />
        )}
        ListEmptyComponent={
          <View style={tw`items-center mt-20`}>
            <Text style={tw`text-lg text-gray-500`}>No service options found</Text>
            <TouchableOpacity
              style={tw`flex-row items-center bg-blue-500 px-4 py-2 rounded-lg mt-4`}
              onPress={() => navigation.navigate("ServiceOptionCreate", { serviceId })}
            >
              <Icon name="plus" size={18} color="#fff" />
              <Text style={tw`text-white ml-2`}>Add Option</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <FAB
        style={tw`absolute bottom-6 right-6 bg-blue-500`}
        icon="plus"
        onPress={() => navigation.navigate("ServiceOptionCreate", { serviceId })}
      />
    </View>
  );
};

const OptionCard = ({ option, onView, onEdit, onDelete }) => {
  const actualService = sampleActualServices.find((s) => s._id === option.actualService);

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-bold`}>{option.name}</Text>
        {option.rating && <Text style={tw`bg-yellow-200 px-2 py-1 rounded text-xs`}>★ {option.rating}</Text>}
      </View>

      <View style={tw`flex-row flex-wrap mt-2`}>
        <Text style={tw`bg-gray-100 px-2 py-1 rounded-full text-xs mr-2`}>{actualService?.name || "Unknown Service"}</Text>
        <Text style={tw`text-green-700 font-bold`}>
          ${option.price}
          {option.discount_price && <Text style={tw`text-red-500 line-through ml-1`}>${option.discount_price}</Text>}
        </Text>
        <Text style={tw`bg-blue-100 px-2 py-1 rounded-full text-xs ml-2`}>{option.duration} min</Text>
      </View>

      {option.description && <Text style={tw`text-sm text-gray-600 mt-2`}>{option.description}</Text>}

      <View style={tw`flex-row justify-end mt-4`}>
        <TouchableOpacity onPress={onView} style={tw`p-2 rounded-full mr-2`}>
          <Icon name="eye" size={18} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={tw`p-2 rounded-full mr-2`}>
          <Icon name="edit" size={18} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={tw`p-2 rounded-full`}>
          <Icon name="trash" size={18} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceOptionList;
