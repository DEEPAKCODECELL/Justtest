import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing } from "react-native";
import tw from "../../../tailwind";

const LoadingBar = ({loading}) => {
    const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (loading) {
      progress.setValue(0); // Reset animation
      Animated.loop(
        Animated.timing(progress, {
          toValue: 1, // Move from left (0) to right (1)
          duration: 1500, // 2 seconds animation
          easing: Easing.linear, // Smooth linear animation
          useNativeDriver: false,
        })
      ).start();
    } else {
      progress.setValue(0); // Reset when stopped
    }
  }, [loading]);

  if (!loading) return null; // Hide bar when not loading

  return (
    <View style={tw`absolute top-0 left-0 right-0 h-1 bg-gray-200`}>
      <Animated.View
        style={[
          tw`h-full bg-pink-500`,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["10%", "100%"], // Move across screen
            }),
          },
        ]}
      />
      <SkeletonLoader />
    </View>
  );
};
const SkeletonLoader = () => {
  return (
    <View style={tw`p-4`}> 
      <View style={tw`h-40 bg-gray-300 rounded w-full mb-2 mt-2`} /> 
      <View style={tw`h-40 bg-gray-300 rounded w-full mb-2`} /> 
      <View style={tw`h-70 bg-gray-300 rounded w-full mb-2`} /> 
    </View>
  );
};
export default LoadingBar;
