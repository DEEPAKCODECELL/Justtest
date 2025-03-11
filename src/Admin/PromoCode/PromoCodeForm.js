import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";

const PromoCodeForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [promos, setPromos] = useState([]);
  const [form, setForm] = useState({
    code: "",
    description: "",
    rate: "",
    rate_type: "flat",
    expiry_date: "",
    active: true,
  });

  // Fetch promo codes on mount
  useEffect(() => {
    fetchPromos();
  }, []);

  // Fetch all promo codes
  const fetchPromos = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://yourapi.com/promos");
      const data = await response.json();
      setPromos(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch promo codes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single promo code if editing
  useEffect(() => {
    if (isEditMode) {
      fetchPromoById(id);
    }
  }, [id, isEditMode]);

  const fetchPromoById = async (promoId) => {
    try {
      const response = await fetch(`https://yourapi.com/promos/${promoId}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch promo code");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!form.code || !form.rate) {
      Alert.alert("Error", "Code and Rate are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(isEditMode ? `https://yourapi.com/promos/${id}` : "https://yourapi.com/promos", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to save promo code");

      Alert.alert("Success", `Promo code ${isEditMode ? "updated" : "created"} successfully`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
      fetchPromos();
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete a promo code
  const handleDelete = async (promoId) => {
    Alert.alert("Confirm", "Are you sure you want to delete this promo code?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          setLoading(true);
          try {
            await fetch(`https://yourapi.com/promos/${promoId}`, { method: "DELETE" });
            Alert.alert("Deleted", "Promo code deleted successfully");
            fetchPromos();
          } catch (error) {
            Alert.alert("Error", "Failed to delete promo code");
          } finally {
            setLoading(false);
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-xl font-bold mb-3`}>{isEditMode ? "Edit Promo Code" : "Create Promo Code"}</Text>

      {/* Promo Code Input */}
      <Text style={tw`mb-1`}>Promo Code*</Text>
      <TextInput style={tw`border p-2 rounded mb-3`} value={form.code} onChangeText={(value) => setForm({ ...form, code: value })} placeholder="Enter promo code" />

      {/* Description */}
      <Text style={tw`mb-1`}>Description</Text>
      <TextInput style={tw`border p-2 rounded mb-3`} value={form.description} onChangeText={(value) => setForm({ ...form, description: value })} placeholder="Describe the promo" multiline />

      {/* Rate & Type */}
      <Text style={tw`mb-1`}>Discount Rate*</Text>
      <TextInput style={tw`border p-2 rounded mb-3`} value={form.rate} keyboardType="numeric" onChangeText={(value) => setForm({ ...form, rate: value })} placeholder="Enter discount rate" />

      <Text style={tw`mb-1`}>Rate Type</Text>
      <Picker selectedValue={form.rate_type} onValueChange={(value) => setForm({ ...form, rate_type: value })}>
        <Picker.Item label="Flat Discount" value="flat" />
        <Picker.Item label="Percentage Discount" value="percentage" />
      </Picker>

      {/* Expiry Date */}
      <Text style={tw`mb-1 mt-3`}>Expiry Date</Text>
      <TextInput style={tw`border p-2 rounded mb-3`} value={form.expiry_date} onChangeText={(value) => setForm({ ...form, expiry_date: value })} placeholder="YYYY-MM-DD" />

      {/* Active Status */}
      <Text style={tw`mb-1`}>Active</Text>
      <Picker selectedValue={form.active} onValueChange={(value) => setForm({ ...form, active: value })}>
        <Picker.Item label="Yes" value={true} />
        <Picker.Item label="No" value={false} />
      </Picker>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={tw`bg-green-500 p-3 rounded mt-4`}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={tw`text-white text-center text-lg`}>{isEditMode ? "Update" : "Create"}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default PromoCodeForm;
