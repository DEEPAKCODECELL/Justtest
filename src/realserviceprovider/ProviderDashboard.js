import React from "react";
import { View, Text, Button } from "react-native";

const ProviderDashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Service Provider Dashboard</Text>
      <Button title="Go to Work Details" onPress={() => navigation.navigate("WorkDetails")} />
    </View>
  );
};

export default ProviderDashboard;
