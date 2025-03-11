import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, 
  Image, ActivityIndicator, Alert 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker"; // ✅ Native image picker
import tw from "twrnc";

const ActualServiceForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};
  const isEditMode = Boolean(id && id !== "create");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    images: [],
    service: "",
    expert_is_trained_in: [],
    service_excludes: [],
    what_we_need_from_you: [],
  });

  useEffect(() => {
    if (isEditMode && id) {
      // Fetch service details from API or state
      const serviceToEdit = sampleActualServices.find((s) => s._id === id);
      if (serviceToEdit) {
        setForm(serviceToEdit);
      } else {
        Alert.alert("Error", "Service not found", [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
    }
  }, [id, isEditMode]);

  const handleInputChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = async () => {
    const options = { mediaType: "photo", quality: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, response.assets[0].uri],
        }));
      }
    });
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.service) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulating API call
      Alert.alert("Success", isEditMode ? "Service updated successfully" : "Service created successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Service Name*</Text>
      <TextInput 
        style={tw`border p-2 rounded`} 
        value={form.name} 
        onChangeText={(value) => handleInputChange("name", value)} 
        placeholder="e.g., Deep Cleaning" 
      />

      <Text style={tw`text-lg font-bold mt-4 mb-2`}>Service Category*</Text>
      {/* <Picker selectedValue={form.service} onValueChange={(value) => handleInputChange("service", value)}>
        <Picker.Item label="Select a service category" value="" />
        {sampleServices.map((service) => (
          <Picker.Item key={service._id} label={service.name} value={service._id} />
        ))}
          </Picker> */}
          <TextInput 
        style={tw`border p-2 rounded`} 
        value={form.name} 
        onChangeText={(value) => handleInputChange("service", value)} 
        placeholder="e.g., Deep Cleaning" 
      />

      <Text style={tw`text-lg font-bold mt-4 mb-2`}>Description</Text>
      <TextInput 
        style={tw`border p-2 rounded h-20`} 
        value={form.description} 
        onChangeText={(value) => handleInputChange("description", value)} 
        placeholder="Describe the service in detail" 
        multiline 
      />

      {/* Images Section */}
      <Text style={tw`text-lg font-bold mt-4 mb-2`}>Images</Text>
      <FlatList
        data={form.images}
        horizontal
        renderItem={({ item, index }) => (
          <View style={tw`mr-2`}>
            <Image source={{ uri: item }} style={tw`w-20 h-20 rounded`} />
            <TouchableOpacity 
              onPress={() => handleRemoveImage(index)} 
              style={tw`bg-red-500 px-2 py-1 mt-1 rounded`}
            >
              <Text style={tw`text-white text-center`}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleAddImage} style={tw`bg-blue-500 px-4 py-2 rounded mt-2`}>
        <Text style={tw`text-white text-center`}>Add Image</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity 
        onPress={handleSubmit} 
        disabled={isSubmitting} 
        style={tw`bg-green-500 px-6 py-2 rounded mt-4 flex-row items-center justify-center`}
      >
        {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={tw`text-white text-lg`}>{isEditMode ? "Update" : "Save"}</Text>}
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`bg-gray-500 px-6 py-2 rounded mt-2`}>
        <Text style={tw`text-white text-center`}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActualServiceForm;
