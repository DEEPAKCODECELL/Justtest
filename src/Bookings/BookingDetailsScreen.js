import { ScrollView, Text, View } from "react-native";
import tw from "../../tailwind";

const BookingDetails = ({ bookingData }) => {
  console.log("bookingData BookingDetails is ok", bookingData)
  if (!bookingData) {
    return <Text style={tw`text-gray-500 text-center mt-4`}>No Booking Details Found</Text>;
  }
  const { _id, address, modeOfPayment, finalPrice, bookingSlot_id, status } = bookingData[0];


  return (
    <ScrollView style={tw`bg-gray-100 pt-4`}>
      <View style={tw`bg-white rounded-xl p-4 shadow-md mb-4 w-full h-full`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-green-500 font-bold capitalize`}>{status}</Text>
          <Text style={tw`text-xs text-gray-500`}>Booking ID: {_id}</Text>
        </View>

        <View style={tw`gap-3`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-medium`}>Date</Text>
            <Text style={tw`text-gray-700`}>
              {new Date(bookingSlot_id.date).toDateString()}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-medium`}>Time</Text>
            <Text style={tw`text-gray-700`}>
              {new Date(bookingSlot_id.start_time).toLocaleTimeString()}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-medium`}>Location</Text>
            <Text style={tw`text-gray-700`}>
              {address.street}, {address.city} {address.state}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-medium`}>Payment</Text>
            <Text style={tw`text-gray-700 capitalize`}>{modeOfPayment}</Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-medium`}>Final Price</Text>
            <Text style={tw`text-gray-700 font-bold`}>
               {finalPrice}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingDetails;

