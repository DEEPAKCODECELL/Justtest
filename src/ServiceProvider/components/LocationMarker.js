import React from "react";
import { View } from "react-native";
import tw from "twrnc";

const LocationMarker = () => {
  return (
    <View style={tw`relative items-center justify-center`}>
      {/* Outer ripple effect */}
      <View style={tw`absolute w-32 h-32 bg-blue-200 opacity-30 rounded-full`} />
      
      {/* Inner circle */}
      <View style={tw`w-20 h-20 bg-blue-500 rounded-full items-center justify-center shadow-lg`}>
        {/* Center dot */}
        <View style={tw`w-4 h-4 bg-white rounded-full`} />
      </View>
    </View>
  );
};

export default LocationMarker;
