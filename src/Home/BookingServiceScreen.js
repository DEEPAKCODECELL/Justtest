import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList,ScrollView } from "react-native";
import tw from "../../tailwind";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvidersWithinRadius, fetchServiceOption } from "../redux/slices/serviceSlice";
import LoadingBar from "../ServiceProvider/components/LoadingBar";
import { initiateBooking } from "../redux/slices/bookingSlice";

const ChooseService = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.service);
  console.log("services state", loading);
  const userlatlong = useSelector((state) => state.user?.user?.data?.address?.location?.coordinates || []);
  const route = useRoute();
  const { serviceId, serviceName, isScheduled } = route.params || {};
  console.log("check", isScheduled);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [serviceOptionId, setserviceOptionId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [durations, setDurations] = useState([]);
  const [isPM, setIsPM] = useState(false);
  const [isAm, setIsAm] = useState(false);
  const [existingBooking, setExistingBooking] = useState(null);

  const times = useMemo(() => [
    "12:00", "12:30", "01:00", "01:30", "02:00", "02:30",
    "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  ], []);

  const getUTCDateOnly = (date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      .toISOString(); // "YYYY-MM-DDT00:00:00.000Z"
  };

  const generateNextDays = useCallback((numDays = 4) => {
    const currentDates = [];
    const today = new Date();
    const options = { weekday: "short" };

    for (let i = 0; i < numDays; i++) {
      let iterDate = new Date(today);
      iterDate.setDate(today.getDate() + i);

      // Ensure proper UTC format
      const formattedIterDate = getUTCDateOnly(iterDate);

      currentDates.push({
        day: iterDate.toLocaleDateString("en-US", options),
        date: iterDate.getDate().toString(),
        formattedDate: formattedIterDate, // Now it's "YYYY-MM-DDT00:00:00.000Z"
      });
    }
    setDates(currentDates);
    setSelectedDate((prevDate) =>
    prevDate && currentDates.some((d) => d.formattedDate === prevDate)
      ? prevDate
      : currentDates[0]?.formattedDate
    );
  }, []);

  const generateTimeSlots = (selectedDate) => {
  const now = new Date(selectedDate);
  
  // Set start time to 8:00 AM
  const startTime = new Date(now);
  startTime.setHours(8, 0, 0, 0);

  // Set end time to 8:00 PM
  const endTime = new Date(now);
  endTime.setHours(20, 0, 0, 0);

  const timeSlots = [];

  while (startTime < endTime) {
    const formattedIterDate = new Date(startTime); // Create a new Date instance
    
    const formattedTime = formattedIterDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format
    });

    console.log("Generated Slot:", formattedIterDate); // Debugging Output

    timeSlots.push({ time: formattedTime, formattedIterDate });

    // Increment start time by 15 minutes
    startTime.setMinutes(startTime.getMinutes() + 15);
  }

  return timeSlots;
};


  const organizeTimeSlots = (timeSlots) => {
  const amSlots = [];
  const pmSlots = [];

  timeSlots.forEach((slot) => {
    const [hour, minute] = slot.time.split(":").map(Number); // Convert to number
    const isAM = slot.time.includes("AM");
    const isPM = slot.time.includes("PM");

    if (isAM || (hour < 12 && !isPM)) {
      amSlots.push(slot);
    } else {
      pmSlots.push(slot);
    }
  });

  return { amSlots, pmSlots };
};

// Memoized value
const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);
const { amSlots, pmSlots } = useMemo(() => organizeTimeSlots(timeSlots), [timeSlots]);


  const fetchServiceData = useCallback(async () => {
    if (!serviceId || userlatlong.length < 2) return;
    try {
      const response =  await  dispatch(fetchServiceOption({ serviceId: serviceId, latitude: userlatlong[0], longitude: userlatlong[1], radius: 4000, date: selectedDate }));
      console.log("response for service option current one", response);
      if (response?.payload?.returnProviders) {
        const availableprovider = response?.payload?.returnProviders;
        availableprovider?.forEach((provider) => {
          provider.availableDurations.forEach((durationObj) => {
            setDurations((prevState) => {
              // Check if the serviceoption with the same _id already exists
              const exists = prevState.some(
                (item) => item._id === durationObj.serviceoption._id
              );
              // Only add if it does not exist
              return exists ? prevState : [...prevState, durationObj.serviceoption];
            });
          });
        });

      } else {
        setDurations([]);
        console.error("Failed to fetch service options.");
      }
      
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }, [dispatch, serviceId, userlatlong, selectedDate]);

  const handleBookings = async () => {
    if ((isScheduled && (!selectedDate || !selectedDuration || !selectedTime || !serviceId)) ||(!isScheduled && !serviceId)) {
      console.log("Enter The Feilds");
      return;
    }
    console.log("data check for booking", selectedDate, selectedDuration, selectedTime);
    // Need To CreateList Of providers Against a Service Option
    console.log("duration check provider", durations);
    const listofProviders = new Set();
    for (let i = 0; i < durations.length; i++) {
      console.log("loop running", durations[i]._id, serviceOptionId, "length", durations.length);
      if (durations[i]._id === serviceOptionId) {
        console.log("get hit");
        listofProviders.add(durations[i].service_provider);
      }
    }
    const uniqueProvidersArray = Array.from(listofProviders);
    const response = await dispatch(initiateBooking({ selectedDate, selectedDuration, serviceOptionId, selectedTime, uniqueProvidersArray, serviceId,isScheduled }));
    navigation.navigate("ReviewBookingPage");    
  }

  useEffect(() => {
    generateNextDays();
    fetchServiceData();
  }, [selectedDate]);

  if (loading) {
    return (
      <>
      <LoadingBar loading={loading} />
      </>
    )
  }
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
      {isScheduled&&(<View style={tw`border-2 border-gray-200 rounded p-4 mt-3`}>
        <Text style={tw`text-lg font-semibold mb-3 text-gray-800`}>Select Date of Service</Text>
        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item) => item.date}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`items-center px-4 py-3 mx-2 rounded-lg border ${selectedDate === item.formattedDate ? "bg-purple-600 border-purple-600" : "border-gray-300"
                }`}
              onPress={() => {
  console.log("Select date:", item.formattedDate);
  console.log("Current selected date:", selectedDate, "New date:", item.formattedDate);

  if (selectedDate !== item.formattedDate) {
    setSelectedDate(item.formattedDate);
  }
}}
            >
              <Text style={tw`text-center text-sm ${selectedDate === item.formattedDate ? "text-white font-bold" : "text-gray-500"}`}>
                {item.day.toUpperCase()}
              </Text>
              <Text style={tw`text-center text-lg ${selectedDate === item.formattedDate ? "text-white font-bold" : "text-gray-800"}`}>
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
        />
    </View>)}

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
              onPress={() => {
  console.log("Selected duration:", selectedDuration, "New duration:", item.duration);
  console.log("Selected service option ID:", serviceOptionId, "New ID:", item._id);

  if (selectedDuration !== item.duration) {
    setSelectedDuration(item.duration);
  }

  if (serviceOptionId !== item._id) {
    setserviceOptionId(item._id);
  }
}}
            >
              <Text style={tw`text-center ${selectedDuration === item.duration ? "text-purple-800 font-bold" : "text-gray-600"}`}>
                {item.duration} mins
              </Text>
              <Text style={tw`text-center text-gray-400 line-through`}>₹{Math.ceil((item.price)/100)}</Text>
              <Text style={tw`text-center text-black font-bold`}>₹{Math.ceil((item.price - item.discount_price)/100)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {isScheduled && (
  <ScrollView style={tw`mt-5`} keyboardShouldPersistTaps="handled">
    {/* Time Slot Selection */}
    <View style={tw`bg-white rounded-lg p-6 mb-5 shadow-sm border-2 border-gray-300 mt-5`}>
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <Text style={tw`text-lg font-medium`}>Select start time of service</Text>

        {/* AM / PM Switch */}
       <View style={tw`bg-gray-100 flex-row rounded-lg overflow-hidden`}>
  <TouchableOpacity
    onPress={() => { setIsAm(true); setIsPM(false); }}
    style={tw`px-6 py-2 ${isAm ? "bg-white" : "bg-transparent"}`}
  >
    <Text style={tw`${isAm ? "text-purple-800 font-bold" : "text-gray-600"}`}>AM</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => { setIsPM(true); setIsAm(false); }}
    style={tw`px-6 py-2 ${isPM ? "bg-white" : "bg-transparent"}`}
  >
    <Text style={tw`${isPM ? "text-purple-800 font-bold" : "text-gray-600"}`}>PM</Text>
  </TouchableOpacity>
</View>

      </View>

      {/* Time Slots (Scroll-enabled) */}
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
  <ScrollView style={tw`max-h-60`} showsVerticalScrollIndicator={false}>
    <View style={tw`flex-row flex-wrap justify-between gap-3`}>
      {isPM ? (
        pmSlots.length > 0 ? (
          pmSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTime(time.formattedIterDate)}
              style={tw`px-4 py-2 border rounded w-24 ${
                selectedTime === time.formattedIterDate ? "bg-purple-600 border-purple-600" : "border-gray-300"
              }`}
            >
              <Text style={tw`${selectedTime === time.formattedIterDate ? "text-white" : "text-black"} text-center`}>{time.time}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={tw`text-red-500 font-semibold text-center w-full`}>Getting High Demand In Your Area</Text>
        )
      ) : amSlots.length > 0 ? (
        amSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log("am data check",time.time,selectedTime)
              setSelectedTime(time.formattedIterDate);
            }}
            style={tw`px-4 py-2 border rounded w-24 ${
              selectedTime === time.formattedIterDate ? "bg-purple-600 border-purple-600" : "border-gray-300"
            }`}
          >
            <Text style={tw`${selectedTime === time.formattedIterDate ? "text-white" : "text-black"} text-center`}>{time.time}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={tw`text-red-500 font-semibold text-center w-full`}>Getting High Demand In Your Area</Text>
      )}
    </View>
  </ScrollView>
</ScrollView>

    </View>
  </ScrollView>
)}

      {/* Confirm Button */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-200`}>
        <View style={tw`flex-row justify-between items-center`}>
          {selectedDuration&&<Text style={tw`text-lg font-semibold`}>
            ₹
            {Math.ceil((durations.find(d => d.duration === selectedDuration)?.price - durations.find(d => d.duration === selectedDuration)?.discount_price) / 100)}
          </Text>}
          <TouchableOpacity style={tw`bg-purple-600 px-6 py-3 rounded-lg`} onPress={() =>handleBookings()}>
            <Text style={tw`text-white font-semibold`}>Confirm booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseService;
