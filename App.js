import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/Home/SplashScreen";
import BottomTabs from "./src/Home/BottomTabs";
import AddressScreen from "./src/Home/UserProfileList/AddressScreen";
import ChooseService from "./src/Home/BookingServiceScreen";
import ReviewBookingPage from "./src/Bookings/ReviewBookingPage";
import ActualProfile from "./src/profile/ActualProfile";
import Policies from "./src/profile/Policies";
import TermsAndConditions from "./src/profile/Docs/TermAndCondition";
import BookingHistory from "./src/Order/BookingHistory";
import OrderDetails from "./src/Order/OrderDetails";
import FAQCategory from "./src/Home/UserProfileList/FAQ/FAQCategory";
import FAQs from "./src/Home/UserProfileList/FAQ/FAQScreen";
import Login from "./src/ServiceProvider/Login";
import ProfileSetup from "./src/ServiceProvider/ProfileSetup";
import ServiceSelectionScreen from "./src/ServiceProvider/ServiceSelection";
import LocationSelectionScreen from "./src/ServiceProvider/LocationSelection";
import WorkDetailsScreen from "./src/ServiceProvider/WorkDetails";
import WorkLocationScreen from "./src/ServiceProvider/WorkLocation";
import HomeProvider from "./src/ServiceProvider/HomeProvider";
import HorizontalScroll from "./src/profile/Docs/TestUi";

// Create Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Hide splash after 3 seconds
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={BottomTabs} />
              <Stack.Screen name="AddressScreen" component={AddressScreen} />
              <Stack.Screen name="ChooseService" component={ChooseService} />
              <Stack.Screen name="ActualProfile" component={ActualProfile} />
              <Stack.Screen name="Policies" component={Policies} />
              <Stack.Screen name="TermsAndConditions" component={TermsAndConditions}/>
              <Stack.Screen name="ReviewBookingPage" component={ReviewBookingPage} />
              <Stack.Screen name="BookingHistory" component={BookingHistory} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="FAQs" component={FAQs} />
            <Stack.Screen name="FAQCategory" component={FAQCategory} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
            <Stack.Screen
              name="ServiceSelection"
              component={ServiceSelectionScreen}
            />
            <Stack.Screen
              name="LocationSelection"
              component={LocationSelectionScreen}
            />
            <Stack.Screen name="WorkDetails" component={WorkDetailsScreen} />
            <Stack.Screen name="WorkLocation" component={WorkLocationScreen} />
              <Stack.Screen name="HomeProvider" component={HomeProvider} />
              <Stack.Screen name="HorizontalScroll" component={HorizontalScroll}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
