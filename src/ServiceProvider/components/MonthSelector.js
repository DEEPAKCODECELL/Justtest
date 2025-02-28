import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import tw from "twrnc";

const MonthSelector = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <View style={tw`flex-row justify-between items-center px-4 py-2`}>
      <TouchableOpacity onPress={onPrevMonth} style={tw`p-2`}>
        <ChevronLeft size={24} />
      </TouchableOpacity>

      <Text style={tw`text-xl font-semibold`}>
        {currentMonth} {currentYear}
      </Text>

      <TouchableOpacity onPress={onNextMonth} style={tw`p-2`}>
        <ChevronRight size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default MonthSelector;