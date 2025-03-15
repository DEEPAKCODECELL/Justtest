import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import tw from "../../tailwind";
const { width } = Dimensions.get("window");

const settingsOptions = [
  { id: 1, title: "Profile", subtitle: "Update personal information", route: "ActualProfile" },
  { id: 7, title: "BookingHistory", subtitle: "Reach out in case you have a question", route: "BookingHistory" },
  { id: 8, title: "OrderDetails", subtitle: "Reach out in case you have a question", route: "OrderDetails" },
  { id: 12, title: "ProfileSetup", subtitle: "Reach out in case you have a question", route: "ProfileSetup" },
  { id: 13, title: "ServiceSelection", subtitle: "Reach out in case you have a question", route: "ServiceSelection" },
  {id:20, title:"LocationComponent", subtitle:"LocationComponent",route:"LocationComponent" }
]
const ProfileScreenProvider = ({setIsAuthenticated}) => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const handleLogout = async () => {
  const result = await dispatch(logoutUser());
  console.log("setting page Response", result);
  if (result && result.payload?.success) {
    await AsyncStorage.removeItem("authToken");// Remove token from storage
    await AsyncStorage.removeItem("role");// Remove role from storage
    console.log("Auth token removed and role removed");
    navigation.navigate("LoginAfterLogout");
  } else {
    console.log("Logout failed");
  }
};
  return (
    <View style={[tw`flex-1 bg-white p-4`, { width }]}>
      <Text style={tw`text-xl font-bold mb-4`}>Settings</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={settingsOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-4 border-b border-gray-300`}
            onPress={() => navigation.navigate(item.route)}
          >
            <View>
              <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
              <Text style={tw`text-sm text-gray-500`}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={tw`mt-6 p-4 bg-red-500 rounded-lg`} onPress={handleLogout}>
        <Text style={tw`text-center text-white font-bold`}>Log out</Text>
      </TouchableOpacity>
      <Text style={tw`text-center text-gray-400 mt-6`}>App version 1.0.9</Text>
    </View>
  );
};

export default ProfileScreenProvider;
