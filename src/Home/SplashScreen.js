import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speed rabbit</Text>
      <Text style={styles.subtitle}>Partner App</Text>
      <View style={styles.trustedContainer}>
        <Text style={styles.trustedText}>Trusted by</Text>
        <Text style={styles.professionals}>30,000+ Professionals</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  trustedContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  trustedText: {
    fontSize: 16,
    color: "gray",
  },
  professionals: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default SplashScreen;
