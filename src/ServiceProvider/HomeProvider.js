import React, { startTransition, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView,Switch, Alert } from "react-native";
import { BellIcon, CodeSquare, MenuIcon, UserIcon } from "lucide-react-native";
import { Svg, Line, Rect } from "react-native-svg";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ServiceSelectionScreen from "./ServiceSelection";
import { createAvailability, fetchProviders, updateAvailability } from "../redux/slices/ProviderSlice";
import LoadingBar from "./components/LoadingBar";
import useWebSocket from "../Hook/GetRealtimeLocation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useFetchLocationForProvider from "../Hook/src/Hook/UpdareRealTimeForProvider";

const HomeProvider = () => {
  const { location, error } = useFetchLocationForProvider(true,false);
  const providerId = useSelector((state) => state?.provider?.providers?.data?._id)
  const availability = useSelector((state) => state?.provider?.availability?.success);
  console.log("availability", availability);
  const socket = useWebSocket("http://192.168.173.18:4000",providerId);
  const { loading } = useSelector((state) => state?.provider)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(availability);
  const toggleOnlineStatus = async () => {
  try {
    const scopeIsOnline = isOnline;
    setIsOnline((prev) => !prev);

    const start_time = "08:00";
    const end_time = "20:00";
    const formattedDate = new Date().toString("en-US", { timeZone: "Asia/Kolkata" });
    const latitude = 12.926717298405626;
    const longitude = 77.6153102537844;

    let response;

    if (scopeIsOnline) {
      // If going offline, update availability
      response = await dispatch(updateAvailability({ latitude, longitude }));
    } else {
      // If going online, create availability
      response = await dispatch(createAvailability({ start_time, end_time, date: formattedDate, latitude, longitude }));
    }

    if (response?.payload) {
      console.log("Success:", response);
      Alert.alert("Success", scopeIsOnline ? "Availability updated successfully!" : "Availability created successfully!");
    } else {
      throw new Error("Failed to update/create availability.");
    }
  } catch (error) {
    console.error("Error:", error);
    Alert.alert("Error", error.message || "Something went wrong!");
  }
};

  useEffect(() => {
      setIsLoading(true);
      const getProvider = async () => {
        try {
          const result = await dispatch(fetchProviders());
          console.log("In HomeScreen to get user",result);
          if (!result?.payload) {
            console.log("Internal Server Error");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
    getProvider();
    setIsLoading(false);
  }, [dispatch]);
  if (isLoading) {
    return (
      <>
       <LoadingBar loading={isLoading}/>
      </>
    )
  }
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

        {/* Online Toggle Button */}
      <View style={tw`flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-semibold`}>{isOnline ? "Online" : "Offline"}</Text>
        <Switch
          value={isOnline}
          onValueChange={toggleOnlineStatus}
          trackColor={{ false: "#ccc", true: "#34D399" }} // Gray for offline, green for online
          thumbColor={isOnline ? "#10B981" : "#f4f4f4"} // Thumb color
        />
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
    </View>
  );
};
export default HomeProvider;
