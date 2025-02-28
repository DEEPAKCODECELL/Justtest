import { View, Text, TouchableOpacity} from "react-native";
import { ArrowLeft, Home, ChevronRight, Percent, CreditCard } from "lucide-react-native";
import tw from "../../tailwind";
import { useNavigation } from "@react-navigation/native";

const ReviewBookingPage = () => {
  const navigation = useNavigation();  
  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-white shadow-sm py-4 px-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
  <ArrowLeft size={24} color="black" />
</TouchableOpacity>      
        <Text style={tw`ml-4 text-xl font-semibold`}>Review Booking</Text>
      </View>
      
      <View style={tw`px-4 py-6`}>
        {/* Location Section */}
        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>  
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center space-x-3`}>
              <Home size={20} color="gray" />
              <Text style={tw`font-medium`}>Home | 12</Text>
            </View>
            <TouchableOpacity>
              <Text style={tw`text-purple-600 font-medium`}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Service Details */}
        <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-4`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text style={tw`text-xl font-semibold`}>Expert Housekeeping Service</Text>
              <Text style={tw`text-gray-600 mt-1`}>₹169</Text>
            </View>
            <View style={tw`bg-pink-100 p-2 rounded-lg`}>
              <Home size={24} color="pink" />
            </View>
          </View>
          <View style={tw`mt-3`}>  
            <View style={tw`flex-row justify-between text-gray-600`}>
              <Text>Starts at:</Text>
              <Text>09:00 am - 09:30 am, 19 February</Text>
            </View>
            <View style={tw`flex-row justify-between text-gray-600 mt-1`}>
              <Text>Duration:</Text>
              <Text>60 minutes</Text>
            </View>
          </View>
        </View>
        
        {/* Coupons Section */}
        <TouchableOpacity style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>  
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center space-x-3`}>
              <View style={tw`p-2 bg-green-100 rounded-lg`}>
                <Percent size={20} color="green" />
              </View>
              <View>
                <Text style={tw`font-medium`}>Apply coupons or offers</Text>
                <Text style={tw`text-sm text-green-600`}>1 coupon available</Text>
              </View>
            </View>
            <ChevronRight size={20} color="gray" />
          </View>
        </TouchableOpacity>
        
        {/* Wallet Section */}
        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>  
          <View style={tw`flex-row items-center space-x-3`}>
            <View style={tw`p-2 bg-gray-100 rounded-lg`}>
              <CreditCard size={20} color="gray" />
            </View>
            <View>
              <Text style={tw`font-medium`}>Redeem using wallet</Text>
              <Text style={tw`text-sm text-gray-600`}>Credit Balance: ₹0.0</Text>
            </View>
          </View>
        </View>
        
        {/* Refund Policy */}
        <View style={tw`mb-4`}>  
          <Text style={tw`font-semibold`}>Refund & cancellation policy</Text>
          <Text style={tw`text-gray-600 text-sm`}>Free cancellations/refund if done more than 30 mins before the service. A fee will be charged otherwise.</Text>
          <TouchableOpacity>
            <Text style={tw`text-purple-600 font-medium`}>Learn more</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Fixed Bottom Button */}
      <View style={tw`p-4 bg-white border-t absolute bottom-0 left-0 right-0`}>  
        <TouchableOpacity style={tw`bg-purple-600 py-3 rounded-lg`}>
          <Text style={tw`text-center text-white font-semibold`}>Proceed to pay ₹181</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewBookingPage;
