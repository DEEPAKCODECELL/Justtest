import React, { useEffect, useState } from "react";
import { View, Animated, Text, Alert } from "react-native";
import { Check, Bike } from "lucide-react-native";
import tw from "../../tailwind";
import { useNavigation, useRoute } from "@react-navigation/native";
import apiClient from "../redux/api/apiClient";

const ProcessingAnimation = () => {
    const scaleAnim = new Animated.Value(1);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2, // Scale up
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // Scale back to normal
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={tw`flex justify-center items-center`}>
            <Animated.View
                style={[
                    tw`w-50 h-50 rounded-full bg-yellow-500 justify-center items-center`,
                    { transform: [{ scale: scaleAnim }], opacity: scaleAnim },
                ]}
            >
                <Check size={100} color="white" strokeWidth={6} />
            </Animated.View>
        </View>
    );
};


const VerifyPaymentPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { BookingId, transactionId, locationdata, modeOfPayment, pointsUsed, showFinalPrice } = route.params || {};
    const [isVerified, setIsVerified] = useState(false);
    const CreateRealBooking = async () => {
        console.log("user", locationdata);
        const locationData = {
            current_address: locationdata?.current_address || "",
            location: locationdata.address.location
        };
        try {
            const response = await apiClient.post("/booking/confirm-booking", { modeOfPayment: modeOfPayment, pointsUsed: pointsUsed, bookingId: BookingId, address: locationData, status: "confirmed", finalPrice: showFinalPrice });
            console.log("Booking successful:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error making booking:", error);
            return { success: false };
        }
    }
    const verifyPaymentStatus = async (transactionId) => {
        try {
            console.log("🔄 Verifying payment...");
            const response = await apiClient.get(`/payment/status/${transactionId}`);
            return response.data;
        } catch (error) {
            console.error("⚠️ Error verifying payment:", error);
        }
    };
    useEffect(() => {
        if (transactionId) {
            let attempts = 0;
            const maxAttempts = 40; // 40 attempts (2 minutes total)
            const interval = setInterval(async () => {
                attempts++;
                console.log(`Attempt ${attempts} - Checking Payment Status...`);

                const verification = await verifyPaymentStatus(transactionId);
                if (verification?.success) {
                    console.log("✅ Payment verified successfully!");
                    setIsVerified(true);
                    clearInterval(interval);
                    const CreateRealBookingresponse = await CreateRealBooking();
                    console.log("CreateRealBookingresponse", CreateRealBookingresponse.success);
                    navigation.navigate("BookingSuccess", { BookingId });
                }

                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    console.log("❌ Payment verification failed after 2 minutes.");
                    navigation.navigate("PaymentFailure");
                }
            }, 3000);
        }
        else {
            const cashBooking = async () => {
                const CreateRealBookingresponse = await CreateRealBooking();
                console.log("CreateRealBookingresponse", CreateRealBookingresponse.success);
                navigation.navigate("BookingSuccess", { BookingId });
            }
            cashBooking();
        }

        return () => clearInterval(interval);
    }, [navigation, transactionId]);
    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-100 p-6`}>
            <ProcessingAnimation />
            <Text style={tw`text-4xl font-bold ${isVerified ? "text-green-600" : "text-yellow-600"} mt-6`}>
                {isVerified ? "Payment Successful!" : "Processing Payment..."}
            </Text>
        </View>
    );
};

export default VerifyPaymentPage;
