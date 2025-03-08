import { useState } from "react";
import { Linking, Alert } from "react-native";
import { Button, SafeAreaView, View } from "react-native";
import PhonePeSdk from "react-native-phonepe-pg";
import BASE64 from "react-native-base64";
import sha256 from "sha256";

export const Payment = () => {
    const checkPhonePeInstalled = async () => {
        const url = "phonepe://";
        const isAvailable = await Linking.canOpenURL(url);
        console.log("✅ PhonePe Installed:", isAvailable);
        if (!isAvailable) {
            Alert.alert("Error", "PhonePe is not installed! Please install it and try again.");
        }
    };

    const openPhonePe = () => {
        Linking.openURL("phonepe://upi")
            .then(() => console.log("✅ PhonePe opened successfully"))
            .catch((err) => console.error("❌ Failed to open PhonePe:", err));
    };

    const [environment] = useState("SANDBOX");
    const [appId] = useState(null);
    const [merchantId] = useState("PGTESTPAYUAT86");
    const [enableLogging] = useState(true);

    const generateTransactionId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000000);
        return `T${timestamp}${random}`;
    };

    const handlePayment = async () => {
        console.log("⚡ Initializing Payment...");

        try {
            await PhonePeSdk.init(environment, merchantId, appId, enableLogging);
            console.log("✅ PhonePe SDK Initialized");

            const transactionId = generateTransactionId();
            const requestBody = {
                merchantId: merchantId,
                merchantTransactionId: transactionId,
                merchantUserId: "MUID123",
                amount: 10000,
                redirectUrl: "https://google.com",
                redirectMode: "REDIRECT", // 🔹 Change to POST
                callbackUrl: "https://google.com",
                mobileNumber: "9999999999",
                paymentInstrument: {
                    type: "PAY_PAGE"
                }
            };

            const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
            const salt_index = 1;
            const payload = JSON.stringify(requestBody);
            const payload_main = BASE64.encode(payload);
            const string = payload_main + "/pg/v1/pay" + salt_key;
            const checksum = sha256(string) + "###" + salt_index;

            console.log("🔹 Encoded Payload:", payload_main);
            console.log("🔹 Generated Checksum:", checksum);

            // 🔹 Ensure the correct package name is used (or use `null`)
            await PhonePeSdk.startTransaction(payload_main, checksum, null, "");
            console.log("✅ Transaction started successfully.");
        } catch (err) {
            console.error("❌ Transaction Error:", err);
            Alert.alert("Transaction Failed", err.message || "Something went wrong!");
        }
    };

    return (
        <View>
            <SafeAreaView>
                <Button title="Pay Now" onPress={handlePayment} />
                <Button title="Check PhonePe" onPress={checkPhonePeInstalled} />
                <Button title="open" onPress={openPhonePe}/>
                
            </SafeAreaView>
        </View>
    );
};
