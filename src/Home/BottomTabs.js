import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "../profile/ProfileScreen";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import BookingScreen from "../Bookings/BookingScreen";
import useAuthRole from "../Hook/useAuthRole";
import { Text } from "react-native";
import useWebSocket from "../Hook/GetRealtimeLocation";
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();

const HomeIcon = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10L12 3L21 10V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 21V12H15V21" stroke={color} strokeWidth="2" />
  </Svg>
);
const ProfileIcon = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
    <Path
      d="M4 21C4 17.13 7.13 14 11 14H13C16.87 14 20 17.13 20 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const BookingIcon = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M8 3V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 3V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M3 11H21" stroke={color} strokeWidth="2" />
  </Svg>
);

const BottomTabs = ({ setIsAuthenticated }) => {
  const user_id = useSelector((state) => state?.user?.user?.data?._id);
  console.log("userid", user_id);
  const socket=useWebSocket("http://192.168.173.18:4000",user_id)
  const { role, isLoading } = useAuthRole();
  if (isLoading) {
    return <Text>Loading...</Text>; // Show loading while fetching role
  }
  if (role !== "User") {
    return <Text>Access Denied</Text>; // Restrict access for non-admin users
  }
  return (<Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#fff", // Customize tab background color
        height: 60, // Increase height for better UI
        borderTopWidth: 0, // Remove top border
        shadowOpacity: 0.1, // Add slight shadow
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
      tabBarActiveTintColor: "#007bff", // Active tab color
      tabBarInactiveTintColor: "gray", // Inactive tab color
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Home") return <HomeIcon size={size} color={color} />;
        if (route.name === "Profile") return <ProfileIcon size={size} color={color} />;
        if (route.name === "Bookings") return <BookingIcon size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile">
  {() => <ProfileScreen setIsAuthenticated={setIsAuthenticated} />}
</Tab.Screen>
    <Tab.Screen name="Bookings" component={BookingScreen} />
  </Tab.Navigator>
  )
};

export default BottomTabs;
