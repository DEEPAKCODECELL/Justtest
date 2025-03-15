import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Text, Image } from "react-native";
import tw from "../../tailwind";

const data = [
    { id: 1, title: "Verified Experts", description: "With valid ID proof & a spotless background for your peace of mind", },
    { id: 2, title: "Quality Service", description: "We ensure top-quality services with trained professionals.", },
    { id: 3, title: "Fast & Reliable", description: "Get quick service from nearby providers at your convenience.", },
];

const ScrollCard = () => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % data.length;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={tw`mt-4 mb-30`}>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                style={tw`h-50`}
                renderItem={({ item }) => (
                    <View style={tw`w-80 p-4 rounded-lg bg-white shadow-lg mx-2`}>
                        <Text style={tw`text-lg font-bold text-gray-900`}>{item.title}</Text>
                        <Text style={tw`text-sm text-gray-600 mt-1`}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ScrollCard;
