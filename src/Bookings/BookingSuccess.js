import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { View, Text } from "react-native";
import tw from "twrnc"; // Assuming you are using Tailwind in React Native

const BookingSuccess = () => {
    const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const successTimeout = setTimeout(() => {
      setShowModal(true); // Show modal after 5 seconds
    }, 5000);

    const redirectTimeout = setTimeout(() => {
      navigation.navigate("BookingScreen"); //redirecdt in 5 sec
    }, 10000);

    return () => {
      clearTimeout(successTimeout);
      clearTimeout(redirectTimeout);
    };
  }, []);

    return (
      <>
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-2xl font-bold text-green-500`}>Booking Successful!</Text>
      <Text style={tw`text-lg text-gray-600 mt-2`}>Redirecting you shortly...</Text>

      {/* Modal appears after 5 sec */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl`}>
            <Text style={tw`text-xl font-bold text-green-500`}>Booking Confirmed!</Text>
            <Text style={tw`text-gray-600 mt-2`}>You will be redirected to your bookings...</Text>
          </View>
        </View>
      </Modal>
      </View>
    
            </>
  );
};

export default BookingSuccess;
