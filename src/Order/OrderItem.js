import { View, Text, Image } from "react-native";
import tw from "twrnc";

const OrderItem = ({ name, quantity, price }) => {
  return (
    <View style={tw`flex-row items-center justify-between py-3`}>
      <View>
        <Text style={tw`font-medium text-sm`}>{name}</Text>
        <Text style={tw`text-gray-500 text-xs`}>Qty: {quantity}</Text>
      </View>
      <Text style={tw`font-medium`}>₹{price * quantity}</Text>
    </View>
  );
};

export default OrderItem;