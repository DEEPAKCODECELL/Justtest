import React from "react";
import { FlatList, Text, View, Image } from "react-native";
import tw from "../../../tailwind";


const DATA = [
  { id: "1", title: "Item 1", image: "https://via.placeholder.com/150" },
  { id: "2", title: "Item 2", image: "https://via.placeholder.com/150" },
  { id: "3", title: "Item 3", image: "https://via.placeholder.com/150" },
  { id: "4", title: "Item 4", image: "https://via.placeholder.com/150" },
    { id: "5", title: "Item 5", image: "https://via.placeholder.com/150" },
  { id: "6", title: "Item 4", image: "https://via.placeholder.com/150" },
    { id: "7", title: "Item 5", image: "https://via.placeholder.com/150" },
  { id: "8", title: "Item 4", image: "https://via.placeholder.com/150" },
  { id: "9", title: "Item 5", image: "https://via.placeholder.com/150" },
];

const HorizontalScroll = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <FlatList
        data={DATA}
        horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4`}
        renderItem={({ item }) => (
          <View style={tw`m-2 p-4 bg-white rounded-lg shadow-lg`}>
            <Image source={{ uri: item.image }} style={tw`w-24 h-24 rounded-lg`} />
            <Text style={tw`text-center text-black mt-2`}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HorizontalScroll;
