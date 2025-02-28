import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "../../tailwind";

const ServiceModal = () => {
  const [selectedTab, setSelectedTab] = useState("Everyday Cleaning");

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-lg mt-4`}>
      {/* Tabs */}
      <View style={tw`flex-row justify-around border-b border-gray-300 pb-2`}>
        {["Everyday Cleaning", "Weekly Cleaning"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={tw`px-4 py-2 ${
              selectedTab === tab ? "border-b-2 border-purple-600" : ""
            }`}
          >
            <Text
              style={tw`${
                selectedTab === tab ? "text-purple-600 font-bold" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={tw`mt-4`}>
        {selectedTab === "Everyday Cleaning" ? (
          <View>
            <Text style={tw`text-lg font-bold`}>The expert is trained to</Text>
            <Text style={tw`text-gray-700 mt-2`}>✅ Sweep & mop accessible areas</Text>
            <Text style={tw`text-gray-700`}>✅ Dry dust/wet wipe furniture, fixtures, wardrobes</Text>
            <Text style={tw`text-gray-700`}>✅ Change or rearrange the bedding</Text>

            <Text style={tw`text-lg font-bold mt-4`}>Service excludes</Text>
            <Text style={tw`text-red-500 mt-2`}>❌ Sweeping & mopping inaccessible areas</Text>
            <Text style={tw`text-red-500`}>❌ Moving heavy furniture</Text>
          </View>
        ) : (
          <View>
            <Text style={tw`text-lg font-bold`}>The expert is trained to</Text>
            <Text style={tw`text-gray-700 mt-2`}>✅ Deep cleaning of all rooms</Text>
            <Text style={tw`text-gray-700`}>✅ Organizing and decluttering</Text>
            <Text style={tw`text-gray-700`}>✅ Washing curtains & deep dusting</Text>

            <Text style={tw`text-lg font-bold mt-4`}>Service excludes</Text>
            <Text style={tw`text-red-500 mt-2`}>❌ Cleaning outside windows</Text>
            <Text style={tw`text-red-500`}>❌ Heavy furniture shifting</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceModal;
