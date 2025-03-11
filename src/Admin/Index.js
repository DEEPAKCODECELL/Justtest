import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Wrench, Tag, Menu } from "lucide-react-native";
import tw from "../../tailwind";


const sampleActualServices = [
  { _id: "1", name: "Plumbing", description: "Fixing pipes and leaks" },
  { _id: "2", name: "Cleaning", description: "House and office cleaning" },
  { _id: "3", name: "Electrician", description: "Fixing electrical issues" },
];

const sampleServiceOptions = [{ _id: "1" }, { _id: "2" }];

const Index = () => {
  const navigation = useNavigation();
  const actualServiceCount = sampleActualServices.length;
  const serviceOptionCount = sampleServiceOptions.length;
  console.log("actualServiceCount and we are fine", actualServiceCount);

  return (
    <View style={tw("flex-1 bg-blue-50 p-4")}> 
      <View style={tw("flex-row justify-between items-center bg-white p-3 shadow-sm")}>
        <Text style={tw("text-xl font-medium")}>
          Service Admin
        </Text>
        <TouchableOpacity>
          <Menu size={22} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={tw("flex-1 mt-4")}>
        <View>
          <Text style={tw("text-lg font-medium mb-3")}>
            Overview
          </Text>
          <View style={tw("flex-row justify-between mb-4")}>
            <StatCard
              icon={<Wrench size={24} color="blue" />}
              label="Services of me"
              value={actualServiceCount}
              onPress={() => navigation.navigate("ActualServices")}
            />
            <StatCard
              icon={<Tag size={24} color="green" />}
              label="Service Options"
              value={serviceOptionCount}
              onPress={() => navigation.navigate("ServiceOptions")}
                      />         
          </View>
        </View>
        
        <View>
          <Text style={tw("text-lg font-medium mb-3")}>
            Recent Services
          </Text>
          {sampleActualServices.map((service) => (
            <TouchableOpacity
              key={service._id}
              style={tw("p-4 bg-white rounded-lg mb-2 shadow-sm")}
              onPress={() => navigation.navigate("ServiceOptionDetail", { id: service._id })}
            >
              <View style={tw("flex-row items-center gap-3")}>
                <View style={tw("h-10 w-10 bg-blue-100 flex items-center justify-center rounded-full")}>
                  <Wrench size={18} color="blue" />
                </View>
                <View>
                  <Text style={tw("font-medium")}>
                    {service.name}
                  </Text>
                  <Text style={tw("text-sm text-gray-500")}>
                    {service.description || "No description provided"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
          </ScrollView>
      
      <View style={tw("bg-white p-4 text-center")}>
        <Text style={tw("text-sm text-gray-500")}>
          Service Admin Dashboard • v1.0
        </Text>
      </View>
      </View>
  );
};

const StatCard = ({ icon, label, value, onPress }) => {
  return (
    <TouchableOpacity
      style={tw("p-4 bg-white rounded-lg flex-1 items-center shadow-sm")}
      onPress={onPress}
    >
      <View style={tw("mb-2")}>{icon}</View>
      <Text style={tw("text-xl font-semibold")}>{value}</Text>
      <Text style={tw("text-sm text-gray-500")}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Index;
