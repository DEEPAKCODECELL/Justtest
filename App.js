import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import SplashScreen from './src/Home/SplashScreen';
import VerifyOtp from './src/ServiceProvider/VerifyOtp';
import AddressScreen from './src/Home/UserProfileList/AddressScreen';
import ChooseService from './src/Home/BookingServiceScreen';
import ReviewBookingPage from './src/Bookings/ReviewBookingPage';
import ActualProfile from './src/profile/ActualProfile';
import Policies from './src/profile/Policies';
import TermsAndConditions from './src/profile/Docs/TermAndCondition';
import BookingHistory from './src/Order/BookingHistory';
import OrderDetails from './src/Order/OrderDetails';
import FAQCategory from './src/Home/UserProfileList/FAQ/FAQCategory';
import FAQs from './src/Home/UserProfileList/FAQ/FAQScreen';
import ProfileSetup from './src/ServiceProvider/ProfileSetup';
import ServiceSelectionScreen from './src/ServiceProvider/ServiceSelection';
import LocationSelectionScreen from './src/ServiceProvider/LocationSelection';
import WorkDetailsScreen from './src/ServiceProvider/WorkDetails';
import WorkLocationScreen from './src/ServiceProvider/WorkLocation';
import HomeProvider from './src/ServiceProvider/HomeProvider';
import HorizontalScroll from './src/profile/Docs/TestUi';
import AroundYou from './src/ServiceProvider/AroundYou';
import UserProfile from './src/ServiceProvider/UserProfile';
import CategoryCreate from './src/Admin/CategoryCreate';
import LoadingBar from './src/ServiceProvider/components/LoadingBar';
import HomeScreen from './src/Home/HomeScreen';
import BottomTabs from './src/Home/BottomTabs';
import Login from './src/ServiceProvider/Login';
import FetchAddress from './src/Home/UserProfileList/FetchAddress';
import Payment from './src/Home/Payment';

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken'); // Get token from storage
        setIsAuthenticated(!!token); // If token exists, user is authenticated
      } catch (error) {
        console.log('Error checking auth status:', error);
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen name="BottomTabs">
            {() => <BottomTabs setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {() => <Login setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        )}

        {/* Other screens */}
        <Stack.Screen name="VerifyOtp">
          {() => <VerifyOtp setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="ChooseService" component={ChooseService} />
        <Stack.Screen name="ActualProfile" component={ActualProfile} />
        <Stack.Screen name="Policies" component={Policies} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen name="ReviewBookingPage" component={ReviewBookingPage} />
        <Stack.Screen name="BookingHistory" component={BookingHistory} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="FAQCategory" component={FAQCategory} />
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
        <Stack.Screen name="HorizontalScroll" component={HorizontalScroll} />
        <Stack.Screen name="AroundYou" component={AroundYou} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="CategoryCreate" component={CategoryCreate} />
        <Stack.Screen name="LoadingBar" component={LoadingBar} />
        <Stack.Screen name="FetchAddress" component={FetchAddress} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
