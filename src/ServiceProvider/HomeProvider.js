import React from "react";
import Geolocation from "react-native-geolocation-service";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BellIcon, MenuIcon } from "lucide-react-native";
import { Svg, Line, Rect } from "react-native-svg";
import tw from "twrnc";
import useWebSocket from "../Hook/GetRealtimeLocation";

const HomeProvider = () => {
  const socket = useWebSocket("ws://10.159.17.18:4000", { name: "deepak", roll: 20 })
  const sendLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.current.send(JSON.stringify({ latitude, longitude, userId: "123" }));
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
   }; 
  useEffect(() => {
  const locationInterval = setInterval(sendLocation, 5000); // Send location every 5 seconds
  return () => clearInterval(locationInterval);
}, []); 
  return (
    <ScrollView style={tw`flex-1 bg-gray-100 px-4 pt-6`}>
      {/* Header */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
        <TouchableOpacity>
          <MenuIcon size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Online</Text>
              </TouchableOpacity>
         <TouchableOpacity>
          <Text>Offline</Text>
        </TouchableOpacity>     
        <TouchableOpacity style={tw`flex-row items-center`}>
          <View
            style={tw`w-8 h-8 bg-gray-200 rounded-full justify-center items-center`}
          >
            <Text style={tw`text-sm font-bold`}>0</Text>
          </View>
          <BellIcon size={24} color="black" style={tw`ml-3`} />
        </TouchableOpacity>
      </View>

      {/* Money Card */}
      <View style={tw`bg-green-100 p-5 rounded-xl shadow-md mb-4`}>
        <Text style={tw`text-green-700 text-2xl font-bold`}>₹0</Text>
        <Text style={tw`text-gray-700 text-lg`}>Earned this month</Text>

        {/* Chart */}
        <Svg height="50" width="100%">
          {[...Array(6)].map((_, index) => (
            <Rect
              key={index}
              x={index * 40}
              y={15}
              width="30"
              height="25"
              fill="green" // Darker green
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
          <TouchableOpacity>
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

      {/* Bottom Navigation */}
      <View
        style={tw`flex-row justify-between bg-white py-4 px-6 rounded-t-xl shadow-md`}
      >
        {["Progress", "Money", "Around You", "UC", "Cult"].map(
          (item, index) => (
            <TouchableOpacity key={index} style={tw`flex items-center`}>
              <View
                style={tw`${
                  item === "Money" ? "bg-black px-4 py-2 rounded-full" : ""
                }`}
              >
                <Text
                  style={tw`text-gray-800 ${
                    item === "Money" ? "text-white font-semibold" : ""
                  }`}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
    </ScrollView>
  );
};

export default HomeProvider;