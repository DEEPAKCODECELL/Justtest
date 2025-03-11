// import { useState } from "react";
// import { Linking, Alert } from "react-native";
// import { Button, SafeAreaView, View } from "react-native";
// import PhonePeSdk from "react-native-phonepe-pg";
// import BASE64 from "react-native-base64";
// import sha256 from "sha256";
// import apiClient from "../../redux/api/apiClient";

// export const Payment = () => {
//     const checkPhonePeInstalled = async () => {
//         const url = "phonepe://";
//         const isAvailable = await Linking.canOpenURL(url);
//         console.log("✅ PhonePe Installed:", isAvailable);
//         if (!isAvailable) {
//             Alert.alert("Error", "PhonePe is not installed! Please install it and try again.");
//         }
//     };

//     const initiatePayment = async () => {
//         try {
//             // 🔥 Request Payment URL from Backend
//             const response = await apiClient.post("/payment/pay", {
//                 amount: 100, // ₹1.00
//                 mobileNumber: "9876543210"
//             });

//             if (response.data.success) {
//                 const url = response.data.paymentUrl;
//                 Linking.openURL(url); // 🔗 Redirect to PhonePe Checkout Page
//             } else {
//                 console.error("Payment initiation failed");
//             }
//         } catch (error) {
//             console.error("Error initiating payment", error);
//         }
//     };

//     const openPhonePe = () => {
//         Linking.openURL("phonepe://upi")
//             .then(() => console.log("✅ PhonePe opened successfully"))
//             .catch((err) => console.error("❌ Failed to open PhonePe:", err));
//     };

//     const [environment] = useState("SANDBOX");
//     const [appId] = useState(null);
//     const [merchantId] = useState("PGTESTPAYUAT86");
//     const [enableLogging] = useState(true);

//     const generateTransactionId = () => {
//         const timestamp = Date.now();
//         const random = Math.floor(Math.random() * 10000000);
//         return `T${timestamp}${random}`;
//     };

//     const handlePayment = async () => {
//         console.log("⚡ Initializing Payment... to checkout");

//         try {
//             await PhonePeSdk.init(environment, merchantId, appId, enableLogging);
//             console.log("✅ PhonePe SDK Initialized");

//             const transactionId = generateTransactionId();
//             const requestBody = {
//                 merchantId: merchantId,
//                 merchantTransactionId: transactionId,
//                 merchantUserId: "MUID123",
//                 amount: 10000,
//                 callbackUrl: "http://localhost:4000/payment/payment/callback",
//                 mobileNumber: "9999999999",
//                 paymentInstrument: {
//                     type: "PAY_PAGE"
//                 }
//             };

//             const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
//             const salt_index = 1;
//             const payload = JSON.stringify(requestBody);
//             const payload_main = BASE64.encode(payload);
//             const string = payload_main + "/pg/v1/pay" + salt_key;
//             const checksum = sha256(string) + "###" + salt_index;

//             console.log("🔹 Encoded Payload:", payload_main);
//             console.log("🔹 Generated Checksum:", checksum);

//             // 🔹 Ensure the correct package name is used (or use `null`)
//             await PhonePeSdk.startTransaction(payload_main, checksum, null,null);
//             console.log("✅ Transaction started successfully.");
//         } catch (err) {
//             console.error("❌ Transaction Error:", err);
//             Alert.alert("Transaction Failed", err.message || "Something went wrong!");
//         }
//     };

//     return (
//         // <View>
//         //     <SafeAreaView>
//         //         <Button title="Pay Now" onPress={handlePayment} />
//         //         <Button title="Check PhonePe" onPress={checkPhonePeInstalled} />
//         //         <Button title="open" onPress={openPhonePe}/>
                
//         //     </SafeAreaView>
//         // </View>
//         <View>
//             <Button title="Pay with PhonePe" onPress={initiatePayment} />
//         </View>
//     );
// };


import { useState } from "react";
import { Linking, Alert, ActivityIndicator } from "react-native";
import { Button, SafeAreaView, View, Text } from "react-native";
import WebView from "react-native-webview";
import apiClient from "../../redux/api/apiClient";

export const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      // Request Payment URL from Backend
      const response = await apiClient.post("/payment/pay", {
       userId:"67c93aa407c0f2ece0e9e0c9",
       amount:100,
       booking:"67c93aa307c0f2ece0e9e0c7"
      });

        if (response.data.success) {
        console.log("Payment URL received:", response.data);
        console.log("Payment URL received:", response.data.data.data.instrumentResponse.redirectInfo);
        console.log("Payment URL received:", response.data.data.data.instrumentResponse.redirectInfo); 
        console.log("Payment URL received:", response.data.data.data.instrumentResponse.redirectInfo.url);    
        const url = response.data.data.data.instrumentResponse.redirectInfo.url;
        console.log("Payment URL received:", url);
        
        // Store the URL in state
        setPaymentUrl(url);
      } else {
        Alert.alert("Error", response.data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment", error);
      Alert.alert("Error", "Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState) => {
    console.log("WebView navigating to:", navState.url);

    if (navState.url.includes('success')) {
        // ✅ Manually extract query parameters
        const queryParams = navState.url.split('?')[1]; // Get query string
        const params = queryParams.split('&'); // Split into key-value pairs

        let transactionId = null;
        params.forEach(param => {
            const [key, value] = param.split('=');
            if (key === 'merchantTransactionId') {
                transactionId = value;
            }
        });

        if (transactionId) {
            verifyPaymentStatus(transactionId);
        }
    } else if (navState.url.includes('failure') || navState.url.includes('your-failure-path')) {
        setPaymentUrl(null); // Close WebView
        Alert.alert("Failed", "Payment was not successful. Please try again.");
    }
};

    
    const verifyPaymentStatus = async (transactionId) => {
  try {
    const response = await apiClient.get(`/payment/status/${transactionId}`);
    
    if (response.data.paymentSuccess) {
      // Payment confirmed successful
      setPaymentUrl(null); // Close WebView
      Alert.alert("Success", "Payment completed successfully!");
      // Update your app state, navigate to receipt page, etc.
    } else {
      // Payment failed or pending
      setPaymentUrl(null);
      Alert.alert("Payment Issue", response.data.message || "Payment verification failed");
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    setPaymentUrl(null);
    Alert.alert("Verification Error", "Could not verify payment status. Please contact support.");
  }
};

  // If we have a payment URL, show WebView with the checkout page
  if (paymentUrl) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title={loading ? "Processing..." : "Pay with PhonePe"} 
        onPress={initiatePayment}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
};
