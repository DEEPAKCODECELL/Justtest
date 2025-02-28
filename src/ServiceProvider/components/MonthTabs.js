import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";

const MonthTabs = ({ tabs, onSelectTab }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`px-2 py-3 bg-gray-50`}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={tw`${
            tab.isActive ? "bg-blue-500" : "bg-gray-300"
          } px-4 py-2 rounded-full mx-1`}
          onPress={() => onSelectTab(tab.name)}
        >
          <Text
            style={tw`${
              tab.isActive ? "text-white" : "text-black"
            } text-sm font-semibold`}
          >
            {tab.shortName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MonthTabs;