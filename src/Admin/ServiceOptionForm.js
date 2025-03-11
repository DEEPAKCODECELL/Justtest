import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "react-native-image-picker";
import { Check } from "lucide-react-native";

const ServiceOptionForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, serviceId } = route.params || {};
  const isEditMode = Boolean(id && id !== "create");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    actualService: serviceId || "",
    name: "",
    price: "",
    discount_price: "",
    discount_type: "flat",
    duration: 30,
    upto: "",
    description: "",
    service_provider: "",
    images: [],
    rating: 0,
  });

  useEffect(() => {
    if (isEditMode && id) {
      // Fetch service option by id in a real app
      const optionToEdit = {}; // Replace with API call
      if (optionToEdit) {
        setForm(optionToEdit);
      } else {
        alert("Service option not found");
        navigation.goBack();
      }
    }
  }, [id, isEditMode, navigation]);

  const handleInputChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets) {
        setForm((prev) => ({ ...prev, images: [...prev.images, response.assets[0].uri] }));
      }
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.actualService || !form.service_provider) {
      alert("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert(isEditMode ? "Service option updated successfully" : "Service option created successfully");
      navigation.goBack();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <ScrollView contentContainerStyle={tw`p-4`}>  
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-semibold mb-1`}>Option Name*</Text>
        <TextInput
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
          style={tw`border px-3 py-2 rounded-lg`}
          placeholder="e.g., Basic Clean"
        />
      </View>
      
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-semibold mb-1`}>Price*</Text>
        <TextInput
          value={form.price}
          onChangeText={(value) => handleInputChange("price", value)}
          style={tw`border px-3 py-2 rounded-lg`}
          placeholder="99.99"
          keyboardType="numeric"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-semibold mb-1`}>Service*</Text>
        <RNPickerSelect
          onValueChange={(value) => handleInputChange("actualService", value)}
          items={[{ label: "Service 1", value: "1" }, { label: "Service 2", value: "2" }]}
          value={form.actualService}
          style={{ inputAndroid: tw`border px-3 py-2 rounded-lg` }}
        />
      </View>

      <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-lg`} onPress={handleImagePick}>
        <Text style={tw`text-white text-center`}>Pick Image</Text>
      </TouchableOpacity>

      <View style={tw`flex-row mt-4`}>
        {form.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={tw`w-16 h-16 rounded-lg mr-2`} />
        ))}
      </View>

      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full flex-row items-center`}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Check color="#fff" size={20} />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ServiceOptionForm;
