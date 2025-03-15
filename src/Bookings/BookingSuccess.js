import React, { useEffect } from "react";
import { View, Animated, Text } from "react-native";
import { Check, Bike } from "lucide-react-native";
import tw from "../../tailwind";
import { useNavigation, useRoute } from "@react-navigation/native";

const SuccessAnimation = () => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={tw`flex justify-center items-center`}>
      <Animated.View
        style={[
          tw`w-50 h-50 rounded-full bg-green-500 justify-center items-center`,
          { transform: [{ scale: scaleAnim }], opacity: scaleAnim },
        ]}
      >
        <Check size={100} color="white" strokeWidth={6} />
      </Animated.View>
    </View>
  );
};

const ScooterAnimation = () => {
  const translateX = new Animated.Value(-150);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 10,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[tw`absolute bottom-30`, { transform: [{ translateX }] }]}>
      <Bike size={200} color="black" />
    </Animated.View>
  );
};

const BookingSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { BookingId } = route.params || {};

  useEffect(() => {
    const navigateTimer = setTimeout(() => {
      navigation.navigate("MapComponent", { BookingId });
    }, 3000); // Navigate after 3 sec

    return () => clearTimeout(navigateTimer);
  }, [navigation, transactionId]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 p-6`}>
      {/* Success Animation & Scooter Animation both start together */}
      <SuccessAnimation />
      <Text style={tw`text-4xl font-bold text-green-600 mt-6`}>Booking Confirmed!</Text>
    </View>
  );
};

export default BookingSuccess;
