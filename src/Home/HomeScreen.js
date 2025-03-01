import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../tailwind";
import WalletSVG from "../svg/WalletSvg";
import AvailableSlots from "./AvailableSlots";
import ScheduleSlot from "./ScheduleSlot";
import OurServicesCard from "./OurServicesCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/userSlice";
import { ScrollView } from "react-native-gesture-handler";

const dummyAddress = { id: "1", name: "123 Main St, New York, NY" };

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [realAddress, setRealAddress] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await dispatch(fetchUser());
        console.log("In HomeScreen to get user",result.payload.data.current_address);

        if (!result?.payload) {
          console.log("Internal Server Error");
        }
        else {
          setRealAddress(result.payload.data.current_address);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, [dispatch]);
  return (
      <ScrollView style={tw`flex-1 bg-white`} nestedScrollEnabled={true}>
      {/* Header Section */}
      <View style={tw`flex-row justify-between items-center p-5`}>
        <View>
          <Text style={tw`text-lg font-bold`}>Delivery In 9 mins</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddressScreen", { address: realAddress?.substring(6,30) })}
          >
            <Text style={tw`text-gray-900 text-base`}>{realAddress?.substring(6,50)}</Text>
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
    </ScrollView>
  );
};

export default HomeScreen;
