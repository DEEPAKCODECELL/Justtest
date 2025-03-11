import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { promoCodes } from "./PromoCodeList";

const PromoCodeDetails = () => {
  const route = useRoute();
    const { id } = route.params;
    let promoCodes=promoCodes || [] ;
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (id) {
      const selectedPromo = promoCodes.find((promo) => promo.id === id);
      setPromo(selectedPromo || null);
    }
  }, [id]);
  const fetchPromo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://yourapi.com/promos/${id}`);
      const data = await response.json();
      setPromo(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch promo details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`p-4`}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : promo ? (
        <View>
          <Text style={tw`text-2xl font-bold mb-2`}>{promo.code}</Text>
          <Text>Rate: {promo.rate} {promo.rate_type}</Text>
          <Text>Description: {promo.description}</Text>
          <Text>Expiry Date: {promo.expiry_date}</Text>
          <Text>Active: {promo.active ? "Yes" : "No"}</Text>
        </View>
      ) : (
        <Text>No details found.</Text>
      )}
    </View>
  );
};

export default PromoCodeDetails;
