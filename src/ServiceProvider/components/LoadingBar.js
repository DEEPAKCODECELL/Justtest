import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import tw from "../../../tailwind";

const LoadingBar = ({ loading }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200, // Smooth rotation
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <View style={tw`absolute inset-0 flex items-center justify-center bg-white/50`}>
      {/* Circular Loader */}
      <Animated.View
        style={[
          tw`w-16 h-16 border-4 border-gray-300 rounded-full border-t-pink-500`,
          {
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default LoadingBar;
