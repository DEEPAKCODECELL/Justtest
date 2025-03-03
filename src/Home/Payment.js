import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {WebView} from 'react-native-webview';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [transactionUrl, setTransactionUrl] = useState(null);

  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://192.168.1.5:4000/payment/pay', {
        userId: '67a7a2089caaa7ca7a9d2a43',
        booking: '67b3ed3977ecf9b13bcc506c',
        amount: parseInt(amount) * 100, // Convert to paise
      });

      if (response.data.success) {
        setTransactionUrl(response.data.data.paymentUrl);

        // Polling to check payment status
        const checkStatus = setInterval(async () => {
          try {
            const statusResponse = await axios.get(
              `http://192.168.1.5:4000/payment/status/${response.data.data.transactionId}`,
            );

            if (
              statusResponse.data.success &&
              statusResponse.data.data.status === 'SUCCESS'
            ) {
              clearInterval(checkStatus);
              Alert.alert('Success', 'Payment completed successfully!');
              setTransactionUrl(null);
            } else if (statusResponse.data.data.status === 'FAILED') {
              clearInterval(checkStatus);
              Alert.alert('Error', 'Payment failed.');
              setTransactionUrl(null);
            }
          } catch (err) {
            console.error('Error checking payment status', err);
          }
        }, 3000); // Check every 3 seconds
      } else {
        Alert.alert('Error', 'Payment initiation failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (transactionUrl) {
    return <WebView source={{uri: transactionUrl}} style={tw`flex-1`} />;
  }

  return (
    <View style={tw`flex-1 items-center justify-center p-4 bg-white`}>
      <Text style={tw`text-xl font-bold mb-4`}>Enter Payment Amount</Text>
      <TextInput
        style={tw`border border-gray-400 p-3 w-full rounded-lg mb-4`}
        placeholder="Amount in INR"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-lg w-full items-center`}
        onPress={initiatePayment}>
        <Text style={tw`text-white font-bold`}>Pay with PhonePe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
