import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search, Target, MapPin, CodeSquare } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import useFetchLocation from '../../Hook/useFetchLocation';
import { fetchAutocompleteSuggestions, updateUserLocation } from '../../redux/slices/userSlice';

const Header = ({ title = "Your Address", showBackButton = true }) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-row items-center p-5 bg-white border-b border-gray-200`}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={tw`text-lg font-semibold flex-1 text-center`}>{title}</Text>
      {showBackButton && <View style={tw`w-6`} />}
    </View>
  );
};

const SearchBox = ({ placeholder = "Add a new address", onSelect }) => {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (text) => {
    setSearchQuery(text);

    if (text.length >= 3) {
      await dispatch(
        fetchAutocompleteSuggestions({
          keyword: text,
          cityLat: 12.9716,
          cityLng: 77.5946,
          radius: 5000,
        })
      );
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    console.log("Selected:", suggestion.description);
    const response = await dispatch(updateUserLocation({
  latitude: null,
  longitude: null,
  searchQuery: suggestion.description
   }));

    console.log(response,"after")
  };

  return (
    <View style={tw`relative w-full p-3`}>
      <View style={tw`absolute left-3 top-4`}>
        <Search size={20} color="gray" />
      </View>
      <TextInput
        style={tw`pl-10 py-2 border border-gray-300 rounded-lg`}
        placeholder={placeholder}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {loading && <ActivityIndicator size="small" color="gray" style={tw`mt-2`} />}

      {searchQuery&&searchQuery.length>=3&&suggestions&&suggestions.length > 0 && (
        <View style={tw`absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50`}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionClick(item)} style={tw`p-3 border-b border-gray-200`}>
                <Text style={tw`font-medium`}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const CurrentLocation = () => {
  const [fetchLocation, setFetchLocation] = useState(false);
  const { isLoading, error } = useFetchLocation(fetchLocation);

  return (
    <View style={tw`flex-row items-center p-4`}>
      <View style={tw`p-3 bg-pink-100 rounded-full`}>
        <Target size={24} color="pink" />
      </View>
      <View style={tw`ml-2`}>
        <Text style={tw`text-pink-500 font-medium`}>Current Location</Text>
        <TouchableOpacity onPress={() => setFetchLocation(true)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : (
            <Text style={tw`text-gray-500 underline`}>
              {error ? "Location Error. Retry?" : "Using GPS"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SavedLocation = ({ location, onClick }) => {
  console.log("SavedLocation",location)
  return(
    <TouchableOpacity style={tw`flex-row items-start p-4 rounded-lg bg-gray-50 mb-2`} onPress={() => onClick?.(location)}>
      <View style={tw`p-3 bg-purple-100 rounded-full`}>
        <MapPin size={24} color="purple" />
      </View>
      <View style={tw`ml-3 flex-1`}>
        <Text style={tw`font-medium`}>{location}</Text>
        <Text style={tw`text-gray-500 text-sm`} numberOfLines={1}>{location.address}</Text>
      </View>
    </TouchableOpacity>
  )
};

const AddressScreen = () => {
  const data = useSelector((state) => state.user)
  console.log("data check", data?.user?.data?.listofAddress)
  const[locations,setLocations]=useState(data?.user?.data?.listofAddress || null)
  const handleLocationClick = (location) => console.log("Selected Location:", location);

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Header title="Your Address" />
          <SearchBox onSelect={(val) => console.log("Selected Address:", val)} />
          <CurrentLocation />
          <Text style={tw`text-lg font-medium mb-2`}>Saved Locations</Text>
          {locations.map((location, index) => (
            <SavedLocation key={index} location={location} onClick={handleLocationClick} />
          ))}
        </>
      }
      data={[]} // No extra list items needed
      keyExtractor={() => null}
      contentContainerStyle={tw`p-4`}
    />
  );
};

export default AddressScreen;
