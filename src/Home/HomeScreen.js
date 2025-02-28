import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../tailwind";
import WalletSVG from "../svg/WalletSvg";
import AvailableSlots from "./AvailableSlots";
import ScheduleSlot from "./ScheduleSlot";
import OurServicesCard from "./OurServicesCard";

const dummyAddress = { id: "1", name: "123 Main St, New York, NY" };

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
      <View style={tw`flex-1 bg-white`}>
      {/* Header Section */}
      <View style={tw`flex-row justify-between items-center p-5`}>
        <View>
          <Text style={tw`text-lg font-bold`}>Delivery In 9 mins</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddressScreen", { address: dummyAddress })}
          >
            <Text style={tw`text-gray-900 text-base`}>{dummyAddress.name}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("AddressScreen")}>
          <WalletSVG width={32} height={32} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View>
        <AvailableSlots />
      </View>
      <View>
        <ScheduleSlot />
          </View>
      <View>
              <OurServicesCard />
      </View>
    </View>
  );
};

export default HomeScreen;
