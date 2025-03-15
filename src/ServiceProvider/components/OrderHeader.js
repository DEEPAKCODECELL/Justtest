import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, RefreshCw } from "lucide-react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const OrderHeader = ({ duration, address }) => {
    const navigation = useNavigation();
    return (
        <View style={tw`bg-green-700 p-4`}>
            {/* Back Button */}
            <View style={tw`flex-row items-center`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white text-lg font-bold flex-1 text-center`}>
                    Coming To Your Place
                </Text>
            </View>

            {/* Arrival Time */}
            <View style={tw`items-center mt-2`}>
                <Text style={tw`text-white text-lg font-bold`}>
                    Arriving In {duration}
                </Text>
            </View>

            {/* Address */}
            <View style={tw`items-center mt-2`}>
                <Text style={tw`text-white text-lg font-bold text-center`}>
                    Coming To Your Place {address?.street}, {address?.city}
                </Text>
            </View>

            {/* Refresh Button & On-Time Status */}
            <View style={tw`items-center mt-2 flex-row justify-center`}>
                <TouchableOpacity style={tw`flex-row items-center`}>
                    <RefreshCw size={20} color="white" />
                    <Text style={tw`text-white text-lg font-bold ml-1`}>On Time</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderHeader;
