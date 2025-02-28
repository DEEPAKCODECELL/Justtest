import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import tw from "../../../tailwind";
import { ArrowLeft } from "lucide-react-native";


const AddressScreen = () => {
  const navigation=useNavigation()
  const [addresses, setAddresses] = useState([
    { id: "1", title: "Home", address: "123 Street Name, City, Country" },
    { id: "2", title: "Office", address: "456 Business Rd, City, Country" },
  ]);

    const addNewAddress = () => {
    const newAddress = {
      id: (addresses.length + 1).toString(),
      title: "New Address",
      address: "789 New Place, City, Country",
    };
    setAddresses([...addresses, newAddress]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressItem}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C8.13 2 5 5.13 5 9C5 13.25 10.29 20.6 11.71 22.39C11.89 22.61 12.11 22.61 12.29 22.39C13.71 20.6 19 13.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
          fill="#6200ea"
        />
      </Svg>
      <View style={styles.addressText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={tw`flex-row items-center mt-5`}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
    <ArrowLeft size={24} color="black" />
  </TouchableOpacity>        
  <Text style={tw`text-lg font-semibold ml-2`}>Your Addresses</Text>
</View>  
  
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.addButton} onPress={addNewAddress}>
        <Text style={styles.addButtonText}>+ Add Address</Text>
      </TouchableOpacity>
      </View>
      </>
  );
};



const styles = {
  container: tw`flex-1 p-5 bg-white`,
  header: tw`text-lg font-bold mb-4`,
  addressItem: tw`flex-row items-center bg-gray-100 p-4 rounded-lg mb-2`,
  addressText: tw`ml-2`,
  title: tw`text-base font-bold`,
  subtitle: tw`text-sm text-gray-500`,
  addButton: tw`mt-5 bg-pink-700 p-4 rounded-lg items-center`,
  addButtonText: tw`text-white text-base font-bold`,
};
export default AddressScreen;
