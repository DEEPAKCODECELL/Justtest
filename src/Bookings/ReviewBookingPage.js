import { View, Text, TouchableOpacity,TextInput,Animated, Modal,BackHandler } from "react-native";
import { ArrowLeft, Home, ChevronRight, Percent, CreditCard, ChevronDown, CheckCircle } from "lucide-react-native";
import tw from "../../tailwind";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { applyPromoCode, makeBooking } from "../redux/slices/bookingSlice";
import AddressScreen from "../Home/UserProfileList/AddressScreen";
import { BlurView } from "@react-native-community/blur";
import BookingSuccess from "./BookingSuccess";

const ReviewBookingPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [pointsUsed, SetPointsUsed] = useState("0");
  const [showOptions, setShowOptions] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [modeOfPayment, setModeOfPayment] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleForSuccess, setModalVisibleForSuccess] = useState(false);
  const addessdata = useSelector((state) => state?.user?.user?.data?.current_address);
  const locationdata=useSelector((state) => state?.user?.user?.data);
  console.log("addressdata now check by deepak",addessdata);

  const togglePaymentOptions = () => {
    setShowOptions(!showOptions);
    Animated.timing(fadeAnim, {
      toValue: showOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const selectPaymentMode = (mode) => {
    setModeOfPayment(mode);
    setShowOptions(false);
  };
  // Get booking data from Redux
  const Bookingdata = useSelector((state) => state.booking.currentBooking.data);
  const promoCodeSuccess = useSelector((state) => state.booking.successPromo);
  const promoCodeDiscount = useSelector((state) => state.booking.promocodediscount)
  const userPoints = useSelector((state) => state.user?.user?.data?.points)
  console.log("points", userPoints);
  const [showFinalPrice, setShowFinalPrice] = useState(parseFloat((Bookingdata.finalPrice)/100)-(parseFloat((promoCodeDiscount/100))));
  console.log("points1", showFinalPrice,parseFloat((Bookingdata.finalPrice)/100));

  // Format the booking data
  const formattedBooking = Bookingdata
    ? {
        date: moment(Bookingdata.date).format("DD MMM YYYY"),
        time: moment(Bookingdata.start_time).format("hh:mm A"),
        duration: Bookingdata.duration + " minutes",
        discount: `₹${(Bookingdata.discount / 100).toFixed(2)}`, // Convert paise to rupees
        actualPrice: `₹${(Bookingdata.actualPrice / 100).toFixed(2)}`,
        taxes: `₹${(Bookingdata.taxes / 100).toFixed(2)}`,
        finalPrice: `₹${(Bookingdata.finalPrice / 100).toFixed(2)}`,
        promoCodeDiscount:`₹${(promoCodeDiscount/100).toFixed(2)}`
      }
    : null;
const PointsMap = { 500: 30, 750: 60,1000:100 }; // Define the points limit mapping

const limitToUsePoints = () => {
  let allowedPoints = 0;

  // Check which price range applies
  const maxvalue=100
  for (const priceLimit in PointsMap) {
    if (Bookingdata.finalPrice >= parseInt(priceLimit)) {
      allowedPoints = PointsMap[priceLimit] ? parseInt(PointsMap[priceLimit]) : maxvalue;
      // If PointsMap[priceLimit] is empty, allow full usage of userPoints
    }
    else break;
  }

  return allowedPoints;
};

const handleSelectAddress = () => {
    setModalVisible(true);
}; 
const handleapplypoints = () => {
  if (parseFloat(userPoints) <= 0) {
    console.log("No Points available");
    return;
  }
  console.log(pointsUsed,"wow");
  if (pointsUsed != "0") {
    console.log('inde')
    setShowFinalPrice(parseFloat((Bookingdata.finalPrice) / 100) - (parseFloat((promoCodeDiscount / 100))));
    SetPointsUsed(()=>"0");
    return;
  }

  const maxPointsAllowed = limitToUsePoints();

  if (parseFloat(userPoints) > maxPointsAllowed) {
    console.log(`You can only use up to ${maxPointsAllowed} points`);
    SetPointsUsed(maxPointsAllowed);
  } else {
    SetPointsUsed(userPoints);
    const prevprice = showFinalPrice - pointsUsed;
    console.log("prev",prevprice,showFinalPrice)
    setShowFinalPrice(prevprice);
  }
};
  const handleApplyPromoCode = async () => {
    if (!promoCode) return;
    console.log("booking",Bookingdata.BookingId);
    const response = await dispatch(applyPromoCode({ bookingId:Bookingdata.BookingId,promoCode: promoCode }));
    if (response && response.payload.success) {
      setExpanded(!expanded);
    }
  }

  const handleBooking = () => {
    console.log("user", locationdata);
    const locationData = {
       current_address: locationdata?.current_address || "",
       location:locationdata.address.location 
    };
    console.log("handle Boking", modeOfPayment, pointsUsed, showFinalPrice, Bookingdata.BookingId, locationData);
    const response = dispatch(makeBooking({ modeOfPayment: modeOfPayment,showFinalPrice:showFinalPrice, pointsUsed: pointsUsed, bookingId: Bookingdata.BookingId, location: locationData, status:"confirmed"}));
    if (response) {
      console.log("make Bookng Response", response);
      setModalVisibleForSuccess(true);
    }
  }

  useEffect(() => {
  const backAction = () => {
    if (isModalVisible) {
      setModalVisible(false); // Close modal instead of navigating back
      return true; // Prevents default back action
    }
    return false; // Allows normal navigation if modal is not open
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, [isModalVisible]);


  return (
    <ScrollView style={tw`flex-1 bg-gray-50`} showsVerticalScrollIndicator={false}>
       {(isModalVisible || isModalVisibleForSuccess) && (
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1, // Ensure it's behind the modal
          }}
          blurType="light" // Can be "dark", "extraLight", "light"
          blurAmount={30} // Adjust blur intensity
          reducedTransparencyFallbackColor="white"
        />
      )}
      {/* Header */}
      <View style={tw`bg-white shadow-sm py-4 px-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full`}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`ml-4 text-xl font-semibold`}>Review Booking</Text>
      </View>

      <View style={tw`px-4 py-6`}>
        {/* Location Section */}
        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center space-x-3`}>
              <Home size={20} color="gray" />
              <Text style={tw`font-medium`}>{addessdata.slice(4,40)}</Text>
            </View>
            <TouchableOpacity onPress={handleSelectAddress}>
              <Text style={tw`text-purple-600 font-medium`}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Details */}
        {formattedBooking && (
          <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-4`}>
            <View style={tw`flex-row justify-between items-start`}>
              <View>
                <Text style={tw`text-xl font-semibold`}>Your Booking Details</Text>
                <Text style={tw`text-gray-600 mt-1`}>{formattedBooking.actualPrice}</Text>
              </View>
            </View>
            <View style={tw`mt-3`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-gray-600`}>Date:</Text>
                <Text>{formattedBooking.date}</Text>
              </View>
              <View style={tw`flex-row justify-between mt-1`}>
                <Text style={tw`text-gray-600`}>Start Time:</Text>
                <Text>{formattedBooking.time}</Text>
              </View>
              <View style={tw`flex-row justify-between mt-1`}>
                <Text style={tw`text-gray-600`}>Duration:</Text>
                <Text>{formattedBooking.duration}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Pricing Section */}
        {formattedBooking && (
          <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-4`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Actual Price:</Text>
              <Text>{formattedBooking.actualPrice}</Text>
            </View>
            <View style={tw`flex-row justify-between mt-1`}>
              <Text style={tw`text-gray-600`}>Discount:</Text>
              <Text>{formattedBooking.discount}</Text>
            </View>
            <View style={tw`flex-row justify-between mt-1`}>
              <Text style={tw`text-gray-600`}>Taxes:</Text>
              <Text>{formattedBooking.taxes}</Text>
            </View>
            {promoCodeSuccess&&<View style={tw`flex-row justify-between mt-1`}>
              <Text style={tw`text-gray-600`}>Promo Code Discount:</Text>
              <Text>{formattedBooking.promoCodeDiscount}</Text>
            </View>}
            <View style={tw`flex-row justify-between mt-2 font-bold`}>
              <Text style={tw`text-lg font-semibold`}>Final Price:</Text>
              <Text style={tw`text-lg font-semibold text-green-600`}>
                {(showFinalPrice)}
              </Text>
            </View>
          </View>
        )}

        {/* Coupons Section */}
        <View>
      {/* Main Touchable to Expand */}
      <TouchableOpacity 
        style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`} 
        onPress={() => setExpanded(!expanded)}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center space-x-3`}>
            <View style={tw`p-4 bg-green-100 rounded-lg`}>
              {(promoCodeSuccess&&promoCode.length)?(<CheckCircle size={30} color="green" />):(<Percent size={30} color="green" />)}
            </View>
            <View>
              <Text style={tw`font-medium`}>Apply coupons or offers</Text>
              <Text style={tw`text-sm text-green-600`}>1 coupon available</Text>
            </View>
          </View>
          {expanded ? <ChevronDown size={20} color="gray" /> : <ChevronRight size={20} color="gray" />}
        </View>
      </TouchableOpacity>

      {/* Expanded Section for Promo Code Input */}
      {expanded && (
        <View style={tw`bg-white p-4 rounded-xl shadow-sm`}>
          <Text style={tw`text-gray-700 mb-2`}>Enter Promo Code</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 text-base`}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity 
            style={tw`mt-3 bg-green-500 p-3 rounded-lg`}
            onPress={handleApplyPromoCode}
          >
            <Text style={tw`text-white text-center font-semibold`}>Apply</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

        {/* Wallet Section */}
        <TouchableOpacity
          onPress={handleapplypoints}
        >
        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>
          <View style={tw`flex-row items-center space-x-3`}>
            <View style={tw`p-4 bg-gray-100 rounded-lg`}>
              <CreditCard size={20} color="gray" />
            </View>
            <View>
              <Text style={tw`font-medium`}>Redeem using wallet</Text>
              <Text style={tw`text-sm text-gray-600`}>Credit Balance: ₹{userPoints}.0</Text>
              </View>
              {pointsUsed!="0"&&<View>
                <Text style={tw`font-medium`}>Points Used</Text>
                <Text style={tw`text-sm text-gray-600`}>You Used: ₹{userPoints}.0</Text>
                <>(<CheckCircle size={30} color="green" />)</>
              </View>}
          </View>
          </View>
          </TouchableOpacity>

        {/* Refund Policy */}
        <View style={tw`h-40 mt-4`}>
          <Text style={tw`font-semibold`}>Refund & cancellation policy
            <TouchableOpacity>
            <Text style={tw`text-purple-600 font-medium`}>Learn more</Text>
          </TouchableOpacity>
          </Text>
          <Text style={tw`text-gray-600 text-sm`}>
            Free cancellations/refund if done more than 30 mins before the service. A fee will be charged otherwise.
          </Text>
        </View>
      </View>

      {/* Fixed Bottom Button */}
      {formattedBooking && (
         <View style={tw`p-4 bg-white border-t absolute bottom-0 left-0 right-0`}>
      {/* If no payment option is selected, show "Proceed to Pay" */}
      {!showOptions && !modeOfPayment && (
        <TouchableOpacity
          style={tw`bg-purple-600 py-3 rounded-lg`}
          onPress={togglePaymentOptions}
        >
          <Text style={tw`text-center text-white font-semibold text-lg`}>
            Proceed to Pay ₹{showFinalPrice}
          </Text>
        </TouchableOpacity>
      )}

      {/* Show Payment Options */}
      {showOptions && (
        <Animated.View style={[tw`mt-4 p-4 rounded-lg bg-gray-100`, { opacity: fadeAnim }]}>
          {/* Pay Online */}
          <TouchableOpacity
            style={tw`flex-row items-center justify-between p-3 bg-white rounded-lg shadow-md mb-2`}
            onPress={() => selectPaymentMode("net-banking")}
          >
            <View style={tw`flex-row items-center`}>
              <CreditCard size={24} color="blue" />
              <Text style={tw`ml-2 text-lg font-semibold`}>Pay Online</Text>
            </View>
            <CheckCircle size={20} color="green" />
          </TouchableOpacity>

          {/* Pay Cash */}
          <TouchableOpacity
            style={tw`flex-row items-center justify-between p-3 bg-white rounded-lg shadow-md`}
            onPress={() => selectPaymentMode("cash")}
          >
            <View style={tw`flex-row items-center`}>
              <CreditCard size={24} color="gray" />
              <Text style={tw`ml-2 text-lg font-semibold`}>Pay Cash</Text>
            </View>
            <CheckCircle size={20} color="green" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Show "Proceed to Pay" after selecting payment mode */}
      {modeOfPayment && !showOptions && (
        <TouchableOpacity
          style={tw`bg-green-600 py-3 rounded-lg mt-4`}
          onPress={handleBooking}
        >
          <Text style={tw`text-center text-white font-semibold text-lg`}>
            Proceed to Pay {showFinalPrice}
          </Text>
        </TouchableOpacity>
      )}
    </View>
      )}
      <Modal 
  visible={isModalVisible}
  transparent={true} // Ensures the modal behaves correctly
  animationType="slide"
  onRequestClose={() => setModalVisible(false)} // For Android back button
>
  <AddressScreen onClose={() => setModalVisible(false)} />
      </Modal>
      
      <Modal 
  visible={isModalVisibleForSuccess}
  transparent={true} // Ensures the modal behaves correctly
  animationType="slide"
  onRequestClose={() => setModalVisibleForSuccess(false)} // For Android back button
>
  <BookingSuccess onClose={() => setModalVisibleForSuccess(false)} />
            </Modal>
    </ScrollView>
  );
};

export default ReviewBookingPage;
