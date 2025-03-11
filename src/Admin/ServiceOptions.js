import React from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ServiceOptionList from "./ServiceOptionList";
import { PageHeader } from "./AllComponenetForAdmin";
import tw from "../../tailwind";

const ServiceOptions = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}> 
      <PageHeader title="Service Options" onBack={() => navigation.goBack()} />
      <View style={tw`flex-1`}> 
        <ServiceOptionList />
      </View>
    </SafeAreaView>
  );
};

export default ServiceOptions;
