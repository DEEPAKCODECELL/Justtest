import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "twrnc";
import { CheckSquare, ChevronDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [work, setWork] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [workModalVisible, setWorkModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const workOptions = ["Electrician", "Plumber", "Cleaner", "Painter"];
  const cityOptions = ["Mumbai", "Delhi", "Bangalore", "Kolkata"];

  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-6`}>
        {/* Header Section */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-yellow-600 font-semibold`}>
            ✨ Few more steps to see your earnings!
          </Text>
        </View>

        {/* Title */}
        <Text style={tw`text-2xl font-bold mb-4`}>Tell us about yourself!</Text>

        {/* Name Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700`}>What's your name?</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 text-lg mt-2`}
            placeholder="Enter your name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
          />
          <Text style={tw`text-sm text-red-600 mt-1`}>
            Special characters like !@#$%^&*()_+= are not allowed
          </Text>
        </View>

        {/* Work Selection */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700`}>What work do you do?</Text>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-lg p-3 flex-row justify-between items-center mt-2`}
            onPress={() => setWorkModalVisible(true)}
          >
            <Text style={tw`text-lg ${work ? "text-black" : "text-gray-500"}`}>
              {work || "Select work"}
            </Text>
            <ChevronDown size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* City Selection */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700`}>Where do you live?</Text>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-lg p-3 flex-row justify-between items-center mt-2`}
            onPress={() => setCityModalVisible(true)}
          >
            <Text style={tw`text-lg ${city ? "text-black" : "text-gray-500"}`}>
              {city || "Select city"}
            </Text>
            <ChevronDown size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Work Modal */}
        <Modal visible={workModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setWorkModalVisible(false)}>
            <View style={tw`flex-1 justify-center bg-black/50`}>
              <TouchableWithoutFeedback>
                <View style={tw`bg-white p-4 rounded-lg m-6`}>
                  <Text style={tw`text-lg font-bold mb-4`}>Select Work</Text>
                  <FlatList
                    data={workOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={tw`p-3 border-b border-gray-300`}
                        onPress={() => {
                          setWork(item);
                          setWorkModalVisible(false);
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

        {/* City Modal */}
        <Modal visible={cityModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setCityModalVisible(false)}>
            <View style={tw`flex-1 justify-center bg-black/50`}>
              <TouchableWithoutFeedback>
                <View style={tw`bg-white p-4 rounded-lg m-6`}>
                  <Text style={tw`text-lg font-bold mb-4`}>Select City</Text>
                  <FlatList
                    data={cityOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={tw`p-3 border-b border-gray-300`}
                        onPress={() => {
                          setCity(item);
                          setCityModalVisible(false);
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

        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => setAgreed(!agreed)}>
            <CheckSquare size={20} color={agreed ? "blue" : "gray"} />
          </TouchableOpacity>
          <Text style={tw`ml-2 text-gray-700`}>
            By proceeding, you agree to Urban Company's{" "}
            <Text style={tw`text-blue-600 font-semibold`}>
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text style={tw`text-blue-600 font-semibold`}>Privacy Policy</Text>.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={tw`bg-blue-600 p-4 rounded-lg`}
          disabled={!name || !work || !city || !agreed}
        >
          <Text
            style={tw`text-white text-center text-lg font-semibold`}
            onPress={() => navigation.navigate("ServiceSelection")}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileSetup;