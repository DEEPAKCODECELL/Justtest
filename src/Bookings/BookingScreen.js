import { Text, View } from "react-native";
import tw from "../../tailwind";
export const BookingScreen = () => (
  <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
    <Text style={tw`text-lg font-bold text-blue-600`}>List Of All Bookings</Text>
  </View>
);