import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { ChevronDown, CheckSquare } from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker";
import tw from "../tailwind";

const GlobalForm = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.default || "" }), {})
  );
  const [modalVisible, setModalVisible] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const pickImage = (name) => {
        console.log("image clicked");  
    const options = {
      mediaType: "photo",
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const uploadedImageUrl = response.assets[0].uri;
        setFormData((prev) => ({
          ...prev,
          [name]: [...(prev[name] || []), uploadedImageUrl],
        }));
      }
    });
  };

  return (
    <View style={tw`p-6`}>
      {fields.map((field) => (
        <View key={field.name} style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700 mb-2`}>{field.label}</Text>
          {field.type === "text" && (
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 text-lg`}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChangeText={(text) => handleInputChange(field.name, text)}
            />
          )}
          {field.type === "dropdown" && (
            <TouchableOpacity
              style={tw`border border-gray-300 rounded-lg p-3 flex-row justify-between items-center`}
              onPress={() => setModalVisible(field.name)}
            >
              <Text style={tw`text-lg ${formData[field.name] ? "text-black" : "text-gray-500"}`}>
                {formData[field.name] || field.placeholder}
              </Text>
              <ChevronDown size={20} color="gray" />
            </TouchableOpacity>
          )}
          {field.type === "checkbox" && (
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => handleInputChange(field.name, !formData[field.name])}
            >
              <CheckSquare size={20} color={formData[field.name] ? "blue" : "gray"} />
              <Text style={tw`ml-2 text-gray-700`}>{field.placeholder}</Text>
            </TouchableOpacity>
          )}
          {field.type === "file" && (
            <>
              <TouchableOpacity
                style={tw`p-3 bg-gray-200 rounded-lg items-center`}
                onPress={() => pickImage(field.name)}
              >
                <Text style={tw`text-gray-700`}>Select Image</Text>
              </TouchableOpacity>
              {formData[field.name]?.length > 0 && (
                <View style={tw`mt-2`}>
                  {formData[field.name].map((imageUri, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageUri }}
                      style={tw`w-20 h-20 rounded-lg mt-2`}
                    />
                  ))}
                </View>
              )}
            </>
          )}

          {field.type === "dropdown" && modalVisible === field.name && (
            <Modal visible transparent animationType="fade">
              <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
                <View style={tw`flex-1 justify-center bg-black/50`}>
                  <TouchableWithoutFeedback>
                    <View style={tw`bg-white p-4 rounded-lg m-6`}>
                      <Text style={tw`text-lg font-bold mb-4`}>Select {field.label}</Text>
                      <FlatList
                        data={field.options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={tw`p-3 border-b border-gray-300`}
                            onPress={() => {
                              handleInputChange(field.name, item);
                              setModalVisible(null);
                            }}
                          >
                            <Text style={tw`text-lg`}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={tw`bg-blue-600 p-4 rounded-lg mt-4`}
        onPress={() => onSubmit(formData)}
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>{buttonText || "Submit"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GlobalForm;
