import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../../../tailwind";
import { ChevronRight, ArrowLeft } from "lucide-react-native";

const faqCategories = [
  { id: "coupons", title: "Coupons & Offers" },
  { id: "general", title: "General Inquiry" },
  { id: "payment", title: "Payment Related" },
  { id: "feedback", title: "Feedback & Suggestions" },
  { id: "orders", title: "Order / Products Related" },
  { id: "gift-card", title: "Gift Card" },
  { id: "emi", title: "No-Cost EMI" },
  { id: "wallet", title: "Wallet Related" },
  { id: "super-saver", title: "Super Saver" },
];

const FAQs = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View
        style={tw`bg-white py-4 px-4 border-b border-gray-300 flex-row items-center`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold ml-4`}>FAQs</Text>
      </View>
      <ScrollView style={tw`p-4`}>
        {faqCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={tw`flex-row items-center justify-between bg-white p-4 my-2 rounded-lg shadow`}
            onPress={() =>
              navigation.navigate("FAQCategory", { categoryId: category.id })
            }
          >
            <Text style={tw`text-gray-900 text-lg`}>{category.title}</Text>
            <ChevronRight size={24} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FAQs;