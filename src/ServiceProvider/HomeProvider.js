import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BellIcon, MenuIcon, UserIcon } from "lucide-react-native";
import { Svg, Line, Rect } from "react-native-svg";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const HomeProvider = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Main Content Scrollable */}
      <ScrollView style={tw`flex-1 px-4 pt-6 mb-16`}>
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <TouchableOpacity>
            <MenuIcon size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <View
              style={tw`w-8 h-8 bg-gray-200 rounded-full justify-center items-center`}
            >
              <Text style={tw`text-sm font-bold`}>0</Text>
            </View>
            <BellIcon
              size={24}
              color="black"
              style={tw`ml-3`}
              onPress={() => navigation.navigate("NotificationScreen")}
            />
          </TouchableOpacity>
        </View>

        {/* Earnings */}
        <View style={tw`bg-green-100 p-5 rounded-xl shadow-md mb-4 relative`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text style={tw`text-green-700 text-2xl font-bold`}>₹0</Text>
              <Text style={tw`text-gray-700 text-lg`}>Earned this month</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EarningsScreen")}
            >
              <Text style={tw`text-2xl text-gray-500`}>→</Text>
            </TouchableOpacity>
          </View>

          <Svg height="50" width="100%">
            {[...Array(6)].map((_, index) => (
              <Rect
                key={index}
                x={index * 40}
                y={15}
                width="30"
                height="25"
                fill="green"
              />
            ))}
            <Line
              x1="5"
              y1="40"
              x2="100%"
              y2="40"
              stroke="black"
              strokeWidth="1"
            />
          </Svg>

          {/* Months */}
          <View style={tw`flex-row justify-between mt-2`}>
            {["Sept", "Oct", "Nov", "Dec", "Jan", "Feb"].map((month, index) => (
              <Text
                key={index}
                style={tw`text-gray-700 ${
                  month === "Feb" ? "font-bold underline" : ""
                }`}
              >
                {month}
              </Text>
            ))}
          </View>
        </View>

        {/* Bank Transfers */}
        <View style={tw`bg-white p-5 rounded-xl shadow-md mb-4`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>
            Bank transfers
          </Text>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-xl font-bold text-gray-900`}>₹0</Text>
              <Text style={tw`text-gray-600`}>13 - 16 Feb</Text>
              <Text style={tw`text-gray-500 text-sm`}>Upcoming</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("BankTransfersScreen")}
            >
              <Text style={tw`text-blue-600 font-semibold`}>See all →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pending Deductions */}
        <View style={tw`bg-white p-5 rounded-xl shadow-md mb-4`}>
          <Text style={tw`text-gray-600 text-sm`}>PENDING DEDUCTIONS</Text>
          <Text style={tw`text-xl font-bold text-gray-900`}>₹0</Text>
        </View>

        {/* Loans & Recoveries */}
        <View style={tw`bg-white p-5 rounded-xl shadow-md mb-4`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>
            Loans & Recoveries
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation Fixed */}
      <View
        style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-between px-2 py-3`}
      >
        <TouchableOpacity
          style={tw`flex-1 items-center`}
          onPress={() => navigation.navigate("HomeProvider")}
        >
          <Text style={tw`text-lg`}>📊</Text>
          <Text style={tw`text-xs text-gray-500`}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex-1 items-center`}>
          <Text style={tw`text-lg`}>💰</Text>
          <Text style={tw`text-xs text-gray-500`}>Money</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 items-center`}
          onPress={() => navigation.navigate("AroundYou")}
        >
          <View
            style={tw`w-8 h-8 rounded-full bg-amber-100 items-center justify-center`}
          >
            <Text style={tw`text-amber-800 font-bold`}>UC</Text>
          </View>
          <Text style={tw`text-xs text-amber-800 font-medium`}>Around You</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex-1 items-center`}>
          <Text style={tw`text-lg`}>🔄</Text>
          <Text style={tw`text-xs text-gray-500`}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 items-center justify-center`}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <View style={tw`h-6 justify-center`}>
            <UserIcon size={22} color="black" />
          </View>
          <Text style={tw`text-xs text-gray-500`}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeProvider;