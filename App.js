import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import SplashScreen from "./src/Home/SplashScreen";
import VerifyOtp from "./src/ServiceProvider/VerifyOtp";
import AddressScreen from "./src/Home/UserProfileList/AddressScreen";
import ChooseService from "./src/Home/BookingServiceScreen";
import ReviewBookingPage from "./src/Bookings/ReviewBookingPage";
import ActualProfile from "./src/profile/ActualProfile";
import Policies from "./src/profile/Policies";
import TermsAndConditions from "./src/profile/Docs/TermAndCondition";
import FAQCategory from "./src/Home/UserProfileList/FAQ/FAQCategory";
import FAQs from "./src/Home/UserProfileList/FAQ/FAQScreen";
import ProfileSetup from "./src/ServiceProvider/ProfileSetup";
import ServiceSelectionScreen from "./src/ServiceProvider/ServiceSelection";
import LocationSelectionScreen from "./src/ServiceProvider/LocationSelection";
import WorkDetailsScreen from "./src/ServiceProvider/WorkDetails";
import WorkLocationScreen from "./src/ServiceProvider/WorkLocation";
import HomeProvider from "./src/ServiceProvider/HomeProvider";
import HorizontalScroll from "./src/profile/Docs/TestUi";
import AroundYou from "./src/ServiceProvider/AroundYou";
import UserProfile from "./src/ServiceProvider/UserProfile";
import CategoryCreate from "./src/Admin/CategoryCreate";
import LoadingBar from "./src/ServiceProvider/components/LoadingBar";
import HomeScreen from "./src/Home/HomeScreen";
import BottomTabs from "./src/Home/BottomTabs";
import Login from "./src/ServiceProvider/Login";
import FetchAddress from "./src/Home/UserProfileList/FetchAddress";
import MapComponent from "./MapComponent";
import HelpAndSupport from "./src/helpsupport/HelpAndSupport";
import { Payment } from "./src/Home/UserProfileList/Payment";
import BookingScreen from "./src/Bookings/BookingScreen";
import AdminBottomTabs from "./src/Admin/AdminBottomTabs";
import ProviderBottomTabs from "./src/realserviceprovider/ProviderBottomTabs";
import ActualServiceDetail from "./src/Admin/ActualServiceDetail";
import ActualServiceList from "./src/Admin/ActualServiceList";
import ServiceOptions from "./src/Admin/ServiceOptions";
import ServiceDetails from "./src/Admin/ServiceDetails";
import ServiceOptionForm from "./src/Admin/ServiceOptionForm";
import ServiceOptionList from "./src/Admin/ServiceOptionList";
import ActualServiceForm from "./src/Admin/ActualServiceForm";
import PromoCodeForm from "./src/Admin/PromoCode/PromoCodeForm";
import PromoCodeDetails from "./src/Admin/PromoCode/PromoCodeDetails";
import PromoCodeList from "./src/Admin/PromoCode/PromoCodeList";
import ProviderDetails from "./src/Admin/ProviderDetails";
import BookingDetails from "./src/Bookings/BookingDetailsScreen";
import BookingSuccess from "./src/Bookings/BookingSuccess";
import VerifyPaymentPage from "./src/Bookings/VerifyPaymentPage";
import PaymentFailure from "./src/Bookings/PaymentFailure";

const Stack = createStackNavigator();
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const[role,setRole]=useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken"); // Get token from storage
        const roleProfile=await AsyncStorage.getItem("role");
        setIsAuthenticated(!!token); // If token exists, user is authenticated
        setRole(roleProfile); // Get role from storage
      } catch (error) {
        console.log("Error checking auth status:", error);
      } finally {
        setTimeout(() => setShowSplash(false), 1500); // Hide splash after 1.5 sec
      }
    };

    checkAuthStatus();
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
  role === "User" ? (
    <Stack.Screen name="BottomTabs">
      {() => <BottomTabs setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
  ) : role === "Admin" ? (
    <Stack.Screen name="AdminBottomTabs">
      {() => <AdminBottomTabs setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
  ) : role === "ServiceProvider" ? (
    <Stack.Screen name="ProviderBottomTabs">
      {() => <ProviderBottomTabs setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
  ) : (
    <Stack.Screen name="Login">
      {() => <Login setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
  )
) : (
  <Stack.Screen name="Login">
    {() => <Login setIsAuthenticated={setIsAuthenticated} />}
  </Stack.Screen>
)}

        {/* Other screens */}
        <Stack.Screen name="VerifyOtp">
          {()=><VerifyOtp setIsAuthenticated={setIsAuthenticated}/>}
        </Stack.Screen>
        <Stack.Screen name="LoginAfterLogout">
      {() => <Login setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
        <Stack.Screen name="BottomTabsUser">
      {() => <BottomTabs setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
     <Stack.Screen name="AdminBottomTabsUser">
      {() => <AdminBottomTabs setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>   
    <Stack.Screen name="ProviderBottomTabsUser">
      {() => <ProviderBottomTabs setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
        <Stack.Screen name="FetchAddress">
          {()=><FetchAddress setIsAuthenticated={setIsAuthenticated}/>}
        </Stack.Screen>
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="ChooseService" component={ChooseService} />
        <Stack.Screen name="ActualProfile" component={ActualProfile} />
        <Stack.Screen name="Policies" component={Policies} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions}/>
        <Stack.Screen name="ReviewBookingPage" component={ReviewBookingPage} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="FAQCategory" component={FAQCategory} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="ServiceSelection" component={ServiceSelectionScreen} />
        <Stack.Screen name="LocationSelection" component={LocationSelectionScreen} />
        <Stack.Screen name="WorkDetails" component={WorkDetailsScreen} />
        <Stack.Screen name="WorkLocation" component={WorkLocationScreen} />
        <Stack.Screen name="HomeProvider" component={HomeProvider} />
        <Stack.Screen name="HorizontalScroll" component={HorizontalScroll} />
        <Stack.Screen name="AroundYou" component={AroundYou} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="CategoryCreate" component={CategoryCreate} />
        <Stack.Screen name="LoadingBar" component={LoadingBar} />
        <Stack.Screen name="MapComponent" component={MapComponent} />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="ActualServiceDetail" component={ActualServiceDetail} />
        <Stack.Screen name="ActualServices" component={ActualServiceList} />
        <Stack.Screen name="ServiceOptions" component={ServiceOptions} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="ActualServiceForm" component={ActualServiceForm} />
        <Stack.Screen name="ServiceOptionForm" component={ServiceOptionForm} />
        <Stack.Screen name="ServiceOptionList" component={ServiceOptionList} />
        <Stack.Screen name="PromoCodeList" component={PromoCodeList} options={{ title: "Promo Codes" }} />
      <Stack.Screen name="PromoCodeForm" component={PromoCodeForm} options={{ title: "Create/Edit Promo Code" }} />
        <Stack.Screen name="PromoCodeDetails" component={PromoCodeDetails} options={{ title: "Promo Code Details" }} />
        <Stack.Screen name="ProviderDetails" component={ProviderDetails} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
        <Stack.Screen name="VerifyPaymentPage" component={VerifyPaymentPage} />
        <Stack.Screen name="PaymentFailure" component={PaymentFailure} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

