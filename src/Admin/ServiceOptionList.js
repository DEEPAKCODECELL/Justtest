import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Eye, Edit, Trash, Plus } from "lucide-react-native";
import tw from "../../tailwind";
import { useDispatch } from "react-redux";
import { getActualServiceDetals } from "../redux/slices/serviceSlice";
const ServiceOptionList = ({ serviceId }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const response = await dispatch(getActualServiceDetals({ id:serviceId }));
      if (response.payload.success) {
        console.log("response.payload.data", response.payload.data)
        setServices(response.payload.data);
      } else {
        console.log("response now", response)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [dispatch, serviceId]);


  const handleDelete = (id) => {
    Alert.alert(
      "Delete Service Option",
      "Are you sure you want to delete this service option?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            setServices((prev) => prev.map(service => ({
              ...service,
              options: service.options.filter(option => option._id !== id),
            })));
            Alert.alert("Success", "Service option deleted successfully");
          },
          style: "destructive",
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ActualServiceCard
            actual_service={item}
            onEdit={() => navigation.navigate("ServiceOptionEdit", { id: item._id })}
            onDelete={() => handleDelete(item._id)}
          />
        )}
        ListEmptyComponent={
          <View style={tw`mt-20 w-full`}>
            <Text style={tw`text-lg text-gray-500`}>No service options found</Text>
            <TouchableOpacity
              style={tw`flex-row items-center bg-blue-500 px-4 py-2 rounded-lg mt-4`}
              onPress={() => navigation.navigate("ServiceOptionCreate", { serviceId })}
            >
              <Plus name="plus" size={18} color="#fff" />
              <Text style={tw`text-white ml-2`}>Add Option</Text>
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


  const ActualServiceCard = ({ actual_service, onEdit, onDelete }) => {
    console.log("ActualService check", actual_service);

    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        {/* Service Name */}
        <Text style={tw`text-2xl font-bold text-gray-800`}>{actual_service.name}</Text>
        <Text style={tw`text-xl text-gray-600 mt-1`}>{actual_service.description}</Text>

        {/* Service Images */}
        <View style={tw`flex-row mt-2`}>
          {actual_service.images?.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={tw`w-full h-60 rounded-lg mr-2`}
            />
          ))}
        </View>

        {/* Service Excludes */}
        {actual_service.service_excludes.length > 0 && (
          <View style={tw`mt-2`}>
            <Text style={tw`text-xl font-semibold text-red-500`}>Service Excludes:</Text>
            {actual_service.service_excludes.map((item, index) => (
              <Text key={index} style={tw`text-xl text-gray-700`}>{index+1} {item}</Text>
            ))}
          </View>
        )}

        {/* What We Need From You */}
        {actual_service.what_we_need_from_you?.length > 0 && (
          <View style={tw`mt-2`}>
            <Text style={tw`text-xl font-semibold text-blue-500`}>What We Need From You:</Text>
            {actual_service.what_we_need_from_you.map((item,index) => (
              <>
                <Text style={tw`text-xl text-gray-700`}>{index+1}  {item.description}</Text>
              </>
            ))}
          </View>
        )}

        {/* service_excludes */}

        {actual_service.service_excludes.length > 0 && (
          <View style={tw`mt-2`}>
            <Text style={tw`text-xl font-semibold text-blue-500`}>service_excludes:</Text>
            {actual_service.service_excludes.map((item, index) => (
                <Text style={tw`text-xl text-gray-700`}>{index + 1}  {item}</Text>
            ))}
          </View>
        )}


        {/* Service Options */}
        {actual_service.options.length > 0 && (
          <View style={tw`mt-5 w-full`}>
            <Text style={tw`text-2xl font-bold  text-green-600`}>Available Options:</Text>
            {actual_service.options.map((option) => (
              <View key={option._id} style={tw`bg-gray-100 p-2 rounded-lg mt-2`}>
                <Text style={tw` text-xl font-semibold`}>{option.name}</Text>
                <Text style={tw`text-xl text-gray-600`}>{option.description}</Text>

                {/* Price & Discount */}
                <View style={tw`flex-row items-center justify-between mt-3 mb-3`}>
                  <Text style={tw`text-xl text-green-700 font-bold`}>
                    ₹{option.price / 100}
                    {option.discount_price > 0 && (
                      <Text style={tw`text-xl text-red-500 line-through  px-3`}>
                        ₹{option.discount_type === "percent"
                          ? ((option.price * option.discount_price) / 100 / 100).toFixed(2)
                          : option.discount_price / 100}
                      </Text>
                    )}
                  </Text>
                  <Text style={tw`text-xl bg-blue-100 px-2 py-1 rounded-full  ml-2`}>
                    {option.duration} min
                  </Text>
                </View>

                {/* discount_type */}
                <View style={tw`flex-row items-center justify-between mt-3 mb-3`}>
                  <Text style={tw`text-xl text-green-700 font-bold`}>
                    {option.discount_type.toUpperCase()}
                  </Text>
                  <Text style={tw`text-xl bg-blue-100 px-2 py-1 rounded-full  ml-2`}>
                    {option.discount_type.toUpperCase() == "FLAT" ? (option.discount_price) / 100 : (`${option.discount_price}%`)}
                  </Text>
                </View>

                {/* Option Images */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-2`}>
                  <View style={tw`flex-row`}>
                    {option.images.map((img, index) => (
                      <Image key={index} source={{ uri: img }} style={tw`w-85 h-60 rounded-lg mr-4`} resizeMode="contains" />
                    ))}
                  </View>
                </ScrollView>
              </View>
            ))}
          </View>
        )}

        {/* Edit & Delete Buttons */}
        <View style={tw`flex-row justify-end mt-4`}>
          <TouchableOpacity onPress={onEdit} style={tw`p-2 rounded-full mr-2`}>
            <Edit name="edit" size={18} color="#FFA500" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={tw`p-2 rounded-full`}>
            <Trash name="trash" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


export default ServiceOptionList;
