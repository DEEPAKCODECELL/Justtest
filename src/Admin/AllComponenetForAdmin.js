import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Modal } from "react-native";
import { IconName } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../tailwind";

export const PageHeader = ({ title, backUrl, action }) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-row items-center justify-between w-full py-4 px-4 border-b`}> 
      <View style={tw`flex-row items-center`}> 
        {backUrl && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
            <IconName name="arrow-left" size={20} />
          </TouchableOpacity>
        )}
        <Text style={tw`text-2xl font-medium`}>{title}</Text>
      </View>
      {action}
    </View>
  );
};

export const FloatingActionButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full items-center justify-center shadow-lg`}>
      {icon}
    </TouchableOpacity>
  );
};

export const Card = ({ children }) => {
  return <View style={tw`p-4 bg-white rounded-lg shadow`}>{children}</View>;
};

export const EmptyState = ({ title, description, action }) => {
  return (
    <View style={tw`items-center justify-center py-12 px-4 text-center`}>
      <IconName name="alert-circle" size={24} color="blue" />
      <Text style={tw`text-xl font-medium`}>{title}</Text>
      <Text style={tw`text-gray-500 text-center`}>{description}</Text>
      {action && <View style={tw`mt-2`}>{action}</View>}
    </View>
  );
};

export const ImageUploadPreview = ({ images = [], onAddImage, onRemoveImage, maxImages = 5 }) => {
  return (
    <View style={tw`gap-3`}>
      <Text style={tw`text-sm font-medium`}>Images ({images.length}/{maxImages})</Text>
      <View style={tw`flex-row flex-wrap gap-3`}>
        {images.map((src, index) => (
          <View key={index} style={tw`relative h-24 w-24`}> 
            <Image source={{ uri: src }} style={tw`h-24 w-24 rounded-lg`} />
            <TouchableOpacity onPress={() => onRemoveImage(index)} style={tw`absolute top-1 right-1 bg-black/50 p-1 rounded-full`}>
              <IconName name="x" size={14} color="white" />
            </TouchableOpacity>
          </View>
        ))}
        {images.length < maxImages && (
          <TouchableOpacity onPress={onAddImage} style={tw`h-24 w-24 border-dashed border-2 rounded-lg items-center justify-center`}>
            <IconName name="camera" size={20} color="blue" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const ConfirmDeleteDialog = ({ isOpen, onClose, onConfirm, title = "Delete Item", description = "Are you sure?" }) => {
  return (
    <Modal visible={isOpen} transparent>
      <View style={tw`flex-1 bg-black/50 items-center justify-center p-4`}>
        <View style={tw`bg-white p-6 rounded-xl w-full max-w-md`}>
          <Text style={tw`text-xl font-semibold`}>{title}</Text>
          <Text style={tw`mt-2 text-gray-500`}>{description}</Text>
          <View style={tw`mt-6 flex-row justify-end gap-2`}>
            <TouchableOpacity onPress={onClose} style={tw`px-4 py-2 border rounded`}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onConfirm(); onClose(); }} style={tw`px-4 py-2 bg-red-500 text-white rounded`}>
              <Text style={tw`text-white`}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <View style={tw`relative w-full`}> 
      <IconName name="search" size={18} style={tw`absolute left-3 top-1/2`} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={tw`w-full pl-10 pr-4 py-2 border rounded-full bg-white`}
      />
    </View>
  );
};
