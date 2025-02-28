import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import tw from "twrnc";

const EarningsCard = ({ title, amount, bgColor, details = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = new Animated.Value(isExpanded ? 100 : 0);

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  return (
    <View style={tw`p-4 my-2 rounded-lg shadow bg-white`}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={tw`flex-row justify-between items-center`}
      >
        <View style={tw`flex-row items-center`}>
          <View
            style={[
              tw`w-10 h-10 rounded-md flex items-center justify-center`,
              bgColor,
            ]}
          >
            <Text>💰</Text>
          </View>
          <View style={tw`ml-3`}>
            <Text style={tw`text-gray-500 text-sm`}>{title}</Text>
            <Text style={tw`font-semibold text-lg`}>{amount}</Text>
          </View>
        </View>
        {isExpanded ? (
          <ChevronUp size={20} color="gray" />
        ) : (
          <ChevronDown size={20} color="gray" />
        )}
      </TouchableOpacity>

      {isExpanded && details.length > 0 && (
        <Animated.View
          style={[
            tw`mt-2 border-t border-gray-200`,
            { height: animatedHeight },
          ]}
        >
          {details.map((detail, index) => (
            <View key={index} style={tw`flex-row justify-between py-2`}>
              <Text style={tw`text-gray-600`}>{detail.label}</Text>
              <Text style={tw`font-medium`}>{detail.value}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export default EarningsCard;