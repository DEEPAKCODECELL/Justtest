import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import tw from "../../tailwind";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

const ChooseService = () => {
    const navigation = useNavigation();  
  const [selectedDate, setSelectedDate] = useState("24");
  const [selectedDuration, setSelectedDuration] = useState("60");
  const [selectedTime, setSelectedTime] = useState(null);
  const [isPM, setIsPM] = useState(false);

  const dates = ["24", "25", "26", "27","28","29","30"];
  const durations = [
    { time: "60", price: 169, oldPrice: 200 },
    { time: "90", price: 255, oldPrice: 300 },
      { time: "120", price: 335, oldPrice: 400 },
      { time: "150", price: 335, oldPrice: 400 },
    { time: "180", price: 335, oldPrice: 400 },
  ];
  const times = [
    "12:00", "12:30", "01:00", "01:30", "02:00", "02:30",
    "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  ];

    return (
      <>
            <View style={tw`flex-1 bg-white p-3`}>
                <View style={tw`flex-row items-center`}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
    <ArrowLeft size={24} color="black" />
  </TouchableOpacity>        
  <Text style={tw`text-lg font-semibold ml-2`}>Choose service details</Text>
</View>  
 
     <View style={tw`border-2 border-gray-300 rounded`}>
      {/* Date Selection */}
      <Text style={tw`text-lg font-semibold mb-5`}>Select date of service</Text>
                    <View>
                        <View style={tw`flex-row justify-between mb-4`}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date}
            style={tw`px-4 py-2 rounded-lg border ${
              selectedDate === date ? "bg-purple-200 border-purple-600" : "border-gray-300"
            }`}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={tw`text-center ${selectedDate === date ? "text-purple-800 font-bold" : "text-gray-600"}`}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
       </View>
      </View>

      {/* Duration Selection */}
         <View style={tw`mt-5 border-2 border-gray-300 rounded p-3`}>
  <Text style={tw`text-lg font-semibold mb-2`}>Select duration of service</Text>
  <FlatList
      data={durations}
      keyExtractor={(item) => item.time.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tw`px-2`}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`px-4 py-3 mx-2 rounded-lg border ${
            selectedDuration === item.time ? "bg-purple-200 border-purple-600" : "border-gray-300"
          }`}
          onPress={() => setSelectedDuration(item.time)}
        >
          <Text
            style={tw`text-center ${selectedDuration === item.time ? "text-purple-800 font-bold" : "text-gray-600"}`}
          >
            {item.time} mins
          </Text>
          <Text style={tw`text-center text-gray-400 line-through`}>₹{item.oldPrice}</Text>
          <Text style={tw`text-center text-black font-bold`}>₹{item.price}</Text>
        </TouchableOpacity>
      )}
    />
</View>

      {/* Time Selection */}
          <View style={tw`mt-5 border-2 border-gray-300 rounded`}>
              <Text style={tw`text-lg font-semibold mb-1 mt-5`}>Select start time of service</Text>
      <View style={tw`flex-row justify-end mb-2 mr-2`}>
        <TouchableOpacity
          style={tw`px-4 py-2 rounded-lg border ${!isPM ? "bg-purple-600 text-white" : "border-gray-300"}`}
          onPress={() => setIsPM(false)}
        >
          <Text style={tw`${!isPM ? "text-white" : "text-black"}`}>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-2 ml-2 rounded-lg border ${isPM ? "bg-purple-600 text-white" : "border-gray-300"}`}
          onPress={() => setIsPM(true)}
        >
          <Text style={tw`${isPM ? "text-white" : "text-black"}`}>PM</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={tw`px-4 py-2 rounded-lg border ${
              selectedTime === time ? "bg-purple-200 border-purple-600" : "border-gray-300"
            } m-1`}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={tw`text-center text-gray-600`}>{time}</Text>
            {["04:30", "05:00", "05:30"].includes(time) && (
              <Text style={tw`text-center text-yellow-600 text-xs`}>EXTRA ₹5</Text>
            )}
          </TouchableOpacity>
        ))}
              </View>
               </View>
      {/* Confirm Button */}
      </View>
      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-200`}>
  <View style={tw`flex-row justify-between items-center`}>
    <Text style={tw`text-lg font-semibold`}>
      ₹
      <Text style={tw`text-gray-400 line-through`}>
        {durations.find(d => d.time === selectedDuration)?.oldPrice}
      </Text> 
      {durations.find(d => d.time === selectedDuration)?.price}
    </Text>
    <TouchableOpacity style={tw`bg-purple-600 px-6 py-3 rounded-lg`} onPress={()=>navigation.navigate("ReviewBookingPage")} >
      <Text style={tw`text-white font-semibold`}>Confirm booking</Text>
    </TouchableOpacity>
  </View>
</View>
</>
  );
};

export default ChooseService;

