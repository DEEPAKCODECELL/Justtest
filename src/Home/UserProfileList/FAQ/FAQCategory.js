import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "../../../../tailwind";
import { ArrowLeft, ChevronRight } from "lucide-react-native";

const faqData = {
  coupons: {
    title: "Coupons & Offers",
    questions: [
      { id: 1, question: "How do I apply a coupon code?" },
      { id: 2, question: "Why is my coupon code not working?" },
      { id: 3, question: "Can I use multiple coupons on one order?" },
      { id: 4, question: "Where can I find available offers?" },
      { id: 5, question: "Do coupons have an expiration date?" },
    ],
  },
  general: {
    title: "General Inquiry",
    questions: [
      { id: 1, question: "How do I contact customer support?" },
      { id: 2, question: "Where can I check my account details?" },
      { id: 3, question: "How do I delete my account?" },
      { id: 4, question: "Can I update my registered mobile number?" },
      { id: 5, question: "How do I change my email address?" },
    ],
  },
  feedback: {
    title: "Feedback & Suggestions",
    questions: [
      { id: 1, question: "How can I provide feedback?" },
      { id: 2, question: "Where do I report an issue with the app?" },
      { id: 3, question: "Can I suggest a new feature?" },
      { id: 4, question: "How is my feedback used?" },
      { id: 5, question: "Will I receive a response to my feedback?" },
    ],
  },
  orders: {
    title: "Order / Products Related",
    questions: [
      { id: 1, question: "How do I track my order?" },
      { id: 2, question: "Can I modify my order after placing it?" },
      { id: 3, question: "How do I cancel an order?" },
      { id: 4, question: "What should I do if I receive the wrong product?" },
      { id: 5, question: "How do I return an item?" },
    ],
  },
  "gift-card": {
    title: "Gift Card",
    questions: [
      { id: 1, question: "How do I purchase a Gift Card?" },
      { id: 2, question: "How do I redeem a Gift Card?" },
      { id: 3, question: "Can I use multiple Gift Cards for a single order?" },
      { id: 4, question: "What happens if I lose my Gift Card code?" },
      { id: 5, question: "Do Gift Cards have an expiry date?" },
    ],
  },
  emi: {
    title: "No-Cost EMI",
    questions: [
      { id: 1, question: "What is No-Cost EMI?" },
      { id: 2, question: "Which banks offer No-Cost EMI?" },
      { id: 3, question: "How do I avail No-Cost EMI?" },
      { id: 4, question: "Are there any additional charges for No-Cost EMI?" },
      { id: 5, question: "Can I pay off my EMI early?" },
    ],
  },
  "super-saver": {
    title: "Super Saver",
    questions: [
      { id: 1, question: "What is Super Saver?" },
      { id: 2, question: "How do I enroll in Super Saver?" },
      {
        id: 3,
        question: "Are there any eligibility criteria for Zepto Super Saver?",
      },
      {
        id: 4,
        question: "Can I combine Super Saver with other discounts?",
      },
      { id: 5, question: "How do I check my Super Saver benefits?" },
    ],
  },
  wallet: {
    title: "Wallet Related",
    questions: [
      { id: 1, question: "I am unable to use my wallet" },
      { id: 2, question: "How do I add money to my Wallet?" },
      {
        id: 3,
        question:
          "My refunded amount isn't showing in my Wallet. What should I do?",
      },
    ],
  },
  payment: {
    title: "Payment Related",
    questions: [
      { id: 1, question: "What payment methods are accepted?" },
      { id: 2, question: "How do I get a refund?" },
    ],
  },
};

const FAQCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = 1;
  const category = faqData[categoryId] || { title: "FAQs", questions: [] };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View
        style={tw`bg-white py-4 px-4 border-b border-gray-300 flex-row items-center`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold ml-4`}>{category.title}</Text>
      </View>
      <ScrollView style={tw`p-4`}>
        {category.questions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={tw`flex-row items-center justify-between bg-white p-4 my-2 rounded-lg shadow`}
          >
            <Text style={tw`text-gray-900 text-lg`}>{item.question}</Text>
            <ChevronRight size={24} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FAQCategory;