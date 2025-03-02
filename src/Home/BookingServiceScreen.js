import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import tw from "../../tailwind";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvidersWithinRadius, fetchServiceOption } from "../redux/slices/serviceSlice";

const ChooseService = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userlatlong = useSelector((state) => state.user?.user?.data?.address?.location?.coordinates || []);
  const route = useRoute();
  const { serviceId, serviceName, isScheduled } = route.params || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [durations, setDurations] = useState([]);
  const [isPM, setIsPM] = useState(false);

  const times = useMemo(() => [
    "12:00", "12:30", "01:00", "01:30", "02:00", "02:30",
    "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  ], []);

  const generateNextDays = useCallback((numDays = 4) => {
    const currentDates = [];
    const today = new Date();
    const options = { weekday: "short" };

    for (let i = 0; i < numDays; i++) {
      let iterDate = new Date(today);
      iterDate.setDate(today.getDate() + i);

      currentDates.push({
        day: iterDate.toLocaleDateString("en-US", options),
        date: iterDate.getDate().toString(),
      });
    }

    setDates(currentDates);
    setSelectedDate(currentDates[0]?.date);
  }, []);

  const fetchServiceData = useCallback(async () => {
    if (!serviceId || userlatlong.length < 2) return;

    try {
      const response = await dispatch(fetchServiceOption(serviceId));
      if (response?.payload?.data) {
        setDurations(response.payload.data);
        
        await dispatch(fetchProvidersWithinRadius({
          latitude: userlatlong[0],
          longitude: userlatlong[1],
          radius: 4000,
          serviceId:"67a7990178809143300087bc"
        }));
      } else {
        setDurations([]);
        console.error("Failed to fetch service options.");
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }, [dispatch, serviceId, userlatlong]);

  useEffect(() => {
    generateNextDays();
    fetchServiceData();
  }, [fetchServiceData, generateNextDays]);

  return (
    <View style={tw`flex-1 bg-white p-3`}>
      
      {/* Header */}
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold ml-2`}>Choose service details</Text>
      </View>

      {/* Date Selection */}
      <View style={tw`border-2 border-gray-200 rounded p-4 mt-3`}>
        <Text style={tw`text-lg font-semibold mb-3 text-gray-800`}>Select Date of Service</Text>
        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item) => item.date}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`items-center px-4 py-3 mx-2 rounded-lg border ${
                selectedDate === item.date ? "bg-purple-600 border-purple-600" : "border-gray-300"
              }`}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text style={tw`text-center text-sm ${selectedDate === item.date ? "text-white font-bold" : "text-gray-500"}`}>
                {item.day.toUpperCase()}
              </Text>
              <Text style={tw`text-center text-lg ${selectedDate === item.date ? "text-white font-bold" : "text-gray-800"}`}>
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Duration Selection */}
      <View style={tw`mt-5 border-2 border-gray-300 rounded p-3`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Select duration of service</Text>
        <FlatList
          data={durations}
          keyExtractor={(item) => item.duration.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-2`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`px-4 py-3 mx-2 rounded-lg border ${
                selectedDuration === item.duration ? "bg-purple-200 border-purple-600" : "border-gray-300"
              }`}
              onPress={() => setSelectedDuration(item.duration)}
            >
              <Text style={tw`text-center ${selectedDuration === item.duration ? "text-purple-800 font-bold" : "text-gray-600"}`}>
                {item.duration} mins
              </Text>
              <Text style={tw`text-center text-gray-400 line-through`}>₹{item.price}</Text>
              <Text style={tw`text-center text-black font-bold`}>₹{item.price - item.discount_price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Time Selection */}
      {isScheduled && (
        <View style={tw`mt-5 border-2 border-gray-300 rounded`}>
          <Text style={tw`text-lg font-semibold mb-2 mt-5`}>Select start time of service</Text>
          <View style={tw`flex-row justify-center mb-2`}>
            <TouchableOpacity
              style={tw`px-4 py-2 rounded-lg border ${!isPM ? "bg-purple-600" : "border-gray-300"}`}
              onPress={() => setIsPM(false)}
            >
              <Text style={tw`${!isPM ? "text-white" : "text-black"}`}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`px-4 py-2 ml-2 rounded-lg border ${isPM ? "bg-purple-600" : "border-gray-300"}`}
              onPress={() => setIsPM(true)}
            >
              <Text style={tw`${isPM ? "text-white" : "text-black"}`}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Confirm Button */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-200`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-semibold`}>
            ₹
            <Text style={tw`text-gray-400 line-through`}>
              {durations.find(d => d.duration === selectedDuration)?.oldPrice}
            </Text>
            {durations.find(d => d.duration === selectedDuration)?.price}
          </Text>
          <TouchableOpacity style={tw`bg-purple-600 px-6 py-3 rounded-lg`} onPress={() => navigation.navigate("ReviewBookingPage")}>
            <Text style={tw`text-white font-semibold`}>Confirm booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseService;
