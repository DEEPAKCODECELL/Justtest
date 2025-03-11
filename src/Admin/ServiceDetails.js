import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ServiceDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch service details (Replace with API call)
    setTimeout(() => {
      const fetchedService = {
        id: serviceId,
        name: 'Premium Cleaning',
        description: 'A top-quality home cleaning service.',
        price: 50,
        rating: 4.8,
        duration: 90,
        images: [
          'https://via.placeholder.com/200',
          'https://via.placeholder.com/200',
        ],
        provider: 'Elite Cleaners',
      };
      setService(fetchedService);
      setLoading(false);
    }, 1000);
  }, [serviceId]);

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <Text style={tw`text-lg font-semibold text-gray-700`}>Service Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute left-4 top-4 z-10 p-2 bg-gray-100 rounded-full`}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-center mt-6`}>{service.name}</Text>
        <Text style={tw`text-gray-500 text-center mt-2`}>{service.provider}</Text>
        <Text style={tw`text-lg text-center mt-1 text-green-500 font-semibold`}>${service.price}</Text>
        <Text style={tw`text-sm text-center text-gray-600`}>Duration: {service.duration} mins</Text>
        <Text style={tw`text-sm text-center text-yellow-500 mt-1`}>⭐ {service.rating}</Text>
        
        <FlatList
          data={service.images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={tw`w-40 h-40 rounded-lg m-2`} />
          )}
        />

        <Text style={tw`mt-4 text-gray-700`}>{service.description}</Text>
        
        <TouchableOpacity
          style={tw`mt-6 bg-blue-600 p-3 rounded-lg items-center`}
          onPress={() => Alert.alert('Booking Confirmed', 'Your service has been booked!')}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ServiceDetails;
