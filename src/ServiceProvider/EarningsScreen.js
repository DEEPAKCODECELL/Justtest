import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import MonthSelector from "./components/MonthSelector";
import MonthTabs from "./components/MonthTabs";
import EarningsCard from "./components/EarningsCard";
import tw from "twrnc";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const EarningsScreen = ({ navigation }) => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedMonth, selectedYear]);

  const getVisibleMonths = () => {
    return [...Array(7)].map((_, i) => {
      const monthIndex = (selectedMonth - 6 + i + 12) % 12;
      return {
        name: months[monthIndex],
        shortName: shortMonths[monthIndex],
        isActive: monthIndex === selectedMonth,
      };
    });
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleSelectTab = (monthName) => {
    const index = months.indexOf(monthName);
    setSelectedMonth(index);
  };

  const earningsData = {
    earnings: {
      total: "₹0",
      details: [
        { label: "Base Salary", value: "₹0" },
        { label: "Overtime", value: "₹0" },
        { label: "Bonuses", value: "₹0" },
      ],
    },
    deductions: {
      total: "₹0",
      details: [
        { label: "Taxes", value: "₹0" },
        { label: "Insurance", value: "₹0" },
        { label: "Other", value: "₹0" },
      ],
    },
    net: {
      total: "₹0",
      details: [{ label: "Take Home", value: "₹0" }],
    },
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View
        style={tw`flex-row items-center p-4 bg-white border-b border-gray-200`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
          <ArrowLeft size={24} color="gray" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold ml-2`}>Earnings</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        {/* Month Selector */}
        <MonthSelector
          currentMonth={months[selectedMonth]}
          currentYear={selectedYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Month Tabs */}
        <MonthTabs tabs={getVisibleMonths()} onSelectTab={handleSelectTab} />

        {/* Loading Indicator */}
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" style={tw`mt-6`} />
        ) : (
          <View style={tw`mt-4`}>
            <EarningsCard
              type="earnings"
              title="Total Earnings"
              amount={earningsData.earnings.total}
              details={earningsData.earnings.details}
              bgColor="bg-green-500"
            />
            <EarningsCard
              type="deductions"
              title="Total Deductions"
              amount={earningsData.deductions.total}
              details={earningsData.deductions.details}
              bgColor="bg-red-500"
            />
            <EarningsCard
              type="net"
              title="Net Earnings"
              amount={earningsData.net.total}
              details={earningsData.net.details}
              bgColor="bg-blue-500"
            />
          </View>
        )}
      </ScrollView>

      <View
        style={tw`absolute bottom-0 left-0 right-0 bg-white p-3 flex-row justify-around border-t border-gray-200`}
      >
        <TouchableOpacity style={tw`opacity-50`}>
          <View style={tw`w-6 h-1 bg-gray-300 rounded-full mb-1`}></View>
          <View style={tw`w-4 h-1 bg-gray-300 rounded-full`}></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center`}
        >
          <View style={tw`w-3 h-3 bg-gray-300 rounded-full`}></View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`opacity-50`}>
          <View style={tw`w-1 h-4 bg-gray-300 rounded-full`}></View>
          <View style={tw`w-4 h-1 bg-gray-300 rounded-full mt-1`}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EarningsScreen;