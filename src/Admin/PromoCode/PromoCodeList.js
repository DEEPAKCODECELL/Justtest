import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Pencil, Trash, Eye } from "lucide-react-native"; // Icons for actions
import tw from "twrnc";

export const promoCodes = [
  {
    id: "1",
    code: "DISCOUNT50",
    rate: 50,
    rate_type: "percentage",
    description: "Get 50% off on your first booking",
    expiry_date: "2025-12-31",
    active: true,
  },
  {
    id: "2",
    code: "WELCOME100",
    rate: 100,
    rate_type: "flat",
    description: "Get ₹100 off on your first booking",
    expiry_date: "2025-10-15",
    active: true,
  },
  {
    id: "3",
    code: "SUMMER20",
    rate: 20,
    rate_type: "percentage",
    description: "Enjoy 20% off this summer",
    expiry_date: "2025-06-30",
    active: false,
  },
  {
    id: "4",
    code: "FESTIVE500",
    rate: 500,
    rate_type: "flat",
    description: "Flat ₹500 off on festive bookings",
    expiry_date: "2025-11-01",
    active: true,
  },
  {
    id: "5",
    code: "FLASHSALE",
    rate: 30,
    rate_type: "percentage",
    description: "Limited-time 30% discount on all services",
    expiry_date: "2025-09-20",
    active: false,
  },
];

const PromoCodeList = ({ navigation }) => {
  const [promoList, setPromoList] = useState(promoCodes);

  const handleDelete = (id) => {
    setPromoList(promoList.filter((promo) => promo.id !== id));
  };

  return (
    <View style={tw`p-4 bg-white h-full`}>
      <FlatList
        data={promoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-2`}>
            <View>
              <Text style={tw`text-lg font-bold`}>{item.code}</Text>
              <Text style={tw`text-sm`}>Rate: {item.rate} {item.rate_type}</Text>
              <Text style={tw`text-sm`}>Expiry Date: {item.expiry_date}</Text>
              <Text style={tw`text-sm`}>Active: {item.active ? "Yes" : "No"}</Text>
            </View>

            {/* Action Buttons */}
            <View style={tw`flex-row gap-2`}>
              <TouchableOpacity onPress={() => navigation.navigate("PromoCodeDetails", { id: item.id })}>
                <Eye size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("PromoCodeForm", { id: item.id })}>
                <Pencil size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Trash size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Button to Create New Promo Code */}
      <TouchableOpacity onPress={() => navigation.navigate("PromoCodeForm")} style={tw`bg-blue-500 p-4 rounded-lg mt-4`}>
        <Text style={tw`text-white text-center text-lg font-bold`}>+ Create Promo Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PromoCodeList;
