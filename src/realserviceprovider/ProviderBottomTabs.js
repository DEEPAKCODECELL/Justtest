import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { Text, View } from "react-native";
import useAuthRole from "../Hook/useAuthRole";
import HomeProvider from "../ServiceProvider/HomeProvider";
import ProfileScreen from "../profile/ProfileScreen";
import AroundYou from "../ServiceProvider/AroundYou";
import UserProfile from "../ServiceProvider/UserProfile";


const Tab = createBottomTabNavigator();

const ProgressIcon = ({ size = 24, color = "black" }) => <Text style={{ fontSize: size }}>📊</Text>;
const MoneyIcon = ({ size = 24, color = "black" }) => <Text style={{ fontSize: size }}>💰</Text>;
const AroundYouIcon = ({ size = 24, color = "black" }) => (
  <Text style={{ fontSize: size, color: "amber-800", fontWeight: "bold" }}>UC</Text>
);
const CallIcon = ({ size = 24, color = "black" }) => <Text style={{ fontSize: size }}>🔄</Text>;
const ProfileIcon = ({ size = 24, color = "black" }) => <Text style={{ fontSize: size }}>👤</Text>;

const ProviderBottomTabs = ({ setIsAuthenticated }) => {
  const { role, isLoading } = useAuthRole();
  
  if (isLoading) {
    return <Text>Loading...</Text>; // Show loading while fetching role
  }

  if (role !== "ServiceProvider") {
    return <Text>Access Denied</Text>; // Restrict access for non-provider users
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          borderTopWidth: 0,
          shadowOpacity: 0.1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Progress") return <ProgressIcon size={size} color={color} />;
          if (route.name === "Money") return <MoneyIcon size={size} color={color} />;
          if (route.name === "Around You") return <AroundYouIcon size={size} color={color} />;
          if (route.name === "Call") return <CallIcon size={size} color={color} />;
          if (route.name === "Profile") return <ProfileIcon size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Progress" component={HomeProvider} />
      <Tab.Screen name="Around You" component={AroundYou} />
      <Tab.Screen name="Profile">
        {() => <ProfileScreen setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ProviderBottomTabs;
